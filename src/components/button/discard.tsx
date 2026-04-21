import "./button.css";
import type { buttonProps } from "../../types/type";

export function DiscardBtn({ onClick }: buttonProps) {
  return (
    <button className="btn btn--draft" onClick={onClick}>
      Discard
    </button>
  );
}
