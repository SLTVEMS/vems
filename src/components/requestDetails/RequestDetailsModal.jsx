import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Grid3x3OutlinedIcon from '@mui/icons-material/Grid3x3Outlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import { Box, Typography } from '@mui/material'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import DecisionBox from './DecisionBox'
import InfoCard from './InfoCard'
import StatusBadge from './StatusBadge'
import { muiIcon } from './iconUtils'

const BadgeIcon = muiIcon(BadgeOutlinedIcon)
const BusinessIcon = muiIcon(BusinessOutlinedIcon)
const CalendarIcon = muiIcon(CalendarTodayOutlinedIcon)
const EmailIcon = muiIcon(EmailOutlinedIcon)
const GridIcon = muiIcon(Grid3x3OutlinedIcon)
const GroupsIcon = muiIcon(GroupsOutlinedIcon)
const LocationIcon = muiIcon(LocationOnOutlinedIcon)
const PersonIcon = muiIcon(PersonOutlineOutlinedIcon)
const PhoneIcon = muiIcon(PhoneOutlinedIcon)
const ScheduleIcon = muiIcon(ScheduleOutlinedIcon)
const WorkIcon = muiIcon(WorkOutlineOutlinedIcon)

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
    background: #0f1e37;
    color: #0c1424;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
`

const requestRows = [
  { icon: GridIcon, label: 'Request ID', value: 'VE20260515-002' },
  { icon: CalendarIcon, label: 'Submitted On', value: 'May 14, 2026 · 09:42 AM' },
  { icon: CalendarIcon, label: 'Visit Date', value: 'May 18, 2026' },
  { icon: ScheduleIcon, label: 'Visit Time', value: '10:00 AM – 12:30 PM' },
  { icon: LocationIcon, label: 'Location', value: 'Tower B · Floor 14 · NOC' },
  { icon: PersonIcon, label: 'Host Employee', value: 'Ayesha Karunaratne' },
  { icon: BusinessIcon, label: 'Department', value: 'Network Operations' },
  {
    icon: BadgeIcon,
    label: 'Purpose',
    value: 'Quarterly infrastructure audit and compliance walkthrough',
  },
]

const visitorRows = [
  { icon: PersonIcon, label: 'Full Name', value: 'Daniel Fernando Perera' },
  { icon: BadgeIcon, label: 'NIC / Passport', value: '199245601827' },
  { icon: BusinessIcon, label: 'Company', value: 'Northbridge Audit Partners' },
  { icon: WorkIcon, label: 'Designation', value: 'Senior Compliance Auditor' },
  { icon: PhoneIcon, label: 'Contact Number', value: '+94 77 412 6890' },
  { icon: EmailIcon, label: 'Email Address', value: 'd.perera@northbridge.lk' },
  { icon: GridIcon, label: 'Vehicle Number', value: 'CBL-7842' },
  { icon: GroupsIcon, label: 'Visitor Type', value: 'External · Pre-cleared' },
]

const Overlay = styled(Box)`
  height: 100vh;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  background: rgba(15, 30, 55, 0.45);

  @media (max-width: 760px) {
    padding: 10px;
  }
`

const Modal = styled(Box)`
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
`

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
`

const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;

  @media (max-width: 760px) {
    gap: 10px;
    margin-bottom: 12px;
  }
`

const Title = styled(Typography)`
  && {
    color: #101827;
    font-size: 24px;
    font-weight: 850;
    line-height: 1.12;
    letter-spacing: 0;
  }

  @media (max-width: 760px) {
    && {
      font-size: 24px;
    }
  }
`

const Subtitle = styled(Typography)`
  && {
    margin-top: 4px;
    color: #607086;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.35;
  }
`

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
`

const CardGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 900px) {
    gap: 10px;
  }
`

const Footer = styled(Typography)`
  && {
    margin-top: 10px;
    color: #607086;
    font-size: 10px;
    font-weight: 500;
    text-align: center;
  }
`

function RequestDetailsModal({ onRejectClick }) {
  return (
    <>
      <GlobalStyle />
      <Overlay>
        <Modal role="dialog" aria-modal="true" aria-labelledby="request-details-title">
          <Content>
            <Header>
              <Box>
                <Title id="request-details-title">Request Details</Title>
                <Subtitle>Review the visit request and submit your recommendation.</Subtitle>
              </Box>
              <BadgeGroup>
                <StatusBadge tone="green" dot>
                  Pending Review
                </StatusBadge>
                <StatusBadge>Priority · Normal</StatusBadge>
              </BadgeGroup>
            </Header>

            <CardGrid>
              <InfoCard
                title="Request Information"
                subtitle="Visit and scheduling details"
                rows={requestRows}
              />
              <InfoCard
                title="Visitor Information"
                subtitle="Identity and contact details"
                rows={visitorRows}
              />
            </CardGrid>

            <DecisionBox onRejectClick={onRejectClick} />
            <Footer>© 2026 TeleConnect · Internal Visitor Management System</Footer>
          </Content>
        </Modal>
      </Overlay>
    </>
  )
}

export default RequestDetailsModal
