import { useState, type ReactNode } from "react";
import {
  PhoneCall,
  Menu,
  X,
  LayoutGrid,
  Brain,
  Route,
  BookOpen,
  ShieldAlert,
  Lock,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { MoyoWellLogo, MediaImage } from "./MediaImage";
import aminaAvatar from "@/src/assets/images/avatar_amina_k_1794762546361.jpg";

export type AppView =
  | "home"
  | "assessments"
  | "screening"
  | "dashboard"
  | "action-plan"
  | "resources"
  | "crisis";

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export function PublicLayout({
  currentView,
  onNavigate,
  children,
}: NavigationProps & { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: AppView; label: string }> = [
    { id: "home", label: "Home" },
    { id: "assessments", label: "Assessments" },
    { id: "dashboard", label: "Dashboard" },
    { id: "resources", label: "Resources" },
  ];

  const handleNav = (view: AppView) => {
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* 3-Zone Top Bar Contract */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/92 backdrop-blur-xl border-b border-on-surface/[0.06] no-print">
        <div className="h-16 md:h-20 max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (single-line, no subtitle clutter) */}
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-primary rounded-md"
          >
            <MoyoWellLogo className="w-8 h-8" />
            <span className="font-serif text-xl font-semibold tracking-tight text-on-surface group-hover:text-primary transition-colors">
              MoyoWell
            </span>
          </button>

          {/* Zone 2: 4 Concise Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7"
          >
            {navItems.map((item) => {
              const isActive =
                currentView === item.id ||
                (item.id === "assessments" && currentView === "screening");
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`whitespace-nowrap shrink-0 py-1.5 text-[15px] font-medium transition-colors border-b-2 focus-visible:outline-2 focus-visible:outline-primary ${
                    isActive
                      ? "text-primary font-semibold border-primary"
                      : "text-on-surface-variant border-transparent hover:text-on-surface hover:border-outline-variant"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Safety Action (+ Mobile Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNav("crisis")}
              className="inline-flex items-center gap-2 bg-error-container text-on-error-container hover:bg-error hover:text-on-error px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-error"
            >
              <PhoneCall className="w-4 h-4" />
              <span className="hidden sm:inline">Need Immediate Help?</span>
              <span className="sm:hidden">Crisis Help</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-low border-t border-on-surface/[0.08] px-5 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive =
                currentView === item.id ||
                (item.id === "assessments" && currentView === "screening");
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-secondary text-on-secondary"
                      : "text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      <main className="w-full pt-16 md:pt-20 flex-grow">{children}</main>

      {/* Quiet Editorial Footer */}
      <footer className="w-full bg-surface-container-low mt-auto border-t border-on-surface/[0.06] no-print">
        <div className="max-w-7xl mx-auto px-5 lg:px-12 pt-10 pb-8">
          <div className="bg-surface-container-highest/60 rounded-xl p-4 md:p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-3 text-on-surface">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5 md:mt-0" />
              <span className="text-[15px] font-semibold">
                In immediate danger or crisis? Call 1199 (Kenya Red Cross), +254 722 178 177 (Befrienders), or 988 / 999.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleNav("crisis")}
              className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0"
            >
              Emergency Hub
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 border-t border-outline-variant/30">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-xl font-medium text-on-surface">MoyoWell</span>
                <span className="text-xs font-medium text-secondary tracking-wider">
                  Your wellbeing · Your next step
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
                A warm, sovereign mental wellbeing screening and pathfinding companion designed to bridge honest reflection with clinical and community care pathways.
              </p>
              <div className="flex items-center gap-2 text-xs text-secondary pt-1">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Privacy Assurance: Assessment entries remain local in your browser session with zero external tracking.
                </span>
              </div>
            </div>

            <div className="md:col-span-4 space-y-2">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
                Clinical Notice
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                MoyoWell is a wellbeing screening and navigation companion, NOT a diagnostic tool, medical device, or replacement for professional mental healthcare. Always consult a qualified mental health specialist.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav("assessments")}
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    Self Assessments
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav("dashboard")}
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    Wellbeing Synthesis
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav("resources")}
                    className="text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    Support Library
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav("crisis")}
                    className="text-primary hover:text-on-surface font-semibold transition-colors"
                  >
                    Immediate Crisis Resources
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-5 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant">
            <div>© 2026 MoyoWell. Earth-drawn architecture for preventive wellbeing.</div>
            <div>Local Session · Evidence-Based Psychometrics</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PortalLayout({
  currentView,
  onNavigate,
  children,
}: NavigationProps & { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sidebarItems: Array<{
    id: AppView;
    label: string;
    icon: typeof LayoutGrid;
  }> = [
    { id: "dashboard", label: "Overview", icon: LayoutGrid },
    { id: "assessments", label: "Assessments", icon: Brain },
    { id: "action-plan", label: "Action Pathway", icon: Route },
    { id: "resources", label: "Resources", icon: BookOpen },
  ];

  const handleNav = (view: AppView) => {
    setDrawerOpen(false);
    onNavigate(view);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-surface-container-low">
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="flex items-center gap-2.5 text-left group"
          >
            <MoyoWellLogo className="w-8 h-8" />
            <div>
              <span className="font-serif text-xl font-medium text-on-surface block leading-none group-hover:text-primary transition-colors">
                MoyoWell
              </span>
              <span className="text-[11px] font-semibold text-secondary uppercase tracking-widest mt-1 block">
                Portal
              </span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-3 py-2.5 bg-surface rounded-xl flex items-center justify-between border border-on-surface/[0.06]">
          <div className="flex items-center gap-2 text-xs font-medium text-on-surface">
            <Lock className="w-3.5 h-3.5 text-secondary" />
            <span>Amina K. · Local Session</span>
          </div>
        </div>

        <nav aria-label="Portal navigation" className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-secondary text-on-secondary font-medium shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 pt-4 border-t border-outline-variant/30">
        <button
          type="button"
          onClick={() => handleNav("crisis")}
          className="flex items-center justify-center gap-2 w-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Emergency Crisis</span>
        </button>
        <p className="text-[11px] text-on-surface-variant text-center px-2">
          Local Session · Zero PII Transmitted
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-72 border-r border-on-surface/[0.06] z-40 no-print">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex no-print">
          <div
            className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Column */}
      <div className="lg:pl-72 print-full">
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 md:h-20 bg-surface/92 backdrop-blur-xl z-30 flex items-center justify-between px-5 lg:px-8 border-b border-on-surface/[0.06] no-print">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-on-surface hover:bg-surface-container"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-secondary">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest whitespace-nowrap">
                Preventive Wellbeing Pathway
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleNav("crisis")}
              className="hidden sm:inline-flex items-center gap-2 bg-error-container text-on-error-container hover:bg-error hover:text-on-error px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Need Immediate Help?</span>
            </button>

            <div className="flex items-center gap-2.5 pl-4 border-l border-outline-variant/30">
              <div className="text-right hidden sm:block">
                <span className="block text-sm font-semibold text-on-surface leading-tight">
                  Amina K.
                </span>
                <span className="block text-[11px] text-secondary">Demo Profile</span>
              </div>
              <MediaImage
                src={aminaAvatar}
                alt="Amina K. profile avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-high"
                fallbackTitle="AK"
              />
            </div>
          </div>
        </header>

        <main className="w-full pt-20 md:pt-24 px-5 lg:px-8 pb-12 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
