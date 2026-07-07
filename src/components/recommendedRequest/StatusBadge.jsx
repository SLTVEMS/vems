import styled from 'styled-components'

const BADGE_TONES = {
  blue: {
    border: '#b9dcff',
    background: '#dff0ff',
    color: '#1473d1',
    dot: '#1f8fff',
  },
  dark: {
    border: '#d1d5db',
    background: '#e5e7eb',
    color: '#111827',
    dot: '#111827',
  },
  gray: {
    border: '#e2e8f0',
    background: '#f1f5f9',
    color: '#64748b',
    dot: '#1f8fff',
  },
  red: {
    border: '#ff9a9f',
    background: '#ffe6e8',
    color: '#e60012',
    dot: '#ff2738',
  },
  yellow: {
    border: '#ead08a',
    background: '#fff3cf',
    color: '#7a5207',
    dot: '#d69a0b',
  },
}

const getBadgeTone = (tone) => BADGE_TONES[tone] || BADGE_TONES.gray

// Keeps badge colors centralized so border, text, background, and dot stay in sync.
const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  min-height: 18px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid ${({ $tone }) => getBadgeTone($tone).border};
  background: ${({ $tone }) => getBadgeTone($tone).background};
  color: ${({ $tone }) => getBadgeTone($tone).color};
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
  background: ${({ $tone }) => getBadgeTone($tone).dot};
`

// Small status pill with optional tone color and leading dot.
function StatusBadge({ children, tone = 'gray', dot = false }) {
  return (
    <Badge $tone={tone}>
      {dot ? <Dot $tone={tone} /> : null}
      {children}
    </Badge>
  )
}

export default StatusBadge
