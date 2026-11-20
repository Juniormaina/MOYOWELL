# MoyoWell Validation Plan

Goal: find out, with real people and as little build as possible, whether MoyoWell helps someone go from "I'm not sure how I'm doing" to "I know my next step, and I took it."

**Positioning to test:** MoyoWell is the front door (screen → understand → route to care), not a therapy provider or a chatbot.

**Pick before starting (write these down):**
- One segment (e.g. university students, or employees at one company)
- One referral partner (a campus counselling office or clinic)
- One headline metric: *share of people with an elevated result who contact a service within 14 days*

---

## Phase 0: Fix trust gaps first (before any real user)

| Item | Why | Done? |
|---|---|---|
| Verify every entry in `CARE_PROVIDERS` by phone; set `verifiedOn` (YYYY-MM-DD) or remove the listing | Listings currently show "Sample listing · not yet verified" | ☐ |
| Verify each crisis hotline number and availability in `CRISIS_HOTLINES` | A wrong crisis number is the highest-harm failure | ☐ |
| Have a licensed clinician review scoring bands, Item 9 pathway and all crisis wording | Safety sign-off | ☐ |
| Confirm instrument licensing and use of validated Kiswahili versions (PHQ-9, GAD-7, WHO-5) | Don't translate clinical instruments ad hoc | ☐ |
| Check Kenya Data Protection Act obligations (e.g. ODPC registration as a data controller) and write a plain-language privacy notice | Health data is sensitive | ☐ |
| Confirm AI explanation copy matches reality: scores and answer labels are sent to the server and AI provider only after the user opts in | Already disclosed in-app; keep in sync with `server.ts` | ☐ |

**Gate:** do not recruit real users until the first three rows are done.

---

## Phase 1: Problem validation (about 2 weeks, no code)

**Who:** 15–20 people from the chosen segment, plus 3–5 counsellors or clinicians.

**User interview prompts (ask about the past, not hypotheticals):**
1. Tell me about the last time you felt really overwhelmed. What did you do first?
2. Who did you talk to? Why them?
3. Did you ever look for professional help? What got in the way (cost, stigma, not knowing where, time)?
4. Have you used any app or website for this? What made you stop?
5. If you wanted to find a counsellor today, how would you start?

**Counsellor prompts:**
1. What do people usually know (or get wrong) before their first appointment?
2. What would make a self-screening result useful to you in session?
3. What referral information do you wish people arrived with?

**Signals that the problem is real:** people describe workarounds (asking friends, searching Google), cost/stigma/not-knowing-where recur, and they can name the last time it happened.

---

## Phase 2: Usability sessions (2–3 weeks)

Use the live demo ("Explore the demo dashboard" on the login page).

- 8–10 moderated sessions, 20–30 minutes each, think-aloud.
- Tasks: take a screening; explain what the result means in your own words; say what you would do next; find a support option.
- Record: completion rate, time to first screening, where people hesitate.
- In-app measure: the "How clear is your next step?" 1–5 rating, stored in `localStorage` key `moyowell_next_step_feedback` (read it back from the browser on the session device).
- Add a standard usability questionnaire (e.g. the User Version of the Mobile App Rating Scale) after the session.

**Pass bar (starting point, adjust after the first sessions):** at least 7 of 10 complete a screening unaided, median clarity rating of 4 or higher, and no participant misreads their result as a diagnosis.

---

## Phase 3: Referral validation (4–6 weeks): the key test

Partner with one campus counselling office or clinic.

- Consent-based pilot with 30–50 participants. Do not launch publicly.
- Measure for people with an elevated result:
  - Contacted a service within 14 days (self-report check-in by SMS/WhatsApp)
  - Were the referrals appropriate? (the partner clinician rates a sample)
  - Did any listing turn out to be wrong, closed or unreachable?
- Track safety events: every Item 9 positive, and what happened next.

**Go / no-go:**
- **Go:** a meaningful share of elevated-result users contact a service, and clinicians rate referrals as appropriate.
- **Rework:** people understand results but don't act (barrier is cost, trust or logistics: fix the directory and next-step guidance).
- **Stop or pivot:** people don't see the value of the screening itself.

---

## Phase 4: Distribution and willingness to pay

- Test one institution: a short letter of intent or paid pilot is stronger evidence than surveys.
- Test the offer: anonymised cohort dashboard (aggregates only, minimum group size) for universities, employers or SACCOs.
- Test channel reach: USSD/SMS entry point for people without smartphones or data (Africa's Talking).

---

## Metrics to track

| Metric | Phase | Target (initial) |
|---|---|---|
| Screening completion rate | 2 | ≥ 70% |
| Next-step clarity (1–5) | 2–3 | median ≥ 4 |
| Contacted a service within 14 days (elevated results) | 3 | set after pilot baseline |
| Referral appropriateness (clinician-rated) | 3 | ≥ 80% |
| Directory listings verified | 0 | 100% before launch |
| Safety escalations handled per protocol | 3 | 100% |

---

## What to do with the answers

After each phase, write three lines: what we believed, what we saw, what we change. Keep the log in this folder so the evidence trail is visible to partners and funders.
