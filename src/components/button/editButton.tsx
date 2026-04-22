import "./button.css"
import type { buttonProps } from "../../types/type";

export function EditBtn({ onClick }: buttonProps) {
  return <button  type="button" className="btn btn--edit" onClick={onClick}>Edit</button>;
}