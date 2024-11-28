import { Outlet } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading";
import { useData } from "./contexts/DataProvider";

function App() {
  const { data } = useData();

  if (data === null) {
    return <Loading />;
  }

  return <Outlet />;
}

export default App;
