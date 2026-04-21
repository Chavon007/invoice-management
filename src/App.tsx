import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Route/approutes";
function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
