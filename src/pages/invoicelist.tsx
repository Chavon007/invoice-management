import { useInvoice } from "../context/invoiceContext";
import { FilterStatus } from "../components/filter/filterStatus";
import NewInvoice from "../components/button/newInvoiceButton";
import { InvoiceCardList } from "../components/invoicecardlist/invoicecardlist";
import { SideBar } from "../components/sidebar/sidebar";
import EmptyInvoice from "../components/emptyinvoice/emptyinvoice";
import { useState } from "react";

export function InvoiceList() {
  const { invoices } = useInvoice();
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="invoice-list">
      <section className="invoice-list__sidebar">
        <SideBar />
      </section>

      <div className="invoice-list__content">
        <section className="invoice-list__header">
          <div className="invoice-list__title">
            <h2>Invoices</h2>
            <p>There are {invoices.length} total invoices</p>
          </div>
          <div className="invoice-list__actions">
            <div className="invoice-list__filter">
              <FilterStatus />
            </div>
            <div className="invoice-list__new">
              <NewInvoice onClick={() => setShowForm(true)} />
              {showForm && (
                <InvoiceForm mode="create" onClose={() => setShowForm(false)} />
              )}
            </div>
          </div>
        </section>

        <section className="invoice-list__cards">
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <InvoiceCardList
                key={invoice.id}
                id={invoice.id}
                name={invoice.name}
                maindate={invoice.invoiceDate}
                amount={invoice.total}
                status={invoice.status}
              />
            ))
          ) : (
            <EmptyInvoice />
          )}
        </section>
      </div>
    </div>
  );
}
