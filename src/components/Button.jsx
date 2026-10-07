import { ArrowUpRight } from "lucide-react";

function Button({
  children,
  href = "#contact",
  variant = "primary",
  className = "",
  target,
}) {
  return (
    <a
      className={`button button-${variant} ${className}`.trim()}
      href={href}
      {...(target ? { target, rel: "noreferrer" } : {})}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
    </a>
  );
}

export default Button;
