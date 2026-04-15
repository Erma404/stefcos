import { useEffect, useRef } from "react";

export const useScrollReveal = (key?: unknown) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-reveal]");
    children.forEach((child) => child.classList.remove("revealed"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.getAttribute("data-reveal-delay") || 0);
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return ref;
};
