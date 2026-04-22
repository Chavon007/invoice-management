import emailpic from "../../assets/Emailcamp.png";
import "./emptyinvoice.css"
function EmptyInvoice() {
  return (
    <div className="empty">
      <div className="empty__content">
        <img className="empty__image" src={emailpic} alt="Email logo" />
        <h4 className="empty__title">There is nothing here</h4>
        <p className="empty__text">
          Create an invoice by clicking the{" "}
          <strong className="empty__highlight">New Invoice</strong>{" "}
          button and get started
        </p>
      </div>
    </div>
  );
}

export default EmptyInvoice;