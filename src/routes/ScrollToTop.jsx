import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // In-page anchor (e.g. footer "Product strategy" -> /#services): smoothly
    // scroll to the matching section once the target route has rendered.
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let attempts = 0;
      const timer = window.setInterval(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          window.clearInterval(timer);
        } else if (++attempts > 60) {
          // Target section is not on this page; settle at the top instead.
          window.scrollTo({ top: 0, behavior: "instant" });
          window.clearInterval(timer);
        }
      }, 50);
      return () => window.clearInterval(timer);
    }

    // Regular route change: jump to the top of the freshly rendered page.
    window.scrollTo({ top: 0, behavior: "instant" });
    return undefined;
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
