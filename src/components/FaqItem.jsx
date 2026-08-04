import { Plus } from "lucide-react";

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <article className={isOpen ? "faq-item is-open" : "faq-item"}>
      <h3>
        <button type="button" onClick={onClick} aria-expanded={isOpen}>
          {question}
          <Plus aria-hidden="true" size={21} />
        </button>
      </h3>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </article>
  );
}

export default FaqItem;
