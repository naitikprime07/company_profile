import { useState } from "react";
import { ENVIRONMENT, telTo } from "../constants/environment";

const MOBILE_USER_AGENT = /android|iphone|ipad|ipod|mobile|tablet/i;

/**
 * Smart phone contact link behaviour:
 * - On mobile devices the tel: href opens the dial pad with the number.
 * - On desktop (no dialer exists) clicking copies the number to the
 *   clipboard and exposes a short-lived `copied` flag for UI feedback.
 *
 * Pass a specific `phoneNumber` to control which number is shown/used.
 * Defaults to the company number (COMPANY_MOBILE) used on the Contact page;
 * the Footer passes the contact number (CONTACT_MOBILE) instead.
 */
export default function usePhoneContact(phoneNumber = ENVIRONMENT.companyMobile) {
  const [copied, setCopied] = useState(false);
  const isMobile =
    typeof navigator !== "undefined" &&
    MOBILE_USER_AGENT.test(navigator.userAgent);

  const onClick = (event) => {
    if (isMobile) return; // let the native tel: link open the dial pad
    event.preventDefault(); // desktop has no dialer — copy instead
    navigator.clipboard
      ?.writeText(phoneNumber)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return {
    href: telTo(phoneNumber),
    onClick,
    copied,
    isMobile,
    phone: phoneNumber,
  };
}
