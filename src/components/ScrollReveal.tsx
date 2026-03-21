import { type ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** ミリ秒。子要素の段階的表示用 */
  delayMs?: number;
};

export function ScrollReveal({ children, className = "", id, delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      data-reveal
      className={`${className} ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: delayMs ? `${delayMs}ms` : undefined }}
    >
      {children}
    </div>
  );
}
