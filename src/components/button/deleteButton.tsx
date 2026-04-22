import "./button.css";
import type { buttonProps } from "../../types/type";
import { useNavigate } from "react-router-dom";
function DeleteBtn({ onClick }: buttonProps) {
  
  return (
    <button type="button" className="btn btn--delete" onClick={onClick} >
      Delete
    </button>
  );
}

export default DeleteBtn;
