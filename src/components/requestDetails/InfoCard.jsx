import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Typography } from '@mui/material'
import styled from 'styled-components'
import InfoRow from './InfoRow'
import { muiIcon } from './iconUtils'

const CheckCircleIcon = muiIcon(CheckCircleOutlineIcon)

// Card frame for a group of related request detail rows.
const Card = styled(Box)`
  overflow: hidden;
  border: 1px solid rgba(207, 217, 231, 0.92);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 13px 28px rgba(47, 76, 112, 0.08);
`

const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 18px 12px;

  @media (max-width: 760px) {
    padding: 10px 14px 9px;
  }
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
    line-height: 1.3;
  }
`

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
`

// Groups related request details under one titled card.
function InfoCard({ title, subtitle, rows }) {
  return (
    <Card>
      <Header>
        <Box>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Box>
        <HeaderIcon>
          <CheckCircleIcon fontSize="inherit" />
        </HeaderIcon>
      </Header>
      {rows.map((row) => (
        <InfoRow key={row.label} {...row} />
      ))}
    </Card>
  )
}

export default InfoCard
