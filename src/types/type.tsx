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
