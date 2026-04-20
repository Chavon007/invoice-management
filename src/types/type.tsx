import type { ReactNode } from "react";

// status Badge
export type statusBadgeProps = { status: "Paid" | "Pending" | "Draft" };

export interface buttonProps {
  onClick: () => void;
}

export interface deleteProps {
  invoiceId: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface filterState {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

export interface filterStatusProps {
  onFilterStatus: () => void;
}

export interface invoiceCardList {
  id: string;
  name: string;
  maindate: string;
  amount: number;
  status: "paid" | "pending" | "draft";
}

export interface Invoice {
  id: string;
  senderAddress: {
    street: string;
    city: string;
    postCard: string;
    country: string;
  };
  name: string;
  receiverEmail: string;
  receiverAddress: {
    street: string;
    city: string;
    postCard: string;
    country: string;
  };
  invoiceDate: string;
  paymentTerms: string;
  projectDesc: string;
  total: number;
  status: "paid" | "pending" | "draft";
  itemList: {
    itemName: string;
    qty: number;
    price: number;
    total: number;
  }[];
}

export interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
}
