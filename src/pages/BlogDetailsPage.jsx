import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  List,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug, getBlogs } from "../services/blogService";
import styles from "./BlogPage.module.css";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const readingTime = (content = "") =>
  Math.max(
    1,
    Math.ceil(
      String(content)
        .replace(/<[^>]*>/g, " ")
        .trim()
        .split(/\s+/).length / 200,
    ),
  );

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [relatedPosts, setRelatedPosts] = useState([]);

  const articleNavigation = useMemo(() => {
    if (!post?.content || typeof DOMParser === "undefined")
      return { content: post?.content || "", items: [] };

    const document = new DOMParser().parseFromString(post.content, "text/html");
    const usedIds = new Set();
    const items = [...document.body.querySelectorAll("h2, h3")].map(
      (heading, index) => {
        const label = heading.textContent.trim();
        const baseId =
          label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || `section-${index + 1}`;
        let id = baseId;
        let suffix = 2;
        while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
        usedIds.add(id);
        heading.id = id;
        return { id, label, level: heading.tagName.toLowerCase() };
      },
    );

    return { content: document.body.innerHTML, items };
  }, [post?.content]);

  const copyArticleLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Unable to copy the article link.");
    }
  };
  useEffect(() => {
    let active = true;
    getBlogBySlug(slug)
      .then((data) => active && setPost(data))
      .catch((requestError) => active && setError(requestError.message));
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!post?.slug) return undefined;
    let active = true;
    const loadRelatedPosts = async () => {
      try {
        const result = await getBlogs(1, 8);
        const candidates = (result.items || [])
          .filter((item) => item.slug !== post.slug)
          .sort(
            (first, second) =>
              Number(second.category === post.category) -
              Number(first.category === post.category),
          );
        if (active) setRelatedPosts(candidates.slice(0, 2));
      } catch {
        if (active) setRelatedPosts([]);
      }
    };
    setRelatedPosts([]);
    loadRelatedPosts();
    return () => {
      active = false;
    };
  }, [post?.category, post?.slug]);

  useEffect(() => {
    if (!articleNavigation.items.length) return undefined;
    setActiveSection(articleNavigation.items[0].id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
    );
    articleNavigation.items.forEach(({ id }) => {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });
    return () => observer.disconnect();
  }, [articleNavigation]);
  if (error)
    return (
      <main className={styles.detailState}>
        <h1>{error}</h1>
        <Link to="/blog">Back to journal</Link>
      </main>
    );
  if (!post)
    return <main className={styles.detailState}>Loading article…</main>;
  const minutes = readingTime(post.content);
  const articleUrl =
    typeof window === "undefined"
      ? ""
      : encodeURIComponent(window.location.href);
  const articleTitle = encodeURIComponent(post.title);
  return (
    <main className={styles.detail}>
      <article>
        <Link className={styles.back} to="/blog">
          <ArrowLeft size={16} /> Back to journal
        </Link>
        <header>
          {/* <small>{post.category}</small> */}
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          {/* <div>
            <span>By {post.author}</span>
            <span>
              <CalendarDays size={14} />{" "}
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span>
              <Clock3 size={14} /> {minutes} min read
            </span>
          </div> */}
        </header>
        {post.coverImage && (
          <img
            className={styles.detailCover}
            src={post.coverImage}
            alt={post.title}
          />
        )}
        <section className={styles.articleMetaBar} aria-label="Article details">
          <div className={styles.metaAuthor}>
            {post.authorDetails?.image ? (
              <img src={post.authorDetails.image} alt={post.author} />
            ) : (
              <span aria-hidden="true">
                {post.author?.trim()?.charAt(0)?.toUpperCase() || "A"}
              </span>
            )}
            <p>
              <small>By</small>
              <strong>{post.author}</strong>
            </p>
          </div>
          <div className={styles.metaDate}>
            <small>Publish date</small>
            <strong>{formatDate(post.publishedAt || post.createdAt)}</strong>
          </div>
          <div className={styles.metaDate}>
            <small>Last update</small>
            <strong>{formatDate(post.updatedAt || post.createdAt)}</strong>
          </div>
          <div className={styles.metaDate}>
            <small>Time</small>
            <strong>
              <Clock3 size={14} /> {minutes} min read
            </strong>
          </div>
          <div className={styles.metaActions}>
            {post.authorDetails?.linkedin && (
              <a
                href={post.authorDetails.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="View author LinkedIn profile"
              >
                <img src="/linkedin.png" alt="" />
              </a>
            )}
            <button
              type="button"
              onClick={copyArticleLink}
              data-copied={copied}
              aria-label="Copy article link"
            >
              <img src="/url.png" alt="" />
              <span>{copied ? "Copied" : "Copy link"}</span>
            </button>
          </div>
        </section>
        <div className={styles.articleLayout}>
          <aside className={styles.articleSidebar}>
            {articleNavigation.items.length > 0 && (
              <section className={styles.tableOfContents}>
                <div>
                  <List size={15} />
                  <span>In this article</span>
                </div>
                <nav aria-label="Article sections">
                  {articleNavigation.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={[
                        activeSection === item.id ? styles.tocActive : "",
                        item.level === "h3" ? styles.tocNested : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </section>
            )}

            <section className={styles.articleInquiry}>
              <small>Get in touch directly</small>
              <h2>Looking to strengthen your development workflow?</h2>
              <Link to="/contact">Consult now</Link>
            </section>

            {post.tags?.length > 0 && (
              <section className={styles.sidebarSection}>
                <h2>Tags</h2>
                <div className={styles.sidebarTags}>
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>
            )}

            <section className={styles.sidebarSection}>
              <h2>Share this article</h2>
              <div className={styles.shareActions}>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                >
                  <img src="/facebook.png" alt="" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <img src="/linkedin.png" alt="" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on X"
                >
                  <img src="/twitter.png" alt="" />
                </a>
                <button
                  type="button"
                  onClick={copyArticleLink}
                  data-copied={copied}
                  aria-label="Copy article link"
                >
                  <img src="/url.png" alt="" />
                  <span>{copied ? "Copied" : "Copy link"}</span>
                </button>
              </div>
            </section>
          </aside>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: articleNavigation.content }}
          />
        </div>
        {(post.authorDetails?.designation ||
          post.authorDetails?.bio ||
          post.authorDetails?.linkedin ||
          post.authorDetails?.image) && (
          <aside className={styles.authorCard}>
            {post.authorDetails.image && (
              <img src={post.authorDetails.image} alt={post.author} />
            )}
            <div>
              <small>Written by</small>
              <h2>{post.author}</h2>
              {post.authorDetails.designation && (
                <strong>{post.authorDetails.designation}</strong>
              )}
              {post.authorDetails.bio && <p>{post.authorDetails.bio}</p>}
            </div>
          </aside>
        )}
      </article>
      {relatedPosts.length > 0 && (
        <section className={styles.continueReading}>
          <div className={styles.continueGlow} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <header>
            <small>More perspectives</small>
            <h2>
              Continue <span>reading.</span>
            </h2>
            <p>Keep exploring ideas selected from the Prime Softech journal.</p>
          </header>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((related, index) => (
              <Link
                className={styles.relatedCard}
                to={`/blog/${related.slug}`}
                key={related._id || related.slug}
                style={{ "--card-angle": index ? "-1deg" : "1deg" }}
              >
                <span className={styles.relatedDepth} aria-hidden="true" />
                <div className={styles.relatedMedia}>
                  {related.coverImage ? (
                    <img src={related.coverImage} alt="" />
                  ) : (
                    <span>{related.category}</span>
                  )}
                  <small>{related.category}</small>
                </div>
                <div className={styles.relatedCopy}>
                  <span>0{index + 1}</span>
                  <h3>{related.title}</h3>
                  <div>
                    <time dateTime={related.publishedAt || related.createdAt}>
                      {formatDate(related.publishedAt || related.createdAt)}
                    </time>
                    <small>{readingTime(related.content)} min read</small>
                  </div>
                </div>
                <span className={styles.relatedArrow}>
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
