import { useState } from "react";
import CreateRequestForm from "./CreateRequestForm.jsx";
import VisitorCreateRequest from "./VisitorCreateRequestForm.jsx";

function VisitorRequestFlow({ onBack }) {
  const [step, setStep] = useState("create");
  const [prefillData, setPrefillData] = useState(null);

  if (step === "visitor") {
    return (
      <VisitorCreateRequest
        prefillData={prefillData}
        onBack={() => setStep("create")}
      />
    );
  }

  return (
    <CreateRequestForm
      onBack={onBack}
      onShareForm={(data) => {
        setPrefillData(data);
        setStep("visitor");
      }}
    />
  );
}

export default VisitorRequestFlow;
