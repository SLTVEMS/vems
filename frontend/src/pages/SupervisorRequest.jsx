import QueueTable from "../components/QueueTable";
import { mockRequests, mockStats, statusConfig, priorityConfig } from "./supervisorRequest/mockData";
import styled from "styled-components";

const SupervisorContainer = styled.div`
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
   "STATUS",
   "ACTIONS",
];

function SupervisorRequest({ activeTab = "All" }) {
   return (
      <SupervisorContainer>
         <QueueTable
            key={activeTab}
            activeTab={activeTab}
            lockedTab={false}
            headers={headers}
            requests={mockRequests}
            statusConfig={statusConfig}
            priorityConfig={priorityConfig}
            coloredChips={true}
         />
      </SupervisorContainer>
   );
}

export default SupervisorRequest;