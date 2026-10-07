import { useState } from "react";
import { ENVIRONMENT, telTo } from "../constants/environment";

const MOBILE_USER_AGENT = /android|iphone|ipad|ipod|mobile|tablet/i;

/**
 * Smart phone contact link behaviour:
 * - On mobile devices the tel: href opens the dial pad with the number.
 * - On desktop (no dialer exists) clicking copies the number to the
 *   clipboard and exposes a short-lived `copied` flag for UI feedback.
 */
export default function usePhoneContact() {
  const [copied, setCopied] = useState(false);
  const isMobile =
    typeof navigator !== "undefined" &&
    MOBILE_USER_AGENT.test(navigator.userAgent);

  const onClick = (event) => {
    if (isMobile) return; // let the native tel: link open the dial pad
    event.preventDefault(); // desktop has no dialer — copy instead
    navigator.clipboard
      ?.writeText(ENVIRONMENT.contactMobile)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return {
    href: telTo(),
    onClick,
    copied,
    isMobile,
    phone: ENVIRONMENT.contactMobile,
  };
}
