import QueueTable from "../components/QueueTable";
import {
  mockRequests,
  mockStats,
  statusConfig,
  priorityConfig,
  isNightWorkGrade,
} from "./dgmRequest/mockData";
import styled from "styled-components";

const DGMContainer = styled.div`
   padding: 24px;
   height: 100%;
   overflow-y: auto;
   box-sizing: border-box;
`;

const headers = [
   "ENTRY CODE",
   "SUBMITTED BY",
   "VISITOR",
   "DATE",
   "COMPANY / ADDRESS",
   "PURPOSE",
   "NIGHT WORK",
   "STATUS",
   "ACTIONS",
];

const dgmTabsConfig = {
  All:      { label: "Requests Queue",  filterStatus: null },
  Pending:  { label: "Pending Queue",   filterStatus: "Pending" },
  Approved: { label: "Approved Queue",  filterStatus: "Approved" },
  Rejected: { label: "Rejected Queue",  filterStatus: "Rejected" },
};

const requestsWithNightWork = mockRequests.map((r) => ({
   ...r,
   nightWork: isNightWorkGrade(r.gradeName),
}));

function DGMRequest({ activeTab = "All" }) {
   return (
      <DGMContainer>
         <QueueTable
            key={activeTab}
            activeTab={activeTab}
            lockedTab={false}
            headers={headers}
            requests={requestsWithNightWork}
            statusConfig={statusConfig}
            priorityConfig={priorityConfig}
            coloredChips={true}
            tabsConfig={dgmTabsConfig}
         />
      </DGMContainer>
   );
}

export default DGMRequest;