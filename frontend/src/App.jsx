import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SupervisorRequest from "./pages/SupervisorRequest";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`app-shell${isSidebarOpen ? " sidebar-open" : ""}`}>
      <Sidebar
        activeItem="Supervisor Request"
        isOpen={isSidebarOpen}
        onItemChange={() => {}}
        onLogout={() => {}}
        onToggle={() => setIsSidebarOpen((open) => !open)}
      />
      <main className="main-content">
        <SupervisorRequest />
      </main>
    </div>
  );
}

export default App;