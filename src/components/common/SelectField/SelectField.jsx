import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./SelectField.module.css";

function SelectField({ label, name, placeholder, options, required = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef(null);
  const listId = useId();

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className={styles.field} ref={rootRef}>
      <span className={styles.label}>{label}</span>
      <input
        name={name}
        value={value}
        required={required}
        readOnly
        tabIndex={-1}
        aria-hidden="true"
      />
      <button
        className={isOpen ? styles.triggerOpen : styles.trigger}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value || placeholder}
        </span>
        <ChevronDown size={17} />
      </button>
      {isOpen && (
        <div
          className={styles.menu}
          id={listId}
          role="listbox"
          aria-label={label}
        >
          {options.map((option) => (
            <button
              className={
                value === option ? styles.optionSelected : styles.option
              }
              type="button"
              role="option"
              aria-selected={value === option}
              key={option}
              onClick={() => {
                setValue(option);
                setIsOpen(false);
              }}
            >
              <span>{option}</span>
              {value === option && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectField;
