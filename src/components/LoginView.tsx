import { Lock, Mail, KeyRound, ArrowRight, ClipboardCheck, LineChart, Route } from "lucide-react";
import type { AppView } from "./LayoutShell";
import { MoyoWellLogo } from "./MediaImage";

interface LoginViewProps {
  onNavigate: (view: AppView) => void;
}

const JOURNEY = [
  {
    icon: ClipboardCheck,
    title: "1. Check in",
    body: "Take a short, validated screening (PHQ-9, GAD-7, WHO-5) in a few minutes.",
  },
  {
    icon: LineChart,
    title: "2. Understand",
    body: "See your results as a plain-language wellbeing synthesis, not just a score.",
  },
  {
    icon: Route,
    title: "3. Take a next step",
    body: "Follow a gentle action pathway and find local support and crisis resources.",
  },
];

export function LoginView({ onNavigate }: LoginViewProps) {
  return (
    <section className="max-w-6xl mx-auto px-5 lg:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Sign-in card (inputs intentionally locked for the showcase) */}
      <div className="bg-surface-container-lowest rounded-2xl border border-on-surface/[0.06] shadow-md p-6 md:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <MoyoWellLogo className="w-9 h-9" />
          <span className="font-serif text-2xl font-semibold text-on-surface">MoyoWell</span>
        </div>

        <h1 className="font-serif text-3xl text-on-surface mb-2">Welcome back</h1>
        <p className="text-sm text-on-surface-variant mb-6">
          Personal accounts are coming soon. Sign-in is switched off in this
          showcase, so explore the demo profile instead.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          aria-describedby="login-locked-note"
          className="space-y-4"
        >
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
              <input
                id="login-email"
                type="email"
                disabled
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-outline-variant bg-surface-container text-on-surface-variant placeholder:text-outline cursor-not-allowed opacity-70"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
              <input
                id="login-password"
                type="password"
                disabled
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-outline-variant bg-surface-container text-on-surface-variant placeholder:text-outline cursor-not-allowed opacity-70"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled
            className="w-full py-3 rounded-lg bg-surface-container-high text-on-surface-variant font-semibold text-sm cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Sign in (coming soon)
          </button>
          <p id="login-locked-note" className="sr-only">
            Sign-in fields are disabled in this demo. Use the demo button to continue.
          </p>
        </form>

        <div className="flex items-center gap-3 my-6" aria-hidden="true">
          <span className="h-px flex-1 bg-outline-variant/40" />
          <span className="text-xs uppercase tracking-wider text-on-surface-variant">or</span>
          <span className="h-px flex-1 bg-outline-variant/40" />
        </div>

        <button
          type="button"
          onClick={() => onNavigate("dashboard")}
          className="w-full py-3.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
        >
          Explore the demo dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-xs text-on-surface-variant text-center mt-3">
          Opens a sample profile (Amina K.). Nothing you enter leaves your browser.
        </p>
      </div>

      {/* User roadmap */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">
          How MoyoWell works
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-on-surface mb-4 leading-tight">
          From “how am I really doing?” to a clear next step.
        </h2>
        <p className="text-on-surface-variant mb-8 max-w-lg">
          A preventive wellbeing companion that helps you reflect honestly and
          connects you to the right care, before things reach a crisis.
        </p>
        <ol className="space-y-5">
          {JOURNEY.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <span className="w-10 h-10 shrink-0 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-semibold text-on-surface">{title}</h3>
                <p className="text-sm text-on-surface-variant">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
