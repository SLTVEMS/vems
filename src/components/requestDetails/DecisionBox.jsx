import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Button, Typography } from '@mui/material'
import styled from 'styled-components'
import { muiIcon } from './iconUtils.js'

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
  padding: 16px 20px 14px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 88px;
  padding: 18px 20px;

  @media (max-width: 640px) {
    min-height: 76px;
  }
`

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
`

const ActionButton = styled(Button)`
  && {
    min-width: 80px;
    height: 30px;
    padding: 0 18px;
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
      </Body>
    </Panel>
  )
}

export default DecisionBox
