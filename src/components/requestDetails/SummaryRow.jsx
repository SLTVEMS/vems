import { Box, Typography } from '@mui/material'
import styled from 'styled-components'

const Row = styled(Box)`
  display: grid;
  grid-template-columns: 20px minmax(120px, 1fr) minmax(160px, auto);
  align-items: center;
  gap: 12px;
  min-height: 36px;
  padding: 0 18px;
  border-top: 1px solid #e5ebf3;

  @media (max-width: 560px) {
    grid-template-columns: 20px 1fr;
    align-items: start;
    min-height: 30px;
    padding: 6px 16px;
    row-gap: 4px;
  }
`

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #5f7390;

  svg {
    width: 13px;
    height: 13px;
  }
`

const Label = styled(Typography)`
  && {
    color: #607491;
    font-size: 11.5px;
    font-weight: 500;
    line-height: 1.35;
  }
`

const Value = styled(Typography)`
  && {
    color: #071126;
    font-size: 11.5px;
    font-weight: 800;
    line-height: 1.35;
    text-align: right;
  }

  @media (max-width: 560px) {
    && {
      grid-column: 2;
      text-align: left;
      overflow-wrap: anywhere;
    }
  }
`

function SummaryRow({ icon: Icon, label, value }) {
  return (
    <Row>
      <IconWrap>{Icon ? <Icon fontSize="inherit" /> : null}</IconWrap>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Row>
  )
}

export default SummaryRow
