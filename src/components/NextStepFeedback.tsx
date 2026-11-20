import { useState } from "react";

const KEY = "moyowell_next_step_feedback";

interface FeedbackEntry {
  assessmentId: string;
  rating: number;
  at: string;
}

function read(): FeedbackEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FeedbackEntry[]) : [];
  } catch {
    return [];
  }
}

/**
 * One-question usability check shown under results: "do you know your next step?"
 * Stored only in this browser (key: moyowell_next_step_feedback) so pilot
 * sessions can read it back; nothing is sent anywhere.
 */
export function NextStepFeedback({ assessmentId }: { assessmentId: string }) {
  const [rating, setRating] = useState<number | null>(
    () => read().find((e) => e.assessmentId === assessmentId)?.rating ?? null
  );

  const choose = (value: number) => {
    setRating(value);
    try {
      const others = read().filter((e) => e.assessmentId !== assessmentId);
      localStorage.setItem(
        KEY,
        JSON.stringify([
          ...others,
          { assessmentId, rating: value, at: new Date().toISOString() },
        ])
      );
    } catch {
      // Storage unavailable: keep the in-memory rating only.
    }
  };

  return (
    <section
      aria-label="Quick feedback"
      className="no-print mt-6 rounded-xl bg-surface-container-low border border-on-surface/[0.06] p-5"
    >
      <p className="text-sm font-semibold text-on-surface">
        How clear is your next step after seeing this?
      </p>
      <p className="text-xs text-on-surface-variant mb-3">
        1 = not clear at all, 5 = I know exactly what to do. Saved only on this device.
      </p>
      <div role="radiogroup" aria-label="Clarity rating" className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            onClick={() => choose(n)}
            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
              rating === n
                ? "bg-primary text-on-primary"
                : "bg-surface-container-high text-on-surface hover:bg-secondary-fixed/50"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      {rating !== null && (
        <p role="status" className="text-xs text-secondary mt-3">
          Thanks, that helps us improve.
        </p>
      )}
    </section>
  );
}
