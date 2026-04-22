import type { Invoice, InvoiceFormProps, InvoiceItem } from "../../types/type";
import { useState } from "react";
import { AddNewItemBtn } from "../button/addButton";
import { DraftBtn } from "../button/draftButton";
import { SaveBtn } from "../button/saveSend";
import { DiscardBtn } from "../button/discard";
import { useInvoice } from "../../context/invoiceContext";
import "./invoiceform.css";
import { useEffect } from "react";
const initialErrors = {
  name: "",
  receiverEmail: "",
  senderStreet: "",
  senderCity: "",
  senderPostCode: "",
  senderCountry: "",
  receiverStreet: "",
  receiverCity: "",
  receiverPostCode: "",
  receiverCountry: "",
  invoiceDate: "",
  paymentTerms: "",
  projectDesc: "",
  itemList: "",
};
function InvoiceForm({ mode, invoice, onClose }: InvoiceFormProps) {
  const { addInvoice, updateInvoice } = useInvoice();

  const [formDetails, setFormDetails] = useState<Invoice>({
    id: invoice?.id || "",
    status: invoice?.status || "draft",
    senderAddress: {
      city: invoice?.senderAddress.city || "",
      country: invoice?.senderAddress.country || "",
      street: invoice?.senderAddress.street || "",
      postCard: invoice?.senderAddress.postCard || "",
    },
    name: invoice?.name || "",
    receiverAddress: {
      city: invoice?.receiverAddress.city || "",
      country: invoice?.receiverAddress.country || "",
      street: invoice?.receiverAddress.street || "",
      postCard: invoice?.receiverAddress.postCard || "",
    },
    receiverEmail: invoice?.receiverEmail || "",
    invoiceDate: invoice?.invoiceDate || "",
    paymentTerms: invoice?.paymentTerms || "Net 30 Days",
    projectDesc: invoice?.projectDesc || "",
    total: invoice?.total || 0,
    itemList: invoice?.itemList || [],
  });
  const [error, setError] = useState(initialErrors);

  const [currentItem, setCurrentItem] = useState<InvoiceItem>({
    itemName: "",
    qty: 0,
    price: 0,
    total: 0,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAddItem = () => {
    if (!currentItem.itemName || currentItem.qty <= 0 || currentItem.price <= 0)
      return;
    const newItem = {
      ...currentItem,
      total: currentItem.qty * currentItem.price,
    };
    setFormDetails({
      ...formDetails,
      itemList: [...formDetails.itemList, newItem],
      total: formDetails.total + newItem.total,
    });
    setCurrentItem({ itemName: "", qty: 0, price: 0, total: 0 });
  };

  const handleDeleteItem = (index: number) => {
    const updated = formDetails.itemList.filter((_, i) => i !== index);
    const newTotal = updated.reduce((sum, item) => sum + item.total, 0);
    setFormDetails({ ...formDetails, itemList: updated, total: newTotal });
  };

  const generateId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters =
      letters[Math.floor(Math.random() * 26)] +
      letters[Math.floor(Math.random() * 26)];
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    return `${randomLetters}${randomNumbers}`;
  };

  const formValidation = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!formDetails.name.trim()) {
      newErrors.name = "Client name is required";
      isValid = false;
    }

    if (!formDetails.receiverEmail) {
      newErrors.receiverEmail = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formDetails.receiverEmail)) {
      newErrors.receiverEmail = "Vaild email is required";
      isValid = false;
    }
    if (formDetails.itemList.length === 0) {
      newErrors.itemList = "At least one itme is required";
      isValid = false;
    }
    if (!formDetails.invoiceDate) {
      newErrors.invoiceDate = "Pick a proper date";
      isValid = false;
    }
    if (!formDetails.receiverAddress.city.trim()) {
      newErrors.receiverCity = "City is required";
      isValid = false;
    }
    if (!formDetails.receiverAddress.country.trim()) {
      newErrors.receiverCountry = "Country is required";
      isValid = false;
    }
    if (!formDetails.receiverAddress.postCard.trim()) {
      newErrors.receiverPostCode = "Post code is required";
      isValid = false;
    }
    if (!formDetails.receiverAddress.street.trim()) {
      newErrors.receiverStreet = "Street name is required";
      isValid = false;
    }

    if (!formDetails.senderAddress.city.trim()) {
      newErrors.senderCity = "City is required";
      isValid = false;
    }
    if (!formDetails.senderAddress.postCard.trim()) {
      newErrors.senderPostCode = "Post code is required";
      isValid = false;
    }
    if (!formDetails.senderAddress.country.trim()) {
      newErrors.senderCountry = "Country is required";
      isValid = false;
    }
    if (!formDetails.senderAddress.street.trim()) {
      newErrors.senderStreet = "Street name is required";
      isValid = false;
    }

    if (!formDetails.paymentTerms) {
      newErrors.paymentTerms = "Choose a payment term ";
      isValid = false;
    }

    if (!formDetails.projectDesc.trim()) {
      newErrors.projectDesc = "Choose project decription";
      isValid = false;
    }
    setError(newErrors);
    return isValid;
  };
  const handleSaveAsDraft = () => {
    const draft = {
      ...formDetails,
      id: formDetails.id || generateId(),
      status: "draft" as const,
    };
    addInvoice(draft);
    onClose();
  };

  const handleSaveAndSend = () => {
    if (!formValidation()) return;

    const pending = {
      ...formDetails,
      id: formDetails.id || generateId(),
      status: "pending" as const,
    };
    if (mode === "edit") {
      updateInvoice(pending);
    } else {
      addInvoice(pending);
    }
    onClose();
  };

  return (
    <div className="invoice-form__overlay">
      <div className="invoice-form">
        <h2 className="invoice-form__title">
          {mode === "edit" ? `Edit #${invoice?.id}` : "New Invoice"}
        </h2>

        <form
          className="invoice-form__body"
          onClick={(e) => e.preventDefault()}
        >
          {/* Bill From */}
          <section className="invoice-form__section">
            <h4 className="invoice-form__section-title">Bill From</h4>

            <label className="invoice-form__label">
              Street Address
              <input
                className="invoice-form__input"
                type="text"
                value={formDetails.senderAddress.street}
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    senderAddress: {
                      ...formDetails.senderAddress,
                      street: e.target.value,
                    },
                  });
                  setError({ ...error, senderStreet: "" });
                }}
              />
              {error.senderStreet && (
                <small className="error-text">{error.senderStreet}</small>
              )}
            </label>

            <div className="invoice-form__row">
              <label className="invoice-form__label">
                City
                <input
                  className="invoice-form__input"
                  type="text"
                  value={formDetails.senderAddress.city}
                  onChange={(e) => {
                    setFormDetails({
                      ...formDetails,
                      senderAddress: {
                        ...formDetails.senderAddress,
                        city: e.target.value,
                      },
                    });
                    setError({ ...error, senderCity: "" });
                  }}
                />
                {error.senderCity && (
                  <small className="error-text">{error.senderCity}</small>
                )}
              </label>

              <label className="invoice-form__label">
                Post Code
                <input
                  className="invoice-form__input"
                  type="text"
                  value={formDetails.senderAddress.postCard}
                  onChange={(e) => {
                    setFormDetails({
                      ...formDetails,
                      senderAddress: {
                        ...formDetails.senderAddress,
                        postCard: e.target.value,
                      },
                    });
                    setError({ ...error, senderPostCode: "" });
                  }}
                />
                {error.senderPostCode && (
                  <small className="error-text">{error.senderPostCode}</small>
                )}
              </label>

              <label className="invoice-form__label">
                Country
                <input
                  className="invoice-form__input"
                  type="text"
                  value={formDetails.senderAddress.country}
                  onChange={(e) => {
                    setFormDetails({
                      ...formDetails,
                      senderAddress: {
                        ...formDetails.senderAddress,
                        country: e.target.value,
                      },
                    });
                    setError({ ...error, senderCountry: "" });
                  }}
                />
                {error.senderCountry && (
                  <small className="error-text">{error.senderCountry}</small>
                )}
              </label>
            </div>
          </section>

          {/* Bill To */}
          <section className="invoice-form__section">
            <h4 className="invoice-form__section-title">Bill To</h4>

            <label className="invoice-form__label">
              Client's Name
              <input
                className="invoice-form__input"
                type="text"
                value={formDetails.name}
                onChange={(e) => {
                  setFormDetails({ ...formDetails, name: e.target.value });
                  setError({ ...error, name: "" });
                }}
              />
              {error.name && <small className="error-text">{error.name}</small>}
            </label>

            <label className="invoice-form__label">
              Client's Email
              <input
                className="invoice-form__input"
                type="email"
                value={formDetails.receiverEmail}
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    receiverEmail: e.target.value,
                  });
                  setError({ ...error, receiverEmail: "" });
                }}
              />
              {error.receiverEmail && (
                <small className="error-text">{error.receiverEmail}</small>
              )}
            </label>

            <label className="invoice-form__label">
              Street Address
              <input
                className="invoice-form__input"
                type="text"
                value={formDetails.receiverAddress.street}
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    receiverAddress: {
                      ...formDetails.receiverAddress,
                      street: e.target.value,
                    },
                  });
                  setError({ ...error, receiverStreet: "" });
                }}
              />
              {error.receiverStreet && (
                <small className="error-text">{error.receiverStreet}</small>
              )}
            </label>

            <div className="invoice-form__row">
              <label className="invoice-form__label">
                City
                <input
                  className="invoice-form__input"
                  type="text"
                  value={formDetails.receiverAddress.city}
                  onChange={(e) => {
                    setFormDetails({
                      ...formDetails,
                      receiverAddress: {
                        ...formDetails.receiverAddress,
                        city: e.target.value,
                      },
                    });
                    setError({ ...error, receiverCity: "" });
                  }}
                />
                {error.receiverCity && (
                  <small className="error-text">{error.receiverCity}</small>
                )}
              </label>

              <label className="invoice-form__label">
                Post Code
                <input
                  className="invoice-form__input"
                  type="text"
                  value={formDetails.receiverAddress.postCard}
                  onChange={(e) => {
                    setFormDetails({
                      ...formDetails,
                      receiverAddress: {
                        ...formDetails.receiverAddress,
                        postCard: e.target.value,
                      },
                    });
                    setError({ ...error, receiverPostCode: "" });
                  }}
                />
                {error.receiverPostCode && (
                  <small className="error-text">{error.receiverPostCode}</small>
                )}
              </label>

              <label className="invoice-form__label">
                Country
                <input
                  className="invoice-form__input"
                  type="text"
                  value={formDetails.receiverAddress.country}
                  onChange={(e) => {
                    setFormDetails({
                      ...formDetails,
                      receiverAddress: {
                        ...formDetails.receiverAddress,
                        country: e.target.value,
                      },
                    });
                    setError({ ...error, receiverCountry: "" });
                  }}
                />
                {error.receiverCountry && (
                  <small className="error-text">{error.receiverCountry}</small>
                )}
              </label>
            </div>
          </section>

          {/* Invoice Details */}
          <section className="invoice-form__section">
            <div className="invoice-form__row--two">
              <label className="invoice-form__label">
                Invoice Date
                <input
                  className="invoice-form__input"
                  type="date"
                  value={formDetails.invoiceDate}
                  onChange={(e) => {
                    setFormDetails({
                      ...formDetails,
                      invoiceDate: e.target.value,
                    });
                    setError({ ...error, invoiceDate: "" });
                  }}
                />
                {error.invoiceDate && (
                  <small className="error-text">{error.invoiceDate}</small>
                )}
              </label>

              <label className="invoice-form__label">
                Payment Terms
                <select
                  className="invoice-form__input invoice-form__select"
                  value={formDetails.paymentTerms}
                  onChange={(e) => {
                    setFormDetails({
                      ...formDetails,
                      paymentTerms: e.target.value,
                    });
                    setError({ ...error, paymentTerms: "" });
                  }}
                >
                  <option value="Net 1 Day">Net 1 Day</option>
                  <option value="Net 7 Days">Net 7 Days</option>
                  <option value="Net 14 Days">Net 14 Days</option>
                  <option value="Net 30 Days">Net 30 Days</option>
                </select>
                {error.paymentTerms && (
                  <small className="error-text">{error.paymentTerms}</small>
                )}
              </label>
            </div>

            <label className="invoice-form__label">
              Project Description
              <input
                className="invoice-form__input"
                type="text"
                value={formDetails.projectDesc}
                onChange={(e) => {
                  setFormDetails({
                    ...formDetails,
                    projectDesc: e.target.value,
                  });
                  setError({ ...error, projectDesc: "" });
                }}
              />
              {error.projectDesc && (
                <small className="error-text">{error.projectDesc}</small>
              )}
            </label>
          </section>

          {/* Item List */}
          <section className="invoice-form__section">
            <h4 className="invoice-form__section-title">Item List</h4>

            {error.itemList && (
              <small className="error-text">{error.itemList}</small>
            )}

            {/* Existing Items */}
            {formDetails.itemList.length > 0 && (
              <div className="invoice-form__items">
                <div className="invoice-form__items-header">
                  <span>Item Name</span>
                  <span>QTY.</span>
                  <span>Price</span>
                  <span>Total</span>
                </div>

                {formDetails.itemList.map((item, index) => (
                  <div key={index} className="invoice-form__item-row">
                    <p className="invoice-form__item-name">{item.itemName}</p>

                    {/* Wrap these in a meta div for mobile layout */}
                    <div className="invoice-form__item-meta">
                      <p className="invoice-form__item-qty">{item.qty}</p>
                      <p className="invoice-form__item-price">£{item.price}</p>
                      <p className="invoice-form__item-total">£{item.total}</p>
                      <button
                        type="button"
                        className="invoice-form__item-delete"
                        onClick={() => handleDeleteItem(index)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* New Item Inputs */}
            <div className="invoice-form__new-item">
              <div className="invoice-form__row-item">
                <label className="invoice-form__label">
                  Item Name
                  <input
                    className="invoice-form__input"
                    type="text"
                    value={currentItem.itemName}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        itemName: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="invoice-form__label">
                  QTY.
                  <input
                    className="invoice-form__input"
                    type="number"
                    value={currentItem.qty || ""}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        qty: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label className="invoice-form__label">
                  Price
                  <input
                    className="invoice-form__input"
                    type="number"
                    value={currentItem.price || ""}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <label className="invoice-form__label">
                  Total
                  <input
                    className="invoice-form__input invoice-form__input--readonly"
                    type="number"
                    value={currentItem.qty * currentItem.price}
                    readOnly
                  />
                </label>
                <div />{" "}
                {/* placeholder to fill the 5th grid column (delete icon space) */}
              </div>
            </div>

            <AddNewItemBtn onClick={handleAddItem} />
          </section>

          {/* Form Actions */}
          <section className="invoice-form__actions">
            <DiscardBtn onClick={onClose} />
            <div className="invoice-form__actions-right">
              <DraftBtn onClick={handleSaveAsDraft} />
              <SaveBtn onClick={handleSaveAndSend} />
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;
