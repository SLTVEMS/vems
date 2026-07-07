import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Grid3x3OutlinedIcon from '@mui/icons-material/Grid3x3Outlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { Box, Button, IconButton, Typography } from '@mui/material'
import styled from 'styled-components'
import { muiIcon } from './iconUtils.js'
import SummaryRow from './SummaryRow'

const CalendarIcon = muiIcon(CalendarTodayOutlinedIcon)
const CloseIcon = muiIcon(CloseRoundedIcon)
const GridIcon = muiIcon(Grid3x3OutlinedIcon)
const InfoIcon = muiIcon(InfoOutlinedIcon)
const LocationIcon = muiIcon(LocationOnOutlinedIcon)
const PersonIcon = muiIcon(PersonOutlineOutlinedIcon)
const ScheduleIcon = muiIcon(ScheduleOutlinedIcon)
const WarningIcon = muiIcon(WarningAmberRoundedIcon)

// Compact summary repeated inside the final rejection confirmation step.
const SUMMARY_ROWS = [
  { icon: GridIcon, label: 'Request ID', value: 'VE20260515-002' },
  { icon: PersonIcon, label: 'Visitor Name', value: 'Daniel Fernando Perera' },
  { icon: CalendarIcon, label: 'Visit Date', value: 'May 18, 2026' },
  { icon: ScheduleIcon, label: 'Visit Time', value: '10:00 AM – 12:30 PM' },
  { icon: LocationIcon, label: 'Location', value: 'Tower B – Floor 14 – NOC' },
  { icon: PersonIcon, label: 'Host Employee', value: 'Ayesha Karunaratne' },
]

// Fixed overlay blocks the page while the final reject confirmation is open.
const Overlay = styled(Box)`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  background: rgba(15, 23, 42, 0.54);

  @media (max-width: 680px) {
    padding: 10px;
  }
`

const Modal = styled(Box)`
  position: relative;
  width: min(92vw, 640px);
  max-height: calc(100dvh - 32px);
  overflow: hidden;
  border: 1px solid rgba(219, 228, 240, 0.9);
  border-radius: 21px;
  background: #ffffff;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.26);
`

const CloseButton = styled(IconButton)`
  && {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    color: #526780;
  }

  && svg {
    width: 21px;
    height: 21px;
  }
`

const Body = styled(Box)`
  padding: 26px 29px 18px;

  @media (max-width: 560px) {
    padding: 18px 16px 14px;
  }
`

const IconHalo = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  margin: 0 auto 14px;
  border-radius: 999px;
  background: #ffe5e6;
  color: #ff4b50;

  svg {
    width: 25px;
    height: 25px;
  }
`

const Title = styled(Typography)`
  && {
    color: #0f172a;
    font-size: 21px;
    font-weight: 850;
    line-height: 1.18;
    text-align: center;
  }
`

const Subtitle = styled(Typography)`
  && {
    max-width: 470px;
    margin: 8px auto 14px;
    color: #64748b;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
  }
`

// Read-only summary lets the reviewer confirm they are rejecting the right request.
const SummaryCard = styled(Box)`
  overflow: hidden;
  border: 1px solid #dbe4f0;
  border-radius: 13px;
  background: #f6f9fc;
`

const SummaryHeader = styled(Typography)`
  && {
    padding: 14px 18px 9px;
    color: #607491;
    font-size: 10px;
    font-weight: 850;
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }
`

// High-emphasis warning separates irreversible action copy from neutral details.
const WarningBox = styled(Box)`
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 9px;
  margin-top: 12px;
  padding: 13px 15px 12px;
  border: 1px solid #ffb4b4;
  border-radius: 12px;
  background: #fff1f1;
  color: #ff3f46;
`

const WarningIconWrap = styled.span`
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 1px;

  svg {
    width: 18px;
    height: 18px;
  }
`

const WarningTitle = styled(Typography)`
  && {
    color: #ff3f46;
    font-size: 12px;
    font-weight: 850;
    line-height: 1.35;
  }
`

const WarningText = styled(Typography)`
  && {
    margin-top: 3px;
    color: #ff575d;
    font-size: 11.5px;
    font-weight: 500;
    line-height: 1.35;
  }
`

const Note = styled(Box)`
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 7px;
  margin-top: 12px;
  color: #64748b;
`

const NoteIcon = styled.span`
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 2px;

  svg {
    width: 14px;
    height: 14px;
  }
`

const NoteText = styled(Typography)`
  && {
    color: #64748b;
    font-size: 10.5px;
    font-weight: 500;
    line-height: 1.4;
  }
`

// Action row keeps cancel and confirm controls grouped at the bottom.
const Footer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 29px;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 560px) {
    padding: 12px 16px;
    flex-direction: column-reverse;
  }
`

const CancelButton = styled(Button)`
  && {
    min-width: 90px;
    height: 38px;
    padding: 0 22px;
    border: 1px solid #dbe4f0;
    border-radius: 13px;
    background: #ffffff;
    color: #0f172a;
    font-size: 11px;
    font-weight: 800;
    text-transform: none;
    box-shadow: none;
  }

  &&:hover {
    border-color: #c7d3e2;
    background: #f8fafc;
  }
`

const RejectButton = styled(Button)`
  && {
    min-width: 164px;
    height: 38px;
    padding: 0 24px;
    border-radius: 13px;
    background: #ff3f46;
    color: #ffffff;
    font-size: 11px;
    font-weight: 850;
    text-transform: none;
    box-shadow: 0 10px 20px rgba(255, 63, 70, 0.24);
  }

  &&:hover {
    background: #f0373e;
    box-shadow: 0 12px 22px rgba(255, 63, 70, 0.3);
  }
`

// Final confirmation dialog shown before a reject decision is submitted.
function RejectConfirmationModal({ open, onClose, onConfirm }) {
  if (!open) {
    return null
  }

  return (
    <Overlay role="presentation">
      <Modal role="dialog" aria-modal="true" aria-labelledby="reject-confirm-title">
        <CloseButton aria-label="Close reject confirmation" onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        <Body>
          <IconHalo>
            <WarningIcon />
          </IconHalo>
          <Title id="reject-confirm-title">Are you sure?</Title>
          <Subtitle>
            You are about to reject this request. Once rejected, the request will be marked as
            declined and the relevant stakeholders will be notified.
          </Subtitle>

          <SummaryCard>
            <SummaryHeader>Request Summary</SummaryHeader>
            {SUMMARY_ROWS.map((row) => (
              <SummaryRow key={row.label} {...row} />
            ))}
          </SummaryCard>

          <WarningBox>
            <WarningIconWrap>
              <WarningIcon />
            </WarningIconWrap>
            <Box>
              <WarningTitle>This action cannot be undone.</WarningTitle>
              <WarningText>
                Please ensure you have reviewed all request details before confirming the rejection.
              </WarningText>
            </Box>
          </WarningBox>

          <Note>
            <NoteIcon>
              <InfoIcon />
            </NoteIcon>
            <NoteText>
              If a rejection comment has already been entered, it will be saved with this decision
              and visible in tracking details.
            </NoteText>
          </Note>
        </Body>

        <Footer>
          <CancelButton variant="outlined" onClick={onClose}>
            Cancel
          </CancelButton>
          <RejectButton variant="contained" disableElevation onClick={onConfirm}>
            Yes, Reject Request
          </RejectButton>
        </Footer>
      </Modal>
    </Overlay>
  )
}

export default RejectConfirmationModal
