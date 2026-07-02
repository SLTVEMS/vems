import { useState } from "react";
import Home from "./pages/Home.jsx";
import MyRequestsPage from "./pages/Myrequest.jsx";

function Root() {
  const [page, setPage] = useState("home");

  return page === "home" ? (
    <Home onLogin={() => setPage("requests")} />
  ) : (
    <MyRequestsPage />
  );
}

export default Root;
