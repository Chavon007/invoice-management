import "./button.css"
import type { buttonProps } from "../../types/type";

export function DraftBtn({ onClick }: buttonProps) {
  return <button type="button" className="btn btn--draft" onClick={onClick}>Save as Draft</button>;
}