import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { DesktopNav, HamburgerButton, HamburgerMenu } from "./HamburgerMenu";
import { TRIP_DATES_HEADER } from "../data/trip";

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <div className="overflow-x-hidden">
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-3 border-b border-black/[0.06] bg-cream/90 px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md sm:px-4">
        <Link to="/" className="min-w-0 shrink font-display text-sm font-semibold tracking-wider text-navy">
          Da Nang Trip
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-1">
          <p className="hidden text-right text-[10px] font-medium leading-tight tracking-wide text-navy/45 sm:block lg:hidden">
            <span className="block">{TRIP_DATES_HEADER.range}</span>
            <span className="block text-navy/35">{TRIP_DATES_HEADER.note}</span>
          </p>
          <HamburgerButton open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
        </div>
      </header>

      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
