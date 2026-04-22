import { useInvoice } from "../context/invoiceContext";
import { FilterStatus } from "../components/filter/filterStatus";
import NewInvoice from "../components/button/newInvoiceButton";
import { InvoiceCardList } from "../components/invoicecardlist/invoicecardlist";
import { SideBar } from "../components/sidebar/sidebar";
import EmptyInvoice from "../components/emptyinvoice/emptyinvoice";
import { useState } from "react";
import InvoiceForm from "../components/invoiceForm/invoiceForm";
import type { filterState } from "../types/type";

export function InvoiceList() {
  const { invoices } = useInvoice();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<filterState>({
    draft: false,
    pending: false,
    paid: false,
  });

  const filteredInvoice = invoices.filter((invoice) => {
    if (!filter.draft && !filter.pending && !filter.paid) {
      return true;
    } else {
      return filter[invoice.status];
    }
  });
  return (
    <div className="invoice-list">
      <section className="invoice-list__sidebar">
        <SideBar />
      </section>

      <div className="invoice-list__content">
        <section className="invoice-list__header">
          <div className="invoice-list__title">
            <h2>Invoices</h2>
            <p>There are {filteredInvoice.length} total invoices</p>
          </div>
          <div className="invoice-list__actions">
            <FilterStatus onFilterStatus={setFilter} />
            <NewInvoice onClick={() => setShowForm(true)} />
          </div>
        </section>

        {showForm && (
          <InvoiceForm mode="create" onClose={() => setShowForm(false)} />
        )}

        <section className="invoice-list__cards">
          {filteredInvoice.length > 0 ? (
            filteredInvoice.map((invoice) => (
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
