import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

const Overlay = styled(Box)`
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  background: rgba(15, 30, 55, 0.45);

  @media (max-width: 760px) {
    padding: 10px;
  }
`;

const Modal = styled(Box)`
  position: relative;
  width: min(90vw, 1200px);
  max-height: calc(100dvh - 32px);
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  border-radius: 36px;
  background: #dfeaff;
  box-shadow: 0 28px 80px rgba(10, 24, 45, 0.26);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #dfeaff;
    border-radius: 999px;
    background: rgba(90, 111, 143, 0.45);
  }

  @media (max-width: 760px) {
    width: 100%;
    border-radius: 28px;
  }
`;

const CloseButton = styled(IconButton)`
  && {
    position: absolute;
    top: 18px;
    right: 18px;
    z-index: 1;
    width: 34px;
    height: 34px;
    background: rgba(255, 255, 255, 0.82);
    color: #526780;
  }

  &&:hover {
    background: #ffffff;
    color: #101827;
  }

  && svg {
    width: 20px;
    height: 20px;
  }
`;

const Content = styled(Box)`
  width: min(100%, 1048px);
  margin: 0 auto;
  padding: 24px 0 12px;

  @media (max-width: 1180px) {
    padding: 22px 26px 12px;
  }

  @media (max-width: 760px) {
    padding: 16px 14px 10px;
  }
`;

const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
  padding-right: 54px;

  @media (max-width: 760px) {
    gap: 10px;
    margin-bottom: 12px;
  }
`;

const Title = styled(Typography)`
  && {
    color: #101827;
    font-size: 24px;
    font-weight: 850;
    line-height: 1.12;
    letter-spacing: 0;
  }
`;

const Subtitle = styled(Typography)`
  && {
    margin-top: 4px;
    color: #607086;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.35;
  }
`;

const BadgeGroup = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 9px;
  padding-top: 12px;

  @media (max-width: 760px) {
    justify-content: flex-start;
    padding-top: 0;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 13px;
  border: 1px solid #9bd8bd;
  border-radius: 999px;
  background: #c6f0dc;
  color: #057139;
  font-size: 10px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 8px 18px rgba(57, 84, 120, 0.08);

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    margin-right: 7px;
    border-radius: 50%;
    background: #00a651;
  }
`;

const CardGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const Card = styled(Box)`
  overflow: hidden;
  border: 1px solid rgba(207, 217, 231, 0.92);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 13px 28px rgba(47, 76, 112, 0.08);
`;

const CardHeader = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 18px 12px;

  @media (max-width: 760px) {
    padding: 10px 14px 9px;
  }
`;

const CardTitle = styled(Typography)`
  && {
    color: #0c1424;
    font-size: 12px;
    font-weight: 800;
    line-height: 1.15;
  }
`;

const CardSubtitle = styled(Typography)`
  && {
    margin-top: 3px;
    color: #697386;
    font-size: 10px;
    font-weight: 500;
    line-height: 1.3;
  }
`;

const HeaderIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #eef9f5;
  color: #00a651;

  svg {
    width: 13px;
    height: 13px;
  }
`;

const Row = styled(Box)`
  display: grid;
  grid-template-columns: 18px minmax(110px, 0.52fr) minmax(0, 1fr);
  align-items: center;
  min-height: 34px;
  gap: 8px;
  padding: 0 18px;
  border-top: 1px solid #e8edf5;

  @media (max-width: 640px) {
    grid-template-columns: 18px 1fr;
    row-gap: 2px;
    min-height: 30px;
    padding: 5px 14px;
  }
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6b788a;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const Label = styled(Typography)`
  && {
    color: #697386;
    font-size: 10px;
    font-weight: 600;
    line-height: 1.25;
  }
`;

const Value = styled(Typography)`
  && {
    color: #0d1726;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  @media (max-width: 640px) {
    && {
      grid-column: 2;
    }
  }
`;

const DecisionPanel = styled(Box)`
  overflow: hidden;
  border: 1px solid rgba(207, 217, 231, 0.95);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 13px 28px rgba(47, 76, 112, 0.08);
`;

const DecisionHeader = styled(Box)`
  padding: 16px 20px 14px;
  border-bottom: 1px solid #e8edf5;
`;

const DecisionBody = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 88px;
  padding: 18px 20px;

  @media (max-width: 640px) {
    min-height: 76px;
  }
`;

const Actions = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (max-width: 640px) {
    width: 100%;
    max-width: 280px;

    button {
      flex: 1;
    }
  }
`;

const ActionButton = styled(Button)`
  && {
    min-width: 80px;
    height: 30px;
    padding: 0 18px;
    border-radius: 999px;
    color: #ffffff;
    background: ${({ $variant }) => ($variant === "reject" ? "#ef233c" : "#00a651")};
    box-shadow: 0 10px 18px
      ${({ $variant }) => ($variant === "reject" ? "rgba(239, 35, 60, 0.24)" : "rgba(0, 166, 81, 0.24)")};
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
    text-transform: none;
  }

  &&:hover {
    background: ${({ $variant }) => ($variant === "reject" ? "#d91f36" : "#009349")};
  }

  && .MuiButton-startIcon {
    margin-left: -3px;
    margin-right: 7px;
  }

  && svg {
    width: 14px;
    height: 14px;
  }
`;

const Footer = styled(Typography)`
  && {
    margin-top: 10px;
    color: #607086;
    font-size: 10px;
    font-weight: 500;
    text-align: center;
  }
`;

const iconMap = {
  badge: BadgeOutlinedIcon,
  business: BusinessOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  check: CheckCircleOutlinedIcon,
  email: EmailOutlinedIcon,
  grid: Grid3x3OutlinedIcon,
  groups: GroupsOutlinedIcon,
  location: LocationOnOutlinedIcon,
  person: PersonOutlineOutlinedIcon,
  phone: PhoneOutlinedIcon,
  schedule: ScheduleOutlinedIcon,
  work: WorkOutlineOutlinedIcon,
};

function formatValue(value, fallback = "Not available") {
  return value || fallback;
}

function buildRows(request) {
  return {
    requestRows: [
      { icon: "grid", label: "Request ID", value: formatValue(request.id) },
      { icon: "calendar", label: "Submitted On", value: formatValue(request.date) },
      { icon: "calendar", label: "Visit Date", value: formatValue(request.visitDate || request.date) },
      { icon: "schedule", label: "Visit Time", value: formatValue(request.visitTime) },
      { icon: "location", label: "Location", value: formatValue(request.address) },
      { icon: "person", label: "Host Employee", value: formatValue(request.submittedBy) },
      { icon: "business", label: "Department", value: formatValue(request.role) },
      { icon: "badge", label: "Purpose", value: formatValue(request.purpose) },
    ],
    visitorRows: [
      { icon: "person", label: "Full Name", value: formatValue(request.visitor) },
      { icon: "badge", label: "NIC / Passport", value: formatValue(request.visitorNIC) },
      { icon: "business", label: "Company", value: formatValue(request.company) },
      { icon: "work", label: "Designation", value: formatValue(request.designation) },
      { icon: "phone", label: "Contact Number", value: formatValue(request.contactNo) },
      { icon: "email", label: "Email Address", value: formatValue(request.visitorEmail) },
      { icon: "grid", label: "Vehicle Number", value: formatValue(request.vehicleNumber) },
      { icon: "groups", label: "Visitor Type", value: formatValue(request.visitorType) },
    ],
  };
}

function InfoRow({ icon, label, value }) {
  const Icon = iconMap[icon];

  return (
    <Row>
      <IconWrap>{Icon ? <Icon fontSize="inherit" /> : null}</IconWrap>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Row>
  );
}

function InfoCard({ title, subtitle, rows }) {
  return (
    <Card>
      <CardHeader>
        <Box>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
        </Box>
        <HeaderIcon>
          <CheckCircleOutlinedIcon fontSize="inherit" />
        </HeaderIcon>
      </CardHeader>
      {rows.map((row) => (
        <InfoRow key={row.label} {...row} />
      ))}
    </Card>
  );
}

function RequestDetailsModal({ open, request, onClose, onReject, onRecommend }) {
  const rows = useMemo(() => buildRows(request || {}), [request]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open || !request) {
    return null;
  }

  return (
    <Overlay role="presentation" onMouseDown={onClose}>
      <Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-details-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <CloseButton aria-label="Close request details" onClick={onClose}>
          <CloseRoundedIcon />
        </CloseButton>

        <Content>
          <Header>
            <Box>
              <Title id="request-details-title">Request Details</Title>
              <Subtitle>Review the visit request and submit your recommendation.</Subtitle>
            </Box>
            <BadgeGroup>
              <Badge>{request.status || "Pending Review"}</Badge>
            </BadgeGroup>
          </Header>

          <CardGrid>
            <InfoCard
              title="Request Information"
              subtitle="Visit and scheduling details"
              rows={rows.requestRows}
            />
            <InfoCard
              title="Visitor Information"
              subtitle="Identity and contact details"
              rows={rows.visitorRows}
            />
          </CardGrid>

          <DecisionPanel>
            <DecisionHeader>
              <CardTitle>Your Decision</CardTitle>
              <CardSubtitle>Add remarks for the security desk and submit your recommendation.</CardSubtitle>
            </DecisionHeader>
            <DecisionBody>
              <Actions>
                <ActionButton $variant="reject" variant="contained" disableElevation onClick={onReject}>
                  Reject
                </ActionButton>
                <ActionButton
                  $variant="recommend"
                  variant="contained"
                  disableElevation
                  startIcon={<CheckCircleOutlinedIcon />}
                  onClick={onRecommend}
                >
                  Recommend
                </ActionButton>
              </Actions>
            </DecisionBody>
          </DecisionPanel>

          <Footer>© 2026 TeleConnect · Internal Visitor Management System</Footer>
        </Content>
      </Modal>
    </Overlay>
  );
}

export default RequestDetailsModal;
