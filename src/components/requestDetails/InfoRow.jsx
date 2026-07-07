import { Box, Typography } from '@mui/material'
import styled from 'styled-components'

// Responsive row layout for icon, label, and value columns.
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
`

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6b788a;

  svg {
    width: 12px;
    height: 12px;
  }
`

const Label = styled(Typography)`
  && {
    color: #697386;
    font-size: 10px;
    font-weight: 600;
    line-height: 1.25;
  }

  @media (max-width: 640px) {
    && {
      align-self: end;
    }
  }
`

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
`

// One icon/label/value row used inside request information cards.
function InfoRow({ icon: Icon, label, value }) {
  return (
    <Row>
      <IconWrap>{Icon ? <Icon fontSize="inherit" /> : null}</IconWrap>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Row>
  )
}

export default InfoRow
