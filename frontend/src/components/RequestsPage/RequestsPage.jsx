import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import { Plus, ChevronDown } from "lucide-react";
import RequestStats from "./RequestStats";
import RequestTable from "./RequestTable";

const stats = [
  { title: "Approved Today", value: "24", color: "green" },
  { title: "This Week", value: "138", color: "dark" },
  { title: "Pending", value: "9", color: "orange" },
  { title: "Rejected", value: "3", color: "red" },
];

const requests = [
  {
    date: "2025-05-12",
    code: "VE20250512-001",
    nic: "982731456V",
    name: "Nimal Perera",
    email: "nimal.perera@gmail.com",
    supervisor: "K. Jayasinghe",
    contact: "+94 77 234 5678",
  },
  {
    date: "2025-05-11",
    code: "VE20250511-001",
    nic: "956721089V",
    name: "Anusha Silva",
    email: "anusha.s@yahoo.com",
    supervisor: "M. Fernando",
    contact: "+94 71 558 9920",
  },
  {
    date: "2025-05-10",
    code: "VE20250510-001",
    nic: "200145678123",
    name: "Ravindu Bandara",
    email: "ravindu.b@outlook.com",
    supervisor: "S. De Silva",
    contact: "+94 76 112 3389",
  },
  {
    date: "2025-05-09",
    code: "VE20250509-001",
    nic: "912034567V",
    name: "Hashini Wijesekara",
    email: "hashini.w@gmail.com",
    supervisor: "K. Jayasinghe",
    contact: "+94 70 884 1122",
  },
  {
    date: "2025-05-09",
    code: "VE20250509-002",
    nic: "873456120V",
    name: "Tharindu Jayasuriya",
    email: "tharindu.j@gmail.com",
    supervisor: "P. Rathnayake",
    contact: "+94 77 446 7781",
  },
  {
    date: "2025-05-08",
    code: "VE20250508-001",
    nic: "199934512987",
    name: "Sachini Karunaratne",
    email: "sachini.k@hotmail.com",
    supervisor: "M. Fernando",
    contact: "+94 71 909 4413",
  },
  {
    date: "2025-05-07",
    code: "VE20250507-001",
    nic: "902145673V",
    name: "Dineth Gunawardena",
    email: "dineth.g@gmail.com",
    supervisor: "S. De Silva",
    contact: "+94 76 220 5567",
  },
  {
    date: "2025-05-06",
    code: "VE20250506-001",
    nic: "885421309V",
    name: "Ishara Madushani",
    email: "ishara.m@gmail.com",
    supervisor: "P. Rathnayake",
    contact: "+94 70 339 2284",
  },
];

const Page = styled(Box)`
  min-height: 100vh;
  padding: 22px 20px 34px;
  background: #f4f7fb;
  font-family: "Inter", sans-serif;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 34px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const HeaderActions = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }

  @media (max-width: 520px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

const DarkButton = styled(Button)`
  && {
    height: 38px;
    padding: 0 18px;
    border-radius: 999px;
    background: #061b42;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    text-transform: none;
    gap: 7px;
    box-shadow: 0 8px 18px rgba(6, 27, 66, 0.12);
    white-space: nowrap;

    &:hover {
      background: #061b42;
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(6, 27, 66, 0.22);
    }

    @media (max-width: 520px) {
      width: 100%;
    }
  }
`;

const RequestsPage = () => {
  return (
    <Page>
      <Header>
        <Box>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#7b8aa2",
              marginBottom: "4px",
            }}
          >
            Visitor Management
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: "32px",
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-0.8px",
              color: "#071c3d",
            }}
          >
            Requests
          </Typography>

          <Typography
            sx={{
              marginTop: "12px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#7c8aa0",
            }}
          >
            All visitor entry requests approved by supervisors and security.
          </Typography>
        </Box>

        <HeaderActions>
          <DarkButton>
            All Requests <ChevronDown size={14} />
          </DarkButton>

          <DarkButton>
            Last 30 days <ChevronDown size={14} />
          </DarkButton>

          <DarkButton>
            <Plus size={16} />
            New Request
          </DarkButton>
        </HeaderActions>
      </Header>

      <RequestStats stats={stats} />

      <RequestTable requests={requests} />
    </Page>
  );
};

export default RequestsPage;