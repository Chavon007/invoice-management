import { useInvoice } from "../context/invoiceContext";
import { EditBtn } from "../components/button/editButton";
import DeleteBtn from "../components/button/deleteButton";
import MarkAsPaid from "../components/button/paidButton";
import { Link, useParams } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge/statusBadge";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import InvoiceForm from "../components/invoiceForm/invoiceForm";
import { DeleteModal } from "../components/deleteModal/deletemodal";
import { SideBar } from "../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";

export function InvoiceDetails() {
  const navigate = useNavigate();
  const { invoices, markAsPaid, deleteInvoice } = useInvoice();
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) return <p>Invoice not found</p>;

  return (
    <div className="invoice-detail">
      <section className="invoice-list__sidebar">
        <SideBar />
      </section>

      <div className="invoice-list__content">
        <section className="invoice-details__back">
          <Link to="/" className="invoice-details__back-link">
            <IoIosArrowBack />
            <p>Go Back</p>
          </Link>
        </section>

        <section className="invoice-details__status-bar">
          <div className="invoice-details__status">
            <h6 className="invoice-details__status-label">Status</h6>
            <StatusBadge status={invoice.status} />
          </div>
          <div className="invoice-details__actions">
            {invoice.status !== "paid" && (
              <EditBtn onClick={() => setShowForm(true)} />
            )}
            {showForm && (
              <InvoiceForm
                mode="edit"
                invoice={invoice}
                onClose={() => setShowForm(false)}
              />
            )}
            <DeleteBtn onClick={() => setShowModal(true)} />
            {showModal && (
              <DeleteModal
                invoiceId={invoice.id}
                onConfirm={() => {
                  deleteInvoice(invoice.id);
                  navigate("/");
                }}
                onCancel={() => setShowModal(false)}
              />
            )}
            {invoice.status === "pending" && (
              <MarkAsPaid onClick={() => markAsPaid(invoice.id)} />
            )}
          </div>
        </section>

        <section className="invoice-details__status-bar1">
          <div className="invoice-details__status">
            <h6 className="invoice-details__status-label">Status</h6>
            <StatusBadge status={invoice.status} />
          </div>
        </section>

        <section className="invoice-details__body">
          <div className="invoice-details__card">
            <div className="invoice-details__top">
              <div className="invoice-details__id-block">
                <h6 className="invoice-details__id">#{invoice.id}</h6>
                <p className="invoice-details__desc">{invoice.projectDesc}</p>
              </div>
              <div className="invoice-details__sender">
                <p>{invoice.senderAddress.street}</p>
                <p>{invoice.senderAddress.city}</p>
                <p>{invoice.senderAddress.postCard}</p>
                <p>{invoice.senderAddress.country}</p>
              </div>
            </div>

            <div className="invoice-details__meta">
              <div className="invoice-details__dates">
                <div className="invoice-details__date-block">
                  <p className="invoice-details__label">Invoice Date</p>
                  <h5 className="invoice-details__value">{invoice.invoiceDate}</h5>
                </div>
                <div className="invoice-details__date-block">
                  <p className="invoice-details__label">Payment Due</p>
                  <h5 className="invoice-details__value">{invoice.paymentTerms}</h5>
                </div>
              </div>

              <div className="invoice-details__bill-to">
                <p className="invoice-details__label">Bill To</p>
                <h5 className="invoice-details__value">{invoice.name}</h5>
                <p>{invoice.receiverAddress.street}</p>
                <p>{invoice.receiverAddress.city}</p>
                <p>{invoice.receiverAddress.postCard}</p>
                <p>{invoice.receiverAddress.country}</p>
              </div>

              <div className="invoice-details__sent-to">
                <p className="invoice-details__label">Sent to</p>
                <h5 className="invoice-details__value">{invoice.receiverEmail}</h5>
              </div>
            </div>

            {/* items table */}
            <div className="invoice-details__items">
              <table className="invoice-details__table">
                <thead className="invoice-details__table-head">
                  <tr>
                    <th>Item Name</th>
                    <th>QTY.</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody className="invoice-details__table-body">
                  {invoice.itemList.map((item, index) => (
                    <tr key={index} className="invoice-details__table-row">
                      {/* first cell: name always visible, meta only on mobile */}
                      <td className="item-info">
                        <span className="item-name">{item.itemName}</span>
                        <div className="item-meta">
                          <span>{item.qty}</span>
                          <span>x</span>
                          <span>£{item.price}</span>
                        </div>
                      </td>
                      {/* these cells show on desktop, hidden on mobile */}
                      <td className="item-qty">{item.qty}</td>
                      <td className="item-price">£{item.price}</td>
                      <td className="item-total">£{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <section className="invoice-details__total">
                <h5 className="invoice-details__total-label">Grand Total</h5>
                <p className="invoice-details__total-amount">£{invoice.total}</p>
              </section>
            </div>
          </div>
        </section>

        <section className="invoice-details__status-bar__mobile">
          <div className="invoice-details__actions">
            {invoice.status !== "paid" && (
              <EditBtn onClick={() => setShowForm(true)} />
            )}
            {showForm && (
              <InvoiceForm
                mode="edit"
                invoice={invoice}
                onClose={() => setShowForm(false)}
              />
            )}
            <DeleteBtn onClick={() => setShowModal(true)} />
            {showModal && (
              <DeleteModal
                invoiceId={invoice.id}
                onConfirm={() => {
                  deleteInvoice(invoice.id);
                  navigate("/");
                }}
                onCancel={() => setShowModal(false)}
              />
            )}
            {invoice.status === "pending" && (
              <MarkAsPaid onClick={() => markAsPaid(invoice.id)} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}