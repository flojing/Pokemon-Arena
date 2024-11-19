import { Outlet } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default App;
