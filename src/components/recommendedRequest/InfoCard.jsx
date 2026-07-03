import { Box, Typography } from '@mui/material'
import styled from 'styled-components'
import InfoRow from './InfoRow'

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
`

const Title = styled(Typography)`
  && {
    margin-bottom: 12px;
    color: #163b70;
    font-size: 10.5px;
    font-weight: 900;
    letter-spacing: 0.02em;
    line-height: 1;
    text-transform: uppercase;
  }
`

function InfoCard({ title, rows }) {
  return (
    <Card>
      <Title>{title}</Title>
      {rows.map((row) => (
        <InfoRow key={row.label} {...row} />
      ))}
    </Card>
  )
}

export default InfoCard
