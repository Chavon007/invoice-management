import "./button.css"
import type { buttonProps } from "../../types/type";
import { FaPlus } from "react-icons/fa6";

function NewInvoice({ onClick }: buttonProps) {
  return (
    <button className="btn btn--new-invoice" onClick={onClick}>
      <span className="btn__icon"><FaPlus /></span>
      <span>New Invoice</span>
    </button>
  );
}

export default NewInvoice;