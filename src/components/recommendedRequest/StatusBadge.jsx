import styled from 'styled-components'

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  min-height: 18px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid ${({ $tone }) => {
    if ($tone === 'blue') return '#b9dcff'
    if ($tone === 'yellow') return '#ead08a'
    if ($tone === 'red') return '#ff9a9f'
    if ($tone === 'dark') return '#d1d5db'
    return '#e2e8f0'
  }};
  background: ${({ $tone }) => {
    if ($tone === 'blue') return '#dff0ff'
    if ($tone === 'yellow') return '#fff3cf'
    if ($tone === 'red') return '#ffe6e8'
    if ($tone === 'dark') return '#e5e7eb'
    return '#f1f5f9'
  }};
  color: ${({ $tone }) => {
    if ($tone === 'blue') return '#1473d1'
    if ($tone === 'yellow') return '#7a5207'
    if ($tone === 'red') return '#e60012'
    if ($tone === 'dark') return '#111827'
    return '#64748b'
  }};
  font-size: 9px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
`

const Dot = styled.span`
  width: 5px;
  height: 5px;
  margin-right: 5px;
  border-radius: 50%;
  background: ${({ $tone }) => {
    if ($tone === 'yellow') return '#d69a0b'
    if ($tone === 'red') return '#ff2738'
    if ($tone === 'dark') return '#111827'
    return '#1f8fff'
  }};
`

function StatusBadge({ children, tone = 'gray', dot = false }) {
  return (
    <Badge $tone={tone}>
      {dot ? <Dot $tone={tone} /> : null}
      {children}
    </Badge>
  )
}

export default StatusBadge
