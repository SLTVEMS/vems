import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import QueueTable from "./QueueTable";

function PendingQueue() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className={`app-shell${isSidebarOpen ? " sidebar-open" : ""}`}>
      <Header user={{ name: "Administrator", department: "IT Division" }} unreadCount={0} searchValue={searchValue} onSearchChange={setSearchValue} onOpenNotifications={() => {}} onLogout={() => {}} />
      <Sidebar activeItem="Supervisor Request" isOpen={isSidebarOpen} onItemChange={() => {}} onLogout={() => {}} onToggle={() => setIsSidebarOpen((o) => !o)} />
      <main className="main-content">
        <section style={{ padding: 24 }}>
          <QueueTable activeTab="Pending" lockedTab={true} />
        </section>
      </main>
    </div>
  );
}
export default PendingQueue;
