import { Box, Typography } from '@mui/material'
import styled from 'styled-components'

// Responsive row for icon, label, and either a value, badge, or comment block.
const Row = styled(Box)`
  display: grid;
  grid-template-columns: 15px minmax(96px, 1fr) minmax(118px, auto);
  align-items: center;
  gap: 8px;
  min-height: ${({ $comment }) => ($comment ? '52px' : '34px')};
  padding: ${({ $comment }) => ($comment ? '7px 0' : '0')};
  border-top: 1px solid #e6edf5;

  &:first-of-type {
    border-top: none;
  }

  @media (max-width: 680px) {
    grid-template-columns: 15px 1fr;
    min-height: ${({ $comment }) => ($comment ? '48px' : '30px')};
    gap: 5px 7px;
  }
`

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #65758b;

  svg {
    width: 12px;
    height: 12px;
  }
`

const Label = styled(Typography)`
  && {
    color: #64748b;
    font-size: 10.5px;
    font-weight: 700;
    line-height: 1.25;
  }
`

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
`

const CommentValue = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 680px) {
    grid-column: 2;
    justify-content: stretch;
  }
`

// Renders one information item inside a recommended request card.
function InfoRow({ icon: Icon, label, value, badge, comment }) {
  return (
    <Row $comment={Boolean(comment)}>
      <IconWrap>{Icon ? <Icon fontSize="inherit" /> : null}</IconWrap>
      <Label>{label}</Label>
      {comment ? (
        <CommentValue>{comment}</CommentValue>
      ) : (
        <Value>{badge || value}</Value>
      )}
    </Row>
  )
}

export default InfoRow
