import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import QueueTable from "./QueueTable";

const headers = ["ENTRY CODE","SUBMITTED BY","VISITOR","DATE","COMPANY / ADDRESS","PURPOSE","STATUS","PRIORITY","ACTIONS"];

function RequestsQueue() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className={`app-shell${isSidebarOpen ? " sidebar-open" : ""}`}>
      <Header user={{ name: "Administrator", department: "IT Division" }} unreadCount={0} searchValue={searchValue} onSearchChange={setSearchValue} onOpenNotifications={() => {}} onLogout={() => {}} />
      <Sidebar activeItem="Supervisor Request" isOpen={isSidebarOpen} onItemChange={() => {}} onLogout={() => {}} onToggle={() => setIsSidebarOpen((o) => !o)} />
      <main className="main-content">
        <section style={{ padding: 24 }}>
          <QueueTable activeTab="All" lockedTab={false} headers={headers} />
        </section>
      </main>
    </div>
  );
}
export default RequestsQueue;