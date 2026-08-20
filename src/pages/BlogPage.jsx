import { ArrowRight, BookOpen, CalendarDays, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/blogService";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./BlogPage.module.css";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

export default function BlogPage() {
  useScrollReveal();
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const requestRef = useRef(0);
  const loadMoreRef = useRef(null);
  const fetchingMoreRef = useRef(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = async (
    page,
    nextQuery = query,
    nextCategory = category,
    append = false,
  ) => {
    if (append && fetchingMoreRef.current) return;
    if (append) {
      fetchingMoreRef.current = true;
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    const requestId = ++requestRef.current;
    setError("");
    try {
      const data = await getBlogs(page, 9, nextCategory, nextQuery, true);
      if (requestId !== requestRef.current) return;
      setPosts((current) => {
        if (!append) return data.items;
        const known = new Set(current.map((post) => post._id));
        return [
          ...current,
          ...data.items.filter((post) => !known.has(post._id)),
        ];
      });
      setPagination(data.pagination);
      setCategories(data.categories || []);
    } catch (requestError) {
      if (requestId !== requestRef.current) return;
      setError(requestError.message);
    } finally {
      if (requestId === requestRef.current) {
        setLoading(false);
        setLoadingMore(false);
        fetchingMoreRef.current = false;
      }
    }
  };

  useEffect(() => {
    requestRef.current += 1;
    fetchingMoreRef.current = false;
    setLoadingMore(false);
    setPosts([]);
    setLoading(true);
    const timer = setTimeout(() => load(1, query, category), 350);
    return () => clearTimeout(timer);
  }, [query, category]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (
      !target ||
      loading ||
      loadingMore ||
      error ||
      pagination.page >= pagination.totalPages
    )
      return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          load(pagination.page + 1, query, category, true);
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [
    loading,
    loadingMore,
    pagination.page,
    pagination.totalPages,
    query,
    category,
    error,
  ]);

  useEffect(() => {
    const cards = document.querySelectorAll(
      `.${styles.cardReveal}:not(.${styles.cardVisible})`,
    );
    if (!cards.length) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add(styles.cardVisible));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.cardVisible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -5% 0px" },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [posts]);

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-reveal>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">
              <span className="status-dot" /> Prime perspectives
            </p>
            <h1>
              Ideas that move
              <span className="text-gradient"> digital work forward.</span>
            </h1>
            <p>
              Practical thinking from our team on product strategy, design,
              engineering, and sustainable growth.
            </p>
            <div className={styles.heroSignals} aria-label="Topics we explore">
              <span>Strategy</span>
              <span>Design</span>
              <span>Engineering</span>
            </div>
          </div>
          <div className={styles.ideaOrbit} aria-hidden="true">
            <div className={styles.orbitRing} />
            <div className={styles.orbitRing} />
            <div className={styles.orbitRing} />
            <div className={styles.orbitCore}>
              <BookOpen size={30} />
              <small>Prime</small>
              <strong>Perspectives</strong>
            </div>
            <i className={styles.orbitNode}><span>01</span>Think</i>
            <i className={styles.orbitNode}><span>02</span>Build</i>
            <i className={styles.orbitNode}><span>03</span>Evolve</i>
            <b className={styles.orbitSpark} />
            <b className={styles.orbitSpark} />
            <b className={styles.orbitSpark} />
          </div>
        </div>
      </section>
      <section className={styles.library} data-reveal>
        <div className="container">
          <header>
            <div>
              <small>THE JOURNAL</small>
              <h2>Latest thinking</h2>
            </div>
            <span>{pagination.total} articles</span>
          </header>
          <div className={styles.filters}>
            <label className={styles.search}>
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles..."
                aria-label="Search blog articles"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </label>
            <div className={styles.categories} aria-label="Blog categories">
              <button
                className={!category ? styles.selectedCategory : ""}
                type="button"
                onClick={() => setCategory("")}
              >
                All
              </button>
              {categories.map((item) => (
                <button
                  className={category === item ? styles.selectedCategory : ""}
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {loading && posts.length === 0 ? (
            <div className={styles.state}>Loading articles…</div>
          ) : error && posts.length === 0 ? (
            <div className={styles.state}>{error}</div>
          ) : posts.length === 0 ? (
            <div className={styles.empty}>
              <BookOpen size={31} />
              <h2>No articles published yet.</h2>
              <p>New thinking will appear here soon.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post, index) => (
                <Link
                  className={`${styles.cardLink} ${styles.cardReveal}`}
                  style={{ "--reveal-delay": `${(index % 3) * 120}ms` }}
                  to={`/blog/${post.slug}`}
                  key={post._id}
                >
                  <article>
                    <div className={styles.cover}>
                      {post.coverImage ? (
                        <img src={post.coverImage} alt={post.title} />
                      ) : (
                        <span>
                          <BookOpen size={30} />
                        </span>
                      )}
                      <small>{post.category}</small>
                    </div>
                    <div className={styles.copy}>
                      <div className={styles.meta}>
                        <span>
                          <CalendarDays size={13} />{" "}
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                      </div>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <div className={styles.read}>
                        <span>Read article</span>
                        <i>
                          <ArrowRight size={17} />
                        </i>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
          {posts.length > 0 && pagination.totalPages > 1 && (
            <div
              ref={loadMoreRef}
              className={styles.loadMore}
              aria-live="polite"
            >
              {loadingMore
                ? "Loading more articles..."
                : error
                  ? error
                  : pagination.page < pagination.totalPages
                    ? "Scroll to load more"
                    : `All ${pagination.total} articles loaded`}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
