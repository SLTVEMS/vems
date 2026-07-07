import styled from 'styled-components'

// Tone and dot props keep the badge flexible without separate components.
const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 13px;
  border-radius: 999px;
  border: 1px solid ${({ $tone }) => ($tone === 'green' ? '#9bd8bd' : '#eef2f8')};
  background: ${({ $tone }) => ($tone === 'green' ? '#c6f0dc' : '#f8fbff')};
  color: ${({ $tone }) => ($tone === 'green' ? '#057139' : '#4b5563')};
  font-size: 10px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 8px 18px rgba(57, 84, 120, 0.08);

  &::before {
    content: ${({ $dot }) => ($dot ? "''" : 'none')};
    width: 6px;
    height: 6px;
    margin-right: 7px;
    border-radius: 50%;
    background: #00a651;
  }
`

// Small status pill with optional green tone and leading dot.
function StatusBadge({ children, tone = 'light', dot = false }) {
  return (
    <Badge $tone={tone} $dot={dot}>
      {children}
    </Badge>
  )
}

export default StatusBadge
