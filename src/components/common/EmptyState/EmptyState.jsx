import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./EmptyState.module.css";

export const EMPTY_STATE_ANIMATION = "https://lottie.host/d9286378-e94e-4af2-a22b-8904088d3804/HVsbhRP0cG.lottie";

export default function EmptyState({ title, description, actionLabel, actionTo, compact = false, className = "" }) {
  return (
    <div className={`${styles.emptyState} ${compact ? styles.compact : ""} ${className}`.trim()} role="status">
      <div className={styles.animation} aria-hidden="true">
        <DotLottieReact backgroundColor="transparent" src={EMPTY_STATE_ANIMATION} loop autoplay />
      </div>
      <div className={styles.copy}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {actionLabel && actionTo && (
        <Link className={styles.action} to={actionTo}>
          {actionLabel} <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}
