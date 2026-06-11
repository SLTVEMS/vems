import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CreateRequestForm from "./pages/CreateRequestForm";
import "./App.css";

function App() {
  const [activeItem, setActiveItem] = useState("Create Request");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");

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
        onItemChange={setActiveItem}
        onLogout={() => {}}
        onToggle={() => setIsSidebarOpen((open) => !open)}
      />

      <main className="main-content">
        <CreateRequestForm />
      </main>
    </div>
  );
}

export default App;