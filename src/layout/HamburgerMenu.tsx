import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../config/navigation";

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function HamburgerButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="flex h-11 w-11 items-center justify-center rounded-lg text-navy active:bg-navy/[0.06] lg:hidden"
      aria-expanded={open}
      aria-controls="site-menu"
      aria-label={open ? "メニューを閉じる" : "メニューを開く"}
      onClick={onToggle}
    >
      {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
    </button>
  );
}

export function HamburgerMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
        aria-label="メニューを閉じる"
        onClick={onClose}
      />
      <nav
        id="site-menu"
        className="fixed right-0 top-0 z-[70] flex h-full w-[min(88vw,320px)] flex-col border-l border-black/[0.08] bg-cream shadow-2xl lg:hidden"
        aria-label="サイトメニュー"
      >
        <div className="flex items-center justify-between border-b border-black/[0.06] px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <p className="font-display text-sm font-semibold text-navy">Menu</p>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg active:bg-navy/[0.06]"
            aria-label="閉じる"
            onClick={onClose}
          >
            <IconClose className="h-6 w-6 text-navy" />
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.to} className="mb-1">
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3.5 transition active:bg-navy/[0.06] ${
                    isActive ? "bg-navy/[0.08] ring-1 ring-navy/10" : "hover:bg-navy/[0.04]"
                  }`
                }
                onClick={onClose}
              >
                <span className="font-display text-base font-bold text-navy">{item.label}</span>
                <span className="mt-0.5 block text-xs leading-snug text-ink/55">{item.description}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <p className="border-t border-black/[0.06] px-4 py-4 text-center text-[10px] tracking-widest text-navy/40">
          Da Nang · 2026.09
        </p>
      </nav>
    </>
  );
}

export function DesktopNav() {
  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="デスクトップナビ">
      {NAV_ITEMS.filter((item) => item.to !== "/").map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 text-sm font-semibold transition ${
              isActive ? "bg-navy/[0.08] text-navy" : "text-navy/60 hover:text-navy"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
