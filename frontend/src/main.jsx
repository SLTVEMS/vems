import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MyrequestPage from "./pages/Myrequest.jsx";
import requestData from "./mocks/requestData";

{/*import HomePage from "./pages/Home.jsx"; 

  import MyrequestPage from "./pages/Myrequest.jsx";
  import requestData from "./mocks/requestData";*/}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyrequestPage requests={requestData} />
    {/*<HomePage />

    <MyrequestPage requests={requestData} />*/}
  </StrictMode>,
);