import type { statusBadgeProps } from "../../types/type";
import { TbOvalVerticalFilled } from "react-icons/tb";
import "./statusBadge.css";
export function StatusBadge({ status }: statusBadgeProps) {
  return (
    <span className={`status-badge ${status}`}>
      <TbOvalVerticalFilled />
      {status}
    </span>
  );
}
