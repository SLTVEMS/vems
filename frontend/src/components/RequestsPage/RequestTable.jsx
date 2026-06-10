import styled from "styled-components";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Eye } from "lucide-react";

const TableCard = styled(Box)`
  background: #ffffff;
  border: 1px solid #d9e1ea;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
`;

const TableHeader = styled(Box)`
  height: 62px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #edf1f5;
`;

const CountBadge = styled.span`
  margin-left: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e9f0f7;
  color: #41546c;
  font-size: 11px;
  font-weight: 800;
`;

const ViewButton = styled(Button)`
  && {
    min-width: 72px;
    height: 26px;
    padding: 0 12px;
    border-radius: 999px;
    background: #092bdc;
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    gap: 5px;
    box-shadow: none;

    &:hover {
      background: #061b9d;
      box-shadow: none;
      transform: translateY(-1px);
    }
  }
`;

const RequestTable = ({ requests }) => {
  return (
    <TableCard>
      <TableHeader>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 800,
            color: "#071c3d",
          }}
        >
          All Requests <CountBadge>{requests.length}</CountBadge>
        </Typography>
      </TableHeader>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 1120 }}>
          <TableHead>
            <TableRow sx={{ background: "#f3f6f9" }}>
              {[
                "Visiting Date",
                "Entry Code",
                "Visitor's NIC",
                "Visitor's Name",
                "Visitor's Email",
                "Approved Supervisor's Name",
                "Contact No",
                "Status",
              ].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{
                    padding: "17px 24px",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.7px",
                    textTransform: "uppercase",
                    color: "#68778e",
                    borderBottom: "1px solid #e6ebf1",
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {requests.map((request, index) => (
              <TableRow
                key={index}
                sx={{
                  transition: "0.2s ease",
                  "&:hover": {
                    background: "#f8fbff",
                  },
                }}
              >
                <TableCell sx={cellStyle}>{request.date}</TableCell>
                <TableCell sx={cellStyle}>{request.code}</TableCell>
                <TableCell sx={cellStyle}>{request.nic}</TableCell>

                <TableCell
                  sx={{
                    ...cellStyle,
                    color: "#071c3d",
                    fontWeight: 800,
                  }}
                >
                  {request.name}
                </TableCell>

                <TableCell sx={cellStyle}>{request.email}</TableCell>
                <TableCell sx={cellStyle}>{request.supervisor}</TableCell>
                <TableCell sx={cellStyle}>{request.contact}</TableCell>

                <TableCell sx={cellStyle}>
                  <ViewButton>
                    View <Eye size={13} />
                  </ViewButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        sx={{
          padding: "18px 24px",
          fontSize: "11px",
          fontWeight: 500,
          color: "#69788d",
        }}
      >
        Showing {requests.length} of {requests.length} requests
      </Typography>
    </TableCard>
  );
};

const cellStyle = {
  padding: "16px 24px",
  fontSize: "12px",
  fontWeight: 500,
  color: "#536277",
  borderBottom: "1px solid #edf1f5",
};

export default RequestTable;