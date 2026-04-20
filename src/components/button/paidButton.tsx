import "./button.css";
import type { buttonProps } from "../../types/type";

function MarkAsPaid({ onClick }: buttonProps) {
  return (
    <button className="btn btn--paid" onClick={onClick}>
      Mark as Paid
    </button>
  );
}

export default MarkAsPaid;
