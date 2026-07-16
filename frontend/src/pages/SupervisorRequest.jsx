import QueueTable from "../components/QueueTable";
import RecommendedRequestModal from "../components/requestDetails/RecommendedRequestModal";
import RejectConfirmationModal from "../components/requestDetails/RejectConfirmationModal";
import RequestDetailsModal from "../components/requestDetails/RequestDetailsModal";
import { mockRequests, statusConfig, priorityConfig } from "./supervisorRequest/mockData";
import { useState } from "react";
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
   const [selectedRequest, setSelectedRequest] = useState(null);
   const [selectedRequestTab, setSelectedRequestTab] = useState(activeTab);
   const [rejectModalOpen, setRejectModalOpen] = useState(false);

   const handleViewRequest = (request, tabKey) => {
      setSelectedRequestTab(tabKey);
      setSelectedRequest(request);
   };

   const handleCloseDetails = () => {
      setRejectModalOpen(false);
      setSelectedRequest(null);
   };

   const handleConfirmReject = () => {
      setRejectModalOpen(false);
      setSelectedRequest(null);
   };

   const isRecommendedDetailsOpen =
      Boolean(selectedRequest) && selectedRequestTab === "Recommended";
   const isRejectedDetailsOpen = Boolean(selectedRequest) && selectedRequestTab === "Rejected";
   const isRequestDetailsOpen =
      Boolean(selectedRequest) && !["Recommended", "Rejected"].includes(selectedRequestTab);

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
            onView={handleViewRequest}
         />
         <RequestDetailsModal
            open={isRequestDetailsOpen}
            request={selectedRequest}
            onClose={handleCloseDetails}
            onReject={() => setRejectModalOpen(true)}
            onRecommend={() => setSelectedRequest(null)}
         />
         <RecommendedRequestModal
            open={isRecommendedDetailsOpen}
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
         />
         <RecommendedRequestModal
            open={isRejectedDetailsOpen}
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
            variant="rejected"
         />
         <RejectConfirmationModal
            open={rejectModalOpen}
            request={selectedRequest}
            onClose={() => setRejectModalOpen(false)}
            onConfirm={handleConfirmReject}
         />
      </SupervisorContainer>
   );
}

export default SupervisorRequest;
