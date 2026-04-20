import type { invoiceCardList } from "../../types/type";
import { StatusBadge } from "../StatusBadge/statusBadge";
export function InvoiceCardList({
  id,
  name,
  maindate,
  amount,
  status,
}: invoiceCardList) {
  return (
    <div>
      <button>
        <h5>{id}</h5>
        <p>{maindate}</p>
        <p>{name}</p>
        <p>{amount}</p>

        <StatusBadge status={status} />
      </button>
    </div>
  );
}
