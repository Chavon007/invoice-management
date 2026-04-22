import type { invoiceCardList } from "../../types/type";
import { StatusBadge } from "../StatusBadge/statusBadge";
import { useNavigate } from "react-router-dom";
import "./invoicecardlist.css";
import { MdArrowForwardIos } from "react-icons/md";

export function InvoiceCardList({
  id,
  name,
  maindate,
  amount,
  status,
}: invoiceCardList) {
  const navigate = useNavigate();

  return (
    <div className="invoice-card">
      <button
        className="invoice-card__button"
        onClick={() => navigate(`/invoice/${id}`)}
      >
        <h5 className="invoice-card__id">{id}</h5>
        <p className="invoice-card__date">{maindate}</p>
        <p className="invoice-card__name">{name}</p>
        <p className="invoice-card__amount">£{amount}</p>

        <StatusBadge status={status} />
        <MdArrowForwardIos className="invoice-card__arrow" />
      </button>

      <button
        className="invoice-card__button_mobile"
        onClick={() => navigate(`/invoice/${id}`)}
      >
        <div className="invoice-card-1">
          <h5 className="invoice-card__id">{id}</h5>
          <p className="invoice-card__date">{maindate}</p>

          <p className="invoice-card__amount">£{amount}</p>
        </div>
        <div className="invoice-card-2">
          {" "}
          <p className="invoice-card__name">{name}</p>
          <StatusBadge status={status} />
        </div>
      </button>
    </div>
  );
}
