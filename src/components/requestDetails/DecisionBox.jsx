import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Button, TextField, Typography } from '@mui/material'
import styled from 'styled-components'
import { muiIcon } from './iconUtils'

const CheckCircleIcon = muiIcon(CheckCircleOutlineIcon)

// Button variants are centralized so reject/recommend colors stay consistent.
const ACTION_BUTTON_STYLES = {
  recommend: {
    background: '#00a651',
    hoverBackground: '#009349',
    shadow: 'rgba(0, 166, 81, 0.24)',
    hoverShadow: 'rgba(0, 166, 81, 0.3)',
  },
  reject: {
    background: '#ef233c',
    hoverBackground: '#d91f36',
    shadow: 'rgba(239, 35, 60, 0.24)',
    hoverShadow: 'rgba(239, 35, 60, 0.3)',
  },
}

const getActionButtonStyle = (variant) =>
  ACTION_BUTTON_STYLES[variant] || ACTION_BUTTON_STYLES.recommend

// Main decision panel layout and controls.
const Panel = styled(Box)`
  overflow: hidden;
  border: 1px solid rgba(207, 217, 231, 0.95);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 13px 28px rgba(47, 76, 112, 0.08);
`

const Header = styled(Box)`
  padding: 13px 18px 11px;
  border-bottom: 1px solid #e8edf5;
`

const Title = styled(Typography)`
  && {
    color: #0c1424;
    font-size: 12px;
    font-weight: 800;
    line-height: 1.15;
  }
`

const Subtitle = styled(Typography)`
  && {
    margin-top: 3px;
    color: #697386;
    font-size: 10px;
    font-weight: 500;
    line-height: 1.35;
  }
`

const Body = styled(Box)`
  padding: 14px 18px 16px;
`

const FieldLabel = styled(Typography)`
  && {
    margin-bottom: 6px;
    color: #566174;
    font-size: 10px;
    font-weight: 600;
  }
`

const RemarksField = styled(TextField)`
  && {
    width: 100%;
  }

  && .MuiInputBase-root {
    align-items: flex-start;
    min-height: 92px;
    border-radius: 12px;
    background: #f8fbff;
    color: #0d1726;
    font-size: 10.5px;
    font-weight: 500;
  }

  && .MuiOutlinedInput-notchedOutline {
    border-color: #d6dee9;
  }

  && .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline,
  && .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #a9b8ca;
    border-width: 1px;
  }

  && textarea::placeholder {
    color: #657184;
    opacity: 1;
  }
`

const Footer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 12px;

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
  }
`

const Note = styled(Typography)`
  && {
    color: #667386;
    font-size: 9.5px;
    font-weight: 500;
    line-height: 1.4;
  }
`

const Actions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 640px) {
    justify-content: stretch;

    button {
      flex: 1;
    }
  }
`

const ActionButton = styled(Button)`
  && {
    min-width: 80px;
    height: 30px;
    padding: 0 16px;
    border-radius: 999px;
    color: #ffffff;
    background: ${({ $variant }) => getActionButtonStyle($variant).background};
    box-shadow: 0 10px 18px ${({ $variant }) => getActionButtonStyle($variant).shadow};
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
    text-transform: none;
  }

  &&:hover {
    background: ${({ $variant }) => getActionButtonStyle($variant).hoverBackground};
    box-shadow: 0 12px 20px ${({ $variant }) => getActionButtonStyle($variant).hoverShadow};
  }

  && .MuiButton-startIcon {
    margin-left: -3px;
    margin-right: 7px;
  }

  && svg {
    width: 14px;
    height: 14px;
  }
`

// Collects reviewer remarks and exposes the recommend/reject actions.
function DecisionBox({ onRejectClick }) {
  return (
    <Panel>
      <Header>
        <Title>Your Decision</Title>
        <Subtitle>Add remarks for the security desk and submit your recommendation.</Subtitle>
      </Header>
      <Body>
        <FieldLabel>Remarks / Comments</FieldLabel>
        <RemarksField
          multiline
          minRows={5}
          placeholder="Provide context, conditions of entry, escort requirements, or any concerns..."
        />
        <Footer>
          <Note>Decisions are logged and shared with the security operations team.</Note>
          <Actions>
            <ActionButton
              $variant="reject"
              variant="contained"
              disableElevation
              onClick={onRejectClick}
            >
              Reject
            </ActionButton>
            <ActionButton
              $variant="recommend"
              variant="contained"
              disableElevation
              startIcon={<CheckCircleIcon />}
            >
              Recommend
            </ActionButton>
          </Actions>
        </Footer>
      </Body>
    </Panel>
  )
}

export default DecisionBox
