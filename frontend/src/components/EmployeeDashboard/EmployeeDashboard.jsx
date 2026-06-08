import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import VisitorFlowChart from "./VisitorFlowChart";
import NotificationPanel from "./NotificationPanel";
import { COLORS } from "../theme/colors";

const Page = styled.div`
  min-height: 100vh;
  padding: 18px 20px;
  background: ${({ bg }) => bg};
`;

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(310px, 1fr);
  gap: 20px;
  margin-top: 26px;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

function EmployeeDashboard({ headerData, statsData, chartData, notificationsData }) {
  return (
    <Page bg={COLORS.pageBg}>
      <DashboardHeader data={headerData} />

      <StatsCards cards={statsData} />

      <BottomGrid>
        <VisitorFlowChart data={chartData} />
        <NotificationPanel notifications={notificationsData} />
      </BottomGrid>
    </Page>
  );
}

export default EmployeeDashboard;