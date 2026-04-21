import type { invoiceCardList } from "../../types/type";
import { StatusBadge } from "../StatusBadge/statusBadge";
import { useNavigate } from "react-router-dom";

export function InvoiceCardList({
  id,
  name,
  maindate,
  amount,
  status,
}: invoiceCardList) {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(`/invoice/${id}`)}>
        <h5>{id}</h5>
        <p>{maindate}</p>
        <p>{name}</p>
        <p> £{amount}</p>

        <StatusBadge status={status} />
      </button>
    </div>
  );
}
