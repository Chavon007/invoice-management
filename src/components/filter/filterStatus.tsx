import type { filterState } from "../../types/type";
import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
// import "./filterStatus.css";

export function FilterStatus() {
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
              onChange={(e) =>
                setFilter({ ...filter, draft: e.target.checked })
              }
            />
            Draft
          </label>
          <label className="filter__option">
            <input
              className="filter__checkbox"
              type="checkbox"
              checked={filter.pending}
              onChange={(e) =>
                setFilter({ ...filter, pending: e.target.checked })
              }
            />
            Pending
          </label>
          <label className="filter__option">
            <input
              className="filter__checkbox"
              type="checkbox"
              checked={filter.paid}
              onChange={(e) =>
                setFilter({ ...filter, paid: e.target.checked })
              }
            />
            Paid
          </label>
        </section>
      )}
    </div>
  );
}