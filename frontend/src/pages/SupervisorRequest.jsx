import { useState } from "react";
import QueueTable from "./supervisorRequest/QueueTable";

const headers = ["ENTRY CODE","SUBMITTED BY","VISITOR","DATE","COMPANY / ADDRESS","PURPOSE","STATUS","PRIORITY","ACTIONS"];

function SupervisorRequest({ activeTab: initialTab = "All" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <QueueTable
        activeTab={activeTab}
        lockedTab={false}
        onTabChange={(t) => setActiveTab(t)}
        headers={headers}
      />
    </div>
  );
}
export default SupervisorRequest;