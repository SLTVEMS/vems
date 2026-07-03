import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import { Box, IconButton, Typography } from '@mui/material'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import CommentBox from './CommentBox'
import InfoCard from './InfoCard'
import StatusBadge from './StatusBadge'

function muiIcon(iconModule) {
  return iconModule?.default?.default || iconModule?.default || iconModule
}

const ClockIcon = muiIcon(AccessTimeOutlinedIcon)
const DepartmentIcon = muiIcon(ApartmentOutlinedIcon)
const CalendarIcon = muiIcon(CalendarTodayOutlinedIcon)
const CheckIcon = muiIcon(CheckCircleOutlineOutlinedIcon)
const CloseIcon = muiIcon(CloseRoundedIcon)
const MaintenanceIcon = muiIcon(EngineeringOutlinedIcon)
const PurposeIcon = muiIcon(EventNoteOutlinedIcon)
const LocationIcon = muiIcon(LocationOnOutlinedIcon)
const PersonIcon = muiIcon(PersonOutlineOutlinedIcon)
const PendingIcon = muiIcon(RadioButtonUncheckedOutlinedIcon)
const RequestTypeIcon = muiIcon(WorkOutlineOutlinedIcon)

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #d7e4f5;
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
`

const requestRows = [
  { icon: PersonIcon, label: 'Employee Name', value: 'Nimal Silva' },
  { icon: MaintenanceIcon, label: 'Employee Service No:', value: '011931' },
  { icon: PersonIcon, label: 'Visitor / Requestor', value: 'Nimal Silva' },
  {
    icon: RequestTypeIcon,
    label: 'Request Type',
    badge: <StatusBadge tone="blue">Maintenance</StatusBadge>,
  },
  { icon: DepartmentIcon, label: 'Department', value: 'Network' },
  { icon: PurposeIcon, label: 'Purpose', value: 'Routine maintenance' },
  { icon: CalendarIcon, label: 'Requested Date', value: 'May 15, 2025' },
  { icon: ClockIcon, label: 'Requested Time', value: '10:30 AM' },
  { icon: LocationIcon, label: 'Location / Site', value: 'Data Center Room A' },
]

const approvalRows = [
  { icon: PersonIcon, label: 'Recommended By', value: 'Dilani Karunaratne' },
  { icon: CalendarIcon, label: 'Recommendation Date', value: 'May 15, 2025' },
  {
    icon: CheckIcon,
    label: 'Supervisor Recommendation',
    badge: (
      <StatusBadge tone="blue" dot>
        Recommended
      </StatusBadge>
    ),
  },
  {
    icon: PurposeIcon,
    label: 'Supervisor Comment',
    comment: (
      <CommentBox compact italic>
        “This request is valid and requires further approval.”
      </CommentBox>
    ),
  },
  {
    icon: PendingIcon,
    label: 'Current Status',
    badge: (
      <StatusBadge tone="yellow" dot>
        Pending
      </StatusBadge>
    ),
  },
  {
    icon: CheckIcon,
    label: 'Duty Officer Status',
    badge: (
      <StatusBadge tone="yellow" dot>
        Pending
      </StatusBadge>
    ),
  },
  { icon: ClockIcon, label: 'Night Shift Required', badge: <StatusBadge>No</StatusBadge> },
]

const Page = styled(Box)`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 12px;
  background: #d7e4f5;
`

const Modal = styled(Box)`
  width: min(94vw, 940px);
  max-height: calc(100dvh - 24px);
  overflow: hidden;
  border: 1px solid #cfd9e7;
  border-radius: 8px;
  background: #f5f8fc;
  box-shadow: 0 18px 46px rgba(15, 23, 42, 0.14);
`

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
`

const HeaderText = styled(Box)`
  min-width: 0;
`

const Title = styled(Typography)`
  && {
    color: #0f172a;
    font-size: 17px;
    font-weight: 850;
    line-height: 1.15;
  }
`

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
`

const HeaderActions = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
`

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
`

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
`

const Body = styled(Box)`
  height: calc(100dvh - 24px - 68px);
  max-height: 622px;
  overflow: hidden;
  padding: 44px 28px 28px;
  background: #f5f8fc;

  @media (max-width: 960px) {
    padding: 28px 22px 22px;
  }

  @media (max-width: 760px) {
    height: calc(100dvh - 24px - 58px);
    padding: 14px;
  }
`

const CardGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`

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
`

const CardTitle = styled(Typography)`
  && {
    margin-bottom: 13px;
    color: #163b70;
    font-size: 10.5px;
    font-weight: 900;
    letter-spacing: 0.02em;
    line-height: 1;
    text-transform: uppercase;
  }
`

function RecommendedRequestModal() {
  return (
    <>
      <GlobalStyle />
      <Page>
        <Modal role="dialog" aria-modal="true" aria-labelledby="recommended-request-title">
          <Header>
            <HeaderText>
              <Title id="recommended-request-title">Request Details</Title>
              <Subtitle>View complete information about the selected recommended request</Subtitle>
            </HeaderText>
            <HeaderActions>
              <RequestIdBadge>VE20260522-003</RequestIdBadge>
              <StatusBadge tone="blue" dot>
                Recommended
              </StatusBadge>
              <CloseButton aria-label="Close request details">
                <CloseIcon />
              </CloseButton>
            </HeaderActions>
          </Header>

          <Body>
            <CardGrid>
              <InfoCard title="Request Information" rows={requestRows} />
              <InfoCard title="Approval & Recommendation" rows={approvalRows} />
            </CardGrid>

            <CommentsCard>
              <CardTitle>Request Description / Comments</CardTitle>
              <CommentBox>
                This request was submitted to perform scheduled maintenance on network equipment in
                the data center. Supervisor has recommended the request for further approval.
              </CommentBox>
            </CommentsCard>
          </Body>
        </Modal>
      </Page>
    </>
  )
}

export default RecommendedRequestModal
