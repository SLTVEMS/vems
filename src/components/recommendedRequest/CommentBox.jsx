import { Typography } from '@mui/material'
import styled from 'styled-components'

const Box = styled.div`
  width: 100%;
  padding: ${({ $compact }) => ($compact ? '8px 10px' : '13px 16px')};
  border: 1px solid #dbe8f7;
  border-radius: 7px;
  background: #eef5fd;
`

const Text = styled(Typography)`
  && {
    color: #19304e;
    font-size: ${({ $compact }) => ($compact ? '10px' : '11px')};
    font-style: ${({ $italic }) => ($italic ? 'italic' : 'normal')};
    font-weight: 500;
    line-height: 1.45;
  }
`

function CommentBox({ children, compact = false, italic = false }) {
  return (
    <Box $compact={compact}>
      <Text $compact={compact} $italic={italic}>
        {children}
      </Text>
    </Box>
  )
}

export default CommentBox
