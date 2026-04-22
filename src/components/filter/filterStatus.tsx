import type { filterState, filterStatusProps } from "../../types/type";
import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import "./filterStatus.css";

export function FilterStatus({ onFilterStatus }: filterStatusProps) {
  const [filter, setFilter] = useState<filterState>({
    draft: false,
    pending: false,
    paid: false,
  });
  const [showTab, setShowTab] = useState(false);

  const showFilterTable = () => {
    setShowTab((prev) => !prev);
  };

  return (
    <div className="filter">
      <div className="filter__header">
        <h3 className="filter__title">Filter by status</h3>
        <button className="filter__toggle" onClick={showFilterTable}>
          {showTab ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </button>
      </div>

      {showTab && (
        <section className="filter__dropdown">
          <label className="filter__option">
            <input
              className="filter__checkbox"
              type="checkbox"
              checked={filter.draft}
              onChange={(e) => {
                const updated = { ...filter, draft: e.target.checked };
                setFilter(updated);
                onFilterStatus(updated);
              }}
            />
            <span className="filter__checkbox-custom" />
            Draft
          </label>

          <label className="filter__option">
            <input
              className="filter__checkbox"
              type="checkbox"
              checked={filter.pending}
              onChange={(e) => {
                const updated = { ...filter, pending: e.target.checked };
                setFilter(updated);
                onFilterStatus(updated);
              }}
            />
            <span className="filter__checkbox-custom" />
            Pending
          </label>

          <label className="filter__option">
            <input
              className="filter__checkbox"
              type="checkbox"
              checked={filter.paid}
              onChange={(e) => {
                const updated = { ...filter, paid: e.target.checked };
                setFilter(updated);
                onFilterStatus(updated);
              }}
            />
            <span className="filter__checkbox-custom" />
            Paid
          </label>
        </section>
      )}
    </div>
  );
}
