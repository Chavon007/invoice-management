import "./button.css";
import type { buttonProps } from "../../types/type";
import { FaPlus } from "react-icons/fa6";

export function AddNewItemBtn({ onClick }: buttonProps) {
  return (
    <button type="button" className="btn btn--add-item" onClick={onClick}>
      <span className="btn__icon">
        <FaPlus />
      </span>
      <span>Add New Item</span>
    </button>
  );
}
