export default function BrandHeroHeading({
  text = "",
  highlightWords = 3,
  className,
}) {
  const words = String(text).trim().split(/\s+/).filter(Boolean);

  if (words.length < 2) return <h1 className={className}>{text}</h1>;

  const splitAt = Math.max(1, words.length - highlightWords);

  return (
    <h1 className={className}>
      {words.slice(0, splitAt).join(" ")}{" "}
      <span className="text-gradient">
        {words.slice(splitAt).join(" ")}
      </span>
    </h1>
  );
}
