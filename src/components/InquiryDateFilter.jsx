import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown, X } from "lucide-react";
import styles from "./InquiryDateFilter.module.css";

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(`${value}T00:00:00`))
    : "";
export default function InquiryDateFilter({ fromDate, toDate, onApply }) {
  const root = useRef(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(
    fromDate && toDate && fromDate !== toDate ? "range" : "single",
  );
  const [from, setFrom] = useState(fromDate);
  const [to, setTo] = useState(toDate);
  useEffect(() => {
    const close = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => {
    setFrom(fromDate);
    setTo(toDate);
  }, [fromDate, toDate]);
  const label = fromDate
    ? toDate && toDate !== fromDate
      ? `${formatDate(fromDate)} – ${formatDate(toDate)}`
      : formatDate(fromDate)
    : "Select date";
  const apply = () => {
    if (!from) return;
    if (mode === "single") onApply(from, from);
    else onApply(from, to);
    setOpen(false);
  };
  const clear = () => {
    setFrom("");
    setTo("");
    onApply("", "");
    setOpen(false);
  };
  return (
    <div className={styles.root} ref={root}>
      <button
        type="button"
        className={`${styles.trigger} ${fromDate ? styles.active : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <CalendarDays size={14} />
        <span>{label}</span>
        {fromDate && (
          <i
            onClick={(event) => {
              event.stopPropagation();
              clear();
            }}
          >
            <X size={12} />
          </i>
        )}
        <ChevronDown size={13} />
      </button>
      {open && (
        <div className={styles.popover}>
          <header>
            <strong>Filter by date</strong>
            <small>Choose one day or a custom range</small>
          </header>
          <div className={styles.modes}>
            <button
              type="button"
              className={mode === "single" ? styles.selected : ""}
              onClick={() => {
                setMode("single");
                setTo("");
              }}
            >
              Single date
            </button>
            <button
              type="button"
              className={mode === "range" ? styles.selected : ""}
              onClick={() => setMode("range")}
            >
              Date range
            </button>
          </div>
          <div className={styles.fields}>
            <label>
              <span>{mode === "single" ? "Date" : "From date"}</span>
              <input
                type="date"
                value={from}
                max={mode === "range" && to ? to : undefined}
                onChange={(event) => setFrom(event.target.value)}
              />
            </label>
            {mode === "range" && (
              <label>
                <span>To date</span>
                <input
                  type="date"
                  value={to}
                  min={from || undefined}
                  onChange={(event) => setTo(event.target.value)}
                />
              </label>
            )}
          </div>
          <footer>
            <button type="button" onClick={clear}>
              Clear
            </button>
            <button
              type="button"
              disabled={!from || (mode === "range" && !to)}
              onClick={apply}
            >
              Apply filter
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}
