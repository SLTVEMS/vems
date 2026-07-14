// theme.js
// Shared design tokens used across all 4 SafeZone AI popup components.
// Import these wherever you need consistent colors/spacing instead of
// hardcoding hex values in each component.

export const colors = {
  // Duplicate warning (orange)
  warningBg: '#FEF6E7',
  warningBorder: '#F3D9A4',
  warningIcon: '#F0A93B',
  warningText: '#D98E1B',

  // Restricted alert (dark red / navy)
  alertBannerFrom: '#1B2340',
  alertBannerTo: '#141A30',
  alertRed: '#E5484D',
  alertRedBg: '#FBE9E9',

  // Rejected (red)
  rejectRed: '#E5312F',
  rejectRedBg: '#FDEAEA',
  rejectRedBorder: '#F6C7C6',

  // Approved (green)
  approveGreen: '#1AA152',
  approveGreenBg: '#E9F8EF',
  approveGreenBorder: '#BEE9CE',

  // Neutrals
  ink: '#1A1F2B',
  slate: '#5B6472',
  border: '#E3E6EC',
  panelBg: '#EAEBEF',
};

export const severityColor = {
  Critical: { fg: '#B42318', bg: '#FEE4E2' },
  High: { fg: '#B54708', bg: '#FEF0C7' },
  Medium: { fg: '#5B6472', bg: '#EEF1F5' },
};

export const statusColor = {
  Closed: { fg: '#1AA152', bg: '#E9F8EF' },
  Reported: { fg: '#B54708', bg: '#FEF0C7' },
  Escalated: { fg: '#B42318', bg: '#FEE4E2' },
};
