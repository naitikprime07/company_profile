import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const observeRevealables = () =>
      document
        .querySelectorAll("[data-reveal]:not(.is-revealed)")
        .forEach((element) => observer.observe(element));

    observeRevealables();

    // Sections mounted later (e.g. after an async fetch resolves) never get
    // observed by the initial pass, leaving them stuck at opacity 0. Watch the
    // DOM and observe those late additions as well.
    const mutationObserver = new MutationObserver(observeRevealables);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);
}

export default useScrollReveal;
