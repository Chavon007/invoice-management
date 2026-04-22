import "./button.css";
import type { buttonProps } from "../../types/type";

function MarkAsPaid({ onClick }: buttonProps) {
  return (
    <button type="button" className="btn btn--paid" onClick={onClick}>
      Mark as Paid
    </button>
  );
}

export default MarkAsPaid;
