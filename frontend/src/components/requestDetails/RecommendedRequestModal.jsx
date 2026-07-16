import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

const NIGHT_WORK_GRADES = ["A.1", "A.2", "A.3"];

function isNightWorkGrade(gradeName) {
  if (!gradeName) return false;
  const normalized = gradeName.trim().replace(/\.$/, "");
  return NIGHT_WORK_GRADES.includes(normalized);
}

const Overlay = styled(Box)`
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 12px;
  background: rgba(15, 23, 42, 0.42);
`;

const Modal = styled(Box)`
  width: min(94vw, 940px);
  max-height: calc(100dvh - 24px);
  overflow: hidden;
  border: 1px solid #cfd9e7;
  border-radius: 8px;
  background: #f5f8fc;
  box-shadow: 0 18px 46px rgba(15, 23, 42, 0.14);
`;

const Header = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 68px;
  padding: 0 27px;
  border-bottom: 1px solid #dbe3ee;
  background: #ffffff;

  @media (max-width: 680px) {
    height: 58px;
    padding: 0 14px;
    gap: 10px;
  }
`;

const HeaderText = styled(Box)`
  min-width: 0;
`;

const Title = styled(Typography)`
  && {
    color: #0f172a;
    font-size: 17px;
    font-weight: 850;
    line-height: 1.15;
  }
`;

const Subtitle = styled(Typography)`
  && {
    margin-top: 7px;
    color: #64748b;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.2;
  }

  @media (max-width: 680px) {
    && {
      display: none;
    }
  }
`;

const HeaderActions = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
`;

const RequestIdBadge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  background: #eef3f8;
  color: #6b7d95;
  font-size: 9px;
  font-weight: 700;
`;

const CloseButton = styled(IconButton)`
  && {
    width: 28px;
    height: 28px;
    color: #475569;
  }

  && svg {
    width: 15px;
    height: 15px;
  }
`;

const Body = styled(Box)`
  max-height: min(622px, calc(100dvh - 92px));
  overflow: auto;
  padding: 44px 28px 28px;
  background: #f5f8fc;

  @media (max-width: 960px) {
    padding: 28px 22px 22px;
  }

  @media (max-width: 760px) {
    padding: 14px;
  }
`;

const CardGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const Card = styled(Box)`
  height: 100%;
  padding: 21px 20px 18px;
  border: 1px solid #dbe3ee;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 9px 20px rgba(15, 23, 42, 0.05);

  @media (max-width: 760px) {
    padding: 14px 14px 12px;
  }
`;

const CardTitle = styled(Typography)`
  && {
    margin-bottom: 12px;
    color: #163b70;
    font-size: 10.5px;
    font-weight: 900;
    letter-spacing: 0.02em;
    line-height: 1;
    text-transform: uppercase;
  }
`;

const Row = styled(Box)`
  display: grid;
  grid-template-columns: 15px minmax(96px, 1fr) minmax(118px, auto);
  align-items: center;
  gap: 8px;
  min-height: ${({ $comment }) => ($comment ? "52px" : "34px")};
  padding: ${({ $comment }) => ($comment ? "7px 0" : "0")};
  border-top: 1px solid #e6edf5;

  &:first-of-type {
    border-top: none;
  }

  @media (max-width: 680px) {
    grid-template-columns: 15px 1fr;
    min-height: ${({ $comment }) => ($comment ? "48px" : "30px")};
    gap: 5px 7px;
  }
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #65758b;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const Label = styled(Typography)`
  && {
    color: #64748b;
    font-size: 10.5px;
    font-weight: 700;
    line-height: 1.25;
  }
`;

const Value = styled(Typography)`
  && {
    display: flex;
    justify-content: flex-end;
    color: #071126;
    font-size: 10.5px;
    font-weight: 850;
    line-height: 1.3;
    text-align: right;
  }

  @media (max-width: 680px) {
    && {
      grid-column: 2;
      justify-content: flex-start;
      text-align: left;
    }
  }
`;

const CommentValue = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 680px) {
    grid-column: 2;
    justify-content: stretch;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  min-height: 18px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid
    ${({ $tone }) =>
      ({
        blue: "#b9dcff",
        dark: "#d1d5db",
        red: "#ff9a9f",
        yellow: "#ead08a",
      })[$tone] || "#e2e8f0"};
  background: ${({ $tone }) =>
    ({
      blue: "#dff0ff",
      dark: "#e5e7eb",
      red: "#ffe6e8",
      yellow: "#fff3cf",
    })[$tone] || "#f1f5f9"};
  color: ${({ $tone }) =>
    ({
      blue: "#1473d1",
      dark: "#111827",
      red: "#e60012",
      yellow: "#7a5207",
    })[$tone] || "#64748b"};
  font-size: 9px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
`;

const Dot = styled.span`
  width: 5px;
  height: 5px;
  margin-right: 5px;
  border-radius: 50%;
  background: ${({ $tone }) =>
    ({
      blue: "#1f8fff",
      dark: "#111827",
      red: "#ff2738",
      yellow: "#d69a0b",
    })[$tone] || "#1f8fff"};
`;

const CommentSurface = styled.div`
  width: 100%;
  padding: ${({ $compact }) => ($compact ? "8px 10px" : "13px 16px")};
  border: 1px solid #dbe8f7;
  border-radius: 7px;
  background: #eef5fd;
`;

const CommentText = styled(Typography)`
  && {
    color: #19304e;
    font-size: ${({ $compact }) => ($compact ? "10px" : "11px")};
    font-style: ${({ $italic }) => ($italic ? "italic" : "normal")};
    font-weight: 500;
    line-height: 1.45;
  }
`;

const CommentsCard = styled(Box)`
  margin-top: 20px;
  padding: 21px 20px 20px;
  border: 1px solid #dbe3ee;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 9px 20px rgba(15, 23, 42, 0.05);

  @media (max-width: 760px) {
    margin-top: 10px;
    padding: 14px;
  }
`;

const iconMap = {
  clock: AccessTimeOutlinedIcon,
  department: ApartmentOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  check: CheckCircleOutlineOutlinedIcon,
  maintenance: EngineeringOutlinedIcon,
  purpose: EventNoteOutlinedIcon,
  location: LocationOnOutlinedIcon,
  person: PersonOutlineOutlinedIcon,
  pending: RadioButtonUncheckedOutlinedIcon,
  requestType: WorkOutlineOutlinedIcon,
};

function formatValue(value, fallback = "Not available") {
  return value || fallback;
}

function StatusBadge({ children, tone = "blue", dot = false }) {
  return (
    <Badge $tone={tone}>
      {dot ? <Dot $tone={tone} /> : null}
      {children}
    </Badge>
  );
}

function CommentBox({ children, compact = false, italic = false }) {
  return (
    <CommentSurface $compact={compact}>
      <CommentText $compact={compact} $italic={italic}>
        {children}
      </CommentText>
    </CommentSurface>
  );
}

function buildRows(request, variant) {
  const isRejected = variant === "rejected";
  const decisionLabel = isRejected ? "Rejected" : "Recommended";
  const decisionTone = isRejected ? "red" : "blue";
  const currentStatusTone = isRejected ? "red" : "yellow";
  const currentStatusLabel = isRejected ? "Rejected" : "Pending";
  const dutyOfficerTone = isRejected ? "dark" : "yellow";
  const dutyOfficerLabel = isRejected ? "Not Applicable" : "Pending";

  const requestRows = [
    { icon: "person", label: "Employee Name", value: formatValue(request.submittedBy) },
    { icon: "maintenance", label: "Employee Service No:", value: formatValue(request.serviceNo) },
    { icon: "person", label: "Visitor / Requestor", value: formatValue(request.visitor) },
    { icon: "requestType", label: "Request Type", badge: <StatusBadge tone="blue">{request.requestType || "Maintenance"}</StatusBadge> },
    { icon: "department", label: "Department", value: formatValue(request.role) },
    { icon: "purpose", label: "Purpose", value: formatValue(request.purpose) },
    { icon: "calendar", label: "Requested Date", value: formatValue(request.date) },
    { icon: "clock", label: "Requested Time", value: formatValue(request.visitTime) },
    { icon: "location", label: "Location / Site", value: formatValue(request.address) },
  ];

  const approvalRows = [
    { icon: "person", label: "Recommended By", value: formatValue(request.recommendedBy || request.submittedBy) },
    { icon: "calendar", label: "Recommendation Date", value: formatValue(request.recommendedDate || request.date) },
    {
      icon: "check",
      label: "Supervisor Recommendation",
      badge: (
        <StatusBadge tone={decisionTone} dot>
          {decisionLabel}
        </StatusBadge>
      ),
    },
    {
      icon: "purpose",
      label: "Supervisor Comment",
      comment: (
        <CommentBox compact italic>
          {request.supervisorComment || "This request is valid and requires further approval."}
        </CommentBox>
      ),
    },
    {
      icon: "pending",
      label: "Current Status",
      badge: (
        <StatusBadge tone={currentStatusTone} dot>
          {currentStatusLabel}
        </StatusBadge>
      ),
    },
    {
      icon: "check",
      label: "Duty Officer Status",
      badge: (
        <StatusBadge tone={dutyOfficerTone} dot>
          {dutyOfficerLabel}
        </StatusBadge>
      ),
    },
  ];

  if (isNightWorkGrade(request.gradeName)) {
    approvalRows.push({
      icon: "clock",
      label: "Night Shift Required",
      badge: <StatusBadge tone="blue">Yes</StatusBadge>,
    });
  }

  return { requestRows, approvalRows };
}

function InfoRow({ icon, label, value, badge, comment }) {
  const Icon = iconMap[icon];

  return (
    <Row $comment={Boolean(comment)}>
      <IconWrap>{Icon ? <Icon fontSize="inherit" /> : null}</IconWrap>
      <Label>{label}</Label>
      {comment ? <CommentValue>{comment}</CommentValue> : <Value>{badge || value}</Value>}
    </Row>
  );
}

function InfoCard({ title, rows }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      {rows.map((row) => (
        <InfoRow key={row.label} {...row} />
      ))}
    </Card>
  );
}

function RecommendedRequestModal({ open, request, onClose, variant = "recommended" }) {
  const isRejected = variant === "rejected";
  const rows = useMemo(() => buildRows(request || {}, variant), [request, variant]);

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
        aria-labelledby="recommended-request-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <Header>
          <HeaderText>
            <Title id="recommended-request-title">Request Details</Title>
            <Subtitle>
              View complete information about the selected {isRejected ? "rejected" : "recommended"} request
            </Subtitle>
          </HeaderText>
          <HeaderActions>
            <RequestIdBadge>{request.id}</RequestIdBadge>
            <StatusBadge tone={isRejected ? "red" : "blue"} dot>
              {isRejected ? "Rejected" : "Recommended"}
            </StatusBadge>
            <CloseButton aria-label="Close request details" onClick={onClose}>
              <CloseRoundedIcon />
            </CloseButton>
          </HeaderActions>
        </Header>

        <Body>
          <CardGrid>
            <InfoCard title="Request Information" rows={rows.requestRows} />
            <InfoCard title="Approval & Recommendation" rows={rows.approvalRows} />
          </CardGrid>

          <CommentsCard>
            <CardTitle>Request Description / Comments</CardTitle>
            <CommentBox>
              {request.description ||
                `This request was submitted to perform scheduled maintenance on network equipment. Supervisor has ${
                  isRejected ? "rejected the request." : "recommended the request for further approval."
                }`}
            </CommentBox>
          </CommentsCard>
        </Body>
      </Modal>
    </Overlay>
  );
}

export default RecommendedRequestModal;
