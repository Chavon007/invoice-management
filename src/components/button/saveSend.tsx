import "./button.css";
import type { buttonProps } from "../../types/type";

export function SaveBtn({ onClick }: buttonProps) {
  return (
    <button type="button" className="btn btn--save" onClick={onClick}>
      Save & send
    </button>
  );
}
