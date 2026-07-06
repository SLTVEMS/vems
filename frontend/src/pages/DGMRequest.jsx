import { useState } from "react";
import QueueTable from "./dgmRequest/QueueTable";

// Same columns as SupervisorRequest, plus NIGHT WORK (derived from gradeName:
// A.1 / A.2 / A.3 show "Yes", every other grade renders a blank cell).
const headers = [
  "ENTRY CODE",
  "SUBMITTED BY",
  "VISITOR",
  "DATE",
  "COMPANY / ADDRESS",
  "PURPOSE",
  "NIGHT WORK",
  "STATUS",
  "PRIORITY",
  "ACTIONS",
];

function DGMRequest({ activeTab: initialTab = "All" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div style={{ padding: 24 }}>
      <QueueTable
        activeTab={activeTab}
        lockedTab={false}
        onTabChange={(t) => setActiveTab(t)}
        headers={headers}
      />
    </div>
  );
}

export default DGMRequest;
