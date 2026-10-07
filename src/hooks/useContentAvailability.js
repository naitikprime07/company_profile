import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import { getPortfolioItems } from "../services/portfolioService";

// Shared, module-level availability check so every component (Navbar, pages)
// uses one lightweight pair of requests per page load instead of refetching.
let availabilityPromise = null;
let availabilityResult = null;

const resolveAvailability = () => {
  if (!availabilityPromise) {
    availabilityPromise = Promise.all([
      getBlogs(1, 1, "", "", true)
        .then((data) => (data?.pagination?.total ?? data?.items?.length ?? 0) > 0)
        // If the API is unreachable keep the section visible so a network
        // blip does not silently remove navigation.
        .catch(() => true),
      getPortfolioItems(1, "all", 1)
        .then((data) => (data?.pagination?.total ?? data?.items?.length ?? 0) > 0)
        .catch(() => true),
    ]).then(([hasBlogs, hasPortfolio]) => {
      availabilityResult = { hasBlogs, hasPortfolio };
      return availabilityResult;
    });
  }
  return availabilityPromise;
};

/**
 * Returns { hasBlogs, hasPortfolio } — null while still loading.
 * Sections should render only when the value is true, i.e. once the admin
 * has actually published blog posts / portfolio projects.
 */
export default function useContentAvailability() {
  const [availability, setAvailability] = useState(
    availabilityResult ?? { hasBlogs: null, hasPortfolio: null },
  );

  useEffect(() => {
    let active = true;
    resolveAvailability().then((result) => {
      if (active) setAvailability(result);
    });
    return () => {
      active = false;
    };
  }, []);

  return availability;
}
