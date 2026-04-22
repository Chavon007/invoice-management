import "./button.css";
import type { buttonProps } from "../../types/type";

export function DiscardBtn({ onClick }: buttonProps) {
  return (
    <button type="button" className="btn btn--discard" onClick={onClick}>
      Discard
    </button>
  );
}
