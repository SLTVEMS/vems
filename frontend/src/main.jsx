import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/Home.jsx"; 

{/*import HomePage from "./pages/Home.jsx"; 

  import MyrequestPage from "./pages/Myrequest.jsx";
  import requestData from "./mocks/requestData";*/}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HomePage />
    {/*<HomePage />

    <MyrequestPage requests={requestData} />*/}
  </StrictMode>,
);
