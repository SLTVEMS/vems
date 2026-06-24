import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CreateRequestForm from "./pages/CreateRequestForm";
import VisitorCreateRequestForm from "./components/VisitorCreateRequestForm";
import SupervisorRequest from "./pages/SupervisorRequest";
import "./App.css";

function App() {
  const [activeItem, setActiveItem] = useState("Create Request");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [step, setStep] = useState("create"); // "create" | "visitor"
  const [prefillData, setPrefillData] = useState(null);

  const handleShareForm = (data) => {
    setPrefillData(data);
    setStep("visitor");
  };

  const handleBack = () => {
    setStep("create");
    setPrefillData(null);
  };

  const renderContent = () => {
    if (step === "visitor") {
      return (
        <VisitorCreateRequestForm
          prefillData={prefillData}
          startingVisitorType={prefillData?.visitorType || "Trainee"}
          onBack={handleBack}
        />
      );
    }

    switch (activeItem) {
      case "Supervisor Request":
        return <SupervisorRequest />;
      case "Create Request":
      default:
        return <CreateRequestForm onShareForm={handleShareForm} />;
    }
  };

  return (
    <div className={`app-shell${isSidebarOpen ? " sidebar-open" : ""}`}>
      <Header
        user={{ name: "Administrator", department: "IT Division" }}
        unreadCount={0}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onOpenNotifications={() => {}}
        onLogout={() => {}}
      />

      <Sidebar
        activeItem={activeItem}
        isOpen={isSidebarOpen}
        onItemChange={(item) => {
          setActiveItem(item);
          setStep("create");
          setPrefillData(null);
        }}
        onLogout={() => {}}
        onToggle={() => setIsSidebarOpen((open) => !open)}
      />

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
