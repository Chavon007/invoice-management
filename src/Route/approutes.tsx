import { Route, Routes } from "react-router-dom";
import { InvoiceList } from "../pages/invoicelist";
import { InvoiceDetails } from "../pages/invoicedetails";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<InvoiceList />} />
      <Route path="/invoice/:id" element={<InvoiceDetails />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};
export default AppRouter;
