import type { deleteProps } from "../../types/type";
import { useEffect, useRef } from "react";
import "./deletemodal.css";


export const DeleteModal = ({
  onCancel,
  onConfirm,
  invoiceId,
}: deleteProps) => {
  const modelRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  useEffect(() => {
    const focusableElements = modelRef.current?.querySelectorAll<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstElement?.focus();
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" ref={modelRef}>
        <div className="modal__content">
          <h2 className="modal__title" id="modal-title">
            Confirm Deletion
          </h2>
          <p className="modal__body">
            Are you sure you want to delete invoice #{invoiceId}? This action
            cannot be undone.
          </p>
        </div>
        <div className="modal__actions">
          <button className="modal__btn modal__btn--cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal__btn modal__btn--delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
