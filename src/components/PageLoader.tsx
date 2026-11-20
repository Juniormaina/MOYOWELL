import { MoyoWellLogo } from "./MediaImage";

/** Thin indeterminate bar pinned to the top while a page transition is pending. */
export function RouteProgressBar({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      aria-busy="true"
      className="fixed top-0 inset-x-0 z-[60] h-1 overflow-hidden bg-primary/10 no-print"
    >
      <div className="mw-progress-bar h-full w-2/5 rounded-full bg-primary" />
    </div>
  );
}

/** Full-area placeholder shown while a page's code is still downloading. */
export function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-on-surface-variant"
    >
      <MoyoWellLogo className="w-12 h-12 animate-pulse motion-reduce:animate-none" />
      <p className="text-sm font-medium">Preparing your space…</p>
    </div>
  );
}
