import "./button.css";
import type { buttonProps } from "../../types/type";

function DeleteBtn({ onClick }: buttonProps) {
  
  return (
    <button type="button" className="btn btn--delete" onClick={onClick} >
      Delete
    </button>
  );
}

export default DeleteBtn;
