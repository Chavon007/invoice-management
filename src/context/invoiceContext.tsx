import type { Invoice, InvoiceContextType } from "../types/type";
import { useState, createContext, useContext, useEffect } from "react";
import { seedInvoices } from "../data/data";
const InvoiceContext = createContext<InvoiceContextType | null>(null);

export const InvoiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const stored = localStorage.getItem("invoices");
    return stored ? JSON.parse(stored) : seedInvoices;
  });

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [...prev, invoice]);
  };
  const updateInvoice = (updated: Invoice) => {
    setInvoices((prev) =>
      prev.map((invoice) => (invoice.id === updated.id ? updated : invoice)),
    );
  };
  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };

  const markAsPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...invoice, status: "paid" } : invoice,
      ),
    );
  };
  return (
    <InvoiceContext.Provider
      value={{ invoices, markAsPaid, deleteInvoice, addInvoice, updateInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice  must be used inside <InvoiceProvider>");
  }
  return context;
};
