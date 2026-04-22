import "./button.css";
import type { buttonProps } from "../../types/type";
import { FaPlus } from "react-icons/fa6";

function NewInvoice({ onClick }: buttonProps) {
  return (
    <button className="btn btn--new-invoice" onClick={onClick}>
      <span className="btn__icon">
        <FaPlus />
      </span>
      <span className="btn__text">New Invoice</span>
      <span className="btn__text__mobile">New</span>
    </button>
  );
}

export default NewInvoice;
