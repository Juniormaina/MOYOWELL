import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "1mb" }));

interface ExplainRequestBody {
  instrumentId: "phq9" | "gad7" | "who5";
  instrumentName: string;
  score: number;
  maxScore: number;
  tierLabel: string;
  safetyTriggered: boolean;
  itemHighlights: Array<{ label: string; score: number; answerLabel: string }>;
}

app.post("/api/explain", async (req, res) => {
  const body = req.body as Partial<ExplainRequestBody>;
  if (!body || !body.instrumentId || typeof body.score !== "number" || !body.tierLabel) {
    res.status(400).json({ error: "Invalid assessment payload." });
    return;
  }

  // Deterministic clinical safety gate: if PHQ-9 Item 9 > 0, never generate speculative AI prose.
  if (body.safetyTriggered) {
    res.json({
      source: "deterministic-safety",
      paragraphs: [
        "Your responses indicate thoughts of self-harm or feeling that you would be better off dead over the past two weeks. Standard automated synthesis is paused so that immediate, direct human support can take priority.",
        "Please reach out to a trusted person, a crisis counselor (Befrienders Kenya: +254 722 178 177, Kenya Red Cross: 1199, or 988), or your nearest hospital emergency service right away.",
      ],
    });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    res.status(503).json({
      error: "AI synthesis service unavailable; using deterministic clinical explanation.",
    });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const highlightsText = (body.itemHighlights ?? [])
      .map((item) => `- ${item.label}: ${item.answerLabel} (${item.score})`)
      .join("\n");

    const prompt = `
You are a calm, clinically grounded wellbeing explanation writer for MoyoWell.
Strict rule: "Rules Decide, AI Explains." You MUST NOT diagnose, prescribe medication, or override the deterministic score/tier.
Explain the meaning of this validated screening result in warm, respectful, plain human language (2 concise paragraphs, ~110-140 words total).

Instrument: ${body.instrumentName ?? body.instrumentId}
Score: ${body.score} / ${body.maxScore}
Deterministic Staging Tier: ${body.tierLabel}
Notable Item Responses:
${highlightsText || "No elevated individual items flagged."}

Requirements:
1. Paragraph 1: Contextualize the deterministic score and tier without clinical jargon or fatalistic labels. Mention the specific areas reflected in the notable items (e.g., sleep, energy, worry, vitality).
2. Paragraph 2: Frame this as a 14-day snapshot rather than a permanent label, and note why the recommended care level fits this tier. Remind gently that this is a screening guide, not a medical diagnosis.
`;

    const response = await ai.models.generateContent({
      model: "gemini-4-hydrogen",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            paragraphs: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly two calm, non-diagnostic explanatory paragraphs.",
            },
          },
        },
      },
    });

    const raw = (response.text ?? "{}").trim();
    const parsed = JSON.parse(raw) as { paragraphs?: string[] };
    if (Array.isArray(parsed.paragraphs) && parsed.paragraphs.length > 0) {
      res.json({
        source: "gemini",
        paragraphs: parsed.paragraphs.slice(0, 3),
      });
      return;
    }

    res.status(502).json({ error: "Empty narrative response from synthesis model." });
  } catch (err) {
    console.error("Error in /api/explain:", err);
    res.status(500).json({ error: "Failed to generate synthesis explanation." });
  }
});

async function startServer() {
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`MoyoWell server listening on http://localhost:${port}`);
  });
}

startServer();
