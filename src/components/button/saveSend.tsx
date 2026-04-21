import "./button.css"
import type { buttonProps } from "../../types/type";

export function SaveBtn({ onClick }: buttonProps) {
  return <button className="btn btn--draft" onClick={onClick}>Save & send</button>;
}