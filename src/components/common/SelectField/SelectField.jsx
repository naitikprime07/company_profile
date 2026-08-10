import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./SelectField.module.css";

function SelectField({
  label,
  name,
  placeholder,
  options,
  required = false,
  defaultValue = "",
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
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

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    const clearOnFormReset = () => {
      setValue(defaultValue);
      setIsOpen(false);
    };

    form?.addEventListener("reset", clearOnFormReset);
    return () => form?.removeEventListener("reset", clearOnFormReset);
  }, [defaultValue]);

  const selectedOption = options.find((option) =>
    typeof option === "string" ? option === value : option.value === value,
  );
  const selectedLabel =
    typeof selectedOption === "string"
      ? selectedOption
      : selectedOption?.shortLabel || selectedOption?.label;

  return (
    <div className={styles.field} ref={rootRef}>
      {label && <span className={styles.label}>{label}</span>}
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
          {selectedLabel || placeholder}
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
          {options.map((option) => {
            const optionValue =
              typeof option === "string" ? option : option.value;
            const optionLabel =
              typeof option === "string" ? option : option.label;

            return (
            <button
              className={
                value === optionValue ? styles.optionSelected : styles.option
              }
              type="button"
              role="option"
              aria-selected={value === optionValue}
              key={optionValue}
              onClick={() => {
                setValue(optionValue);
                onChange?.(optionValue);
                setIsOpen(false);
              }}
            >
              <span>{optionLabel}</span>
              {value === optionValue && <Check size={16} />}
            </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectField;
