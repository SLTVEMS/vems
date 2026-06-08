import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";
import {
  headerData,
  statsData,
  chartData,
  notificationsData,
} from "./components/data/employeeDashboardData";

function App() {
  return (
    <EmployeeDashboard
      headerData={headerData}
      statsData={statsData}
      chartData={chartData}
      notificationsData={notificationsData}
    />
  );
}

export default App;