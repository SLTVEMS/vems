import React, { useState } from 'react';
import {
  Box, Typography, Button, Paper, IconButton, Chip, LinearProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider,
  Grid, Checkbox, InputAdornment, TextField, Snackbar, Tooltip,
  Zoom
} from '@mui/material';
import {
  Warning, Shield, NotificationsActive, Assignment, History,
  Search, FilterList, Close, ContentCopy,
  PersonOff, Security, GppBad, CheckCircle, PeopleAlt, Block
} from '@mui/icons-material';

// ── Colours ───────────────────────────────────────────────────────────────────
const C = {
  navy:       '#0a1628',
  navyMid:    '#0d1f3c',
  red:        '#ef4444',
  redDark:    '#b91c1c',
  orange:     '#f97316',
  green:      '#22c55e',
  greenDark:  '#16a34a',
  amber:      '#f59e0b',
  bg:         '#f0f4f8',
  white:      '#ffffff',
  slate:      '#64748b',
  slateLight: '#94a3b8',
  border:     '#e2e8f0',
};

// ── Data ──────────────────────────────────────────────────────────────────────
const RESTRICTED_VISITOR = {
  name:        'Kasun Pradeep Jayasinghe',
  nic:         '892450137V',
  country:     'Sri Lanka',
  blacklist:   'Active',
  level:       'Tier 1 – Critical',
  addedBy:     'Corporate Security Div.',
  lastAttempt: '12 May 2026',
  reason:      'Attempted unauthorized access to data centre infrastructure (Case #SEC-2025-117).',
  riskScore:   92,
};

const DUPLICATE_VISITOR = {
  name:        'Nimal Kumara Bandara',
  nic:         '901230456V',
  country:     'Sri Lanka',
  blacklist:   'Active',
  level:       'Tier 2 – High',
  addedBy:     'Branch Security Unit',
  lastAttempt: '05 May 2026',
  reason:      'Registered under multiple identities across regional offices (Case #SEC-2024-089).',
  riskScore:   76,
  matchScore:  94,
  duplicateOf: '198340021V',
  aliases:     ['Nimal K. Banda', 'N. Bandara', 'Kumar Nimal'],
};

const STATS = [
  { label: 'Restricted Attempts', value: '148', sub: '+12 this week',      Icon: GppBad,    color: '#ef4444', bg: '#fef2f2' },
  { label: 'Monthly Incidents',   value: '37',  sub: '+5.4% MoM',          Icon: Warning,   color: '#f97316', bg: '#fff7ed' },
  { label: 'Active Restrictions', value: '2,914', sub: 'Last sync 2m ago', Icon: Shield,    color: '#64748b', bg: '#f1f5f9' },
  { label: 'High-Risk Visitors',  value: '63',  sub: '9 critical',         Icon: PersonOff, color: '#0a1628', bg: '#e8ecf4' },
];

const RESTRICTED_ACTIONS = [
  'Deny entry immediately and retain ID document',
  'Notify Security Division via internal channel',
  'Escalate to Duty Officer on shift',
  'Capture CCTV reference and timestamp',
  'File incident report within 15 minutes',
];

const DUPLICATE_ACTIONS = [
  'Cross-verify biometric data immediately',
  'Retain all ID documents presented',
  'Notify Identity Verification Unit',
  'Flag duplicate profile in central registry',
  'Submit duplicate identity report within 30 minutes',
];

const INCIDENTS = [
  { date: '12 May 2026 – 09:42', location: 'Head Office — Lobby A',  officer: 'Lt. R. Fernando', action: 'Entry denied',        severity: 'Critical', status: 'Closed'    },
  { date: '28 Apr 2026 – 14:18', location: 'Welikada Exchange',       officer: 'Sgt. M. Perera',  action: 'Detained & escorted', severity: 'High',     status: 'Reported'  },
  { date: '03 Mar 2026 – 11:05', location: 'Kandy Regional Office',   officer: 'Lt. R. Fernando', action: 'Entry denied',        severity: 'High',     status: 'Closed'    },
  { date: '17 Feb 2026 – 16:30', location: 'Galle Tech Centre',       officer: 'Cpl. D. Silva',   action: 'Warning issued',      severity: 'Medium',   status: 'Closed'    },
  { date: '02 Jan 2026 – 08:55', location: 'Head Office — Gate 3',    officer: 'Sgt. M. Perera',  action: 'Entry denied',        severity: 'Critical', status: 'Escalated' },
];

const SEV_COLOR  = { Critical: '#ef4444', High: '#f97316', Medium: '#f59e0b' };
const STAT_COLOR = { Closed: '#16a34a', Reported: '#f97316', Escalated: '#ef4444' };

const SeverityChip = ({ label }) => (
  <Chip
    icon={<Warning sx={{ fontSize: '11px !important', color: `${SEV_COLOR[label]} !important` }} />}
    label={label} size="small"
    sx={{ bgcolor: `${SEV_COLOR[label]}15`, color: SEV_COLOR[label], fontWeight: 700, fontSize: 11, border: `1px solid ${SEV_COLOR[label]}35`, height: 24 }}
  />
);
const StatusChip = ({ label }) => (
  <Chip label={label} size="small"
    sx={{ bgcolor: `${STAT_COLOR[label]}15`, color: STAT_COLOR[label], fontWeight: 700, fontSize: 11, border: `1px solid ${STAT_COLOR[label]}35`, height: 24 }}
  />
);

// ── Component ─────────────────────────────────────────────────────────────────
const RestrictedVisitorAlert = () => {
  const [tab, setTab]               = useState('restricted'); // 'restricted' | 'duplicate'
  const [checked, setChecked]       = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [snackOpen, setSnackOpen]   = useState(false);
  const [snackMsg, setSnackMsg]     = useState('');
  const [search, setSearch]         = useState('');

  const isRestricted = tab === 'restricted';
  const visitor      = isRestricted ? RESTRICTED_VISITOR : DUPLICATE_VISITOR;
  const actions      = isRestricted ? RESTRICTED_ACTIONS : DUPLICATE_ACTIONS;

  const toggleCheck = (i) => setChecked((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);
  const openDialog  = (type) => { setDialogType(type); setDialogOpen(true); };
  const toast       = (msg)  => { setSnackMsg(msg); setSnackOpen(true); };

  const copyDetails = () => {
    const text = Object.entries(visitor).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n');
    navigator.clipboard.writeText(text).catch(() => {});
    toast('Visitor details copied to clipboard');
  };

  const filteredIncidents = INCIDENTS.filter((r) =>
    Object.values(r).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  const dialogContent = {
    deny:     { title: 'Confirm: Deny Entry',       body: `You are denying entry to ${visitor.name} (NIC: ${visitor.nic}). This action will be logged.`,  action: 'Confirm Deny',      color: C.red    },
    notify:   { title: 'Notify Security Division',  body: 'An automated alert will be sent to the Security Division via the internal channel. Proceed?',   action: 'Send Notification', color: C.navy   },
    duty:     { title: 'Escalate to Duty Officer',  body: 'This incident will be escalated to the current Duty Officer on shift. Confirm escalation?',     action: 'Escalate Now',      color: C.orange },
    incident: { title: 'File Incident Report',      body: 'An incident report will be created and sent to Corporate Security. Confirm submission?',        action: 'Submit Report',     color: C.navyMid },
    log:      { title: 'Log Attempt',               body: 'This access attempt will be logged with current timestamp and location. Confirm?',              action: 'Log Attempt',       color: C.slate  },
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 72px - 48px)', bgcolor: C.bg }}>

      {/* ── Tab switcher — exactly as in screenshot ── */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mb: '18px' }}>
        {[
          { key: 'duplicate',  label: 'Duplicate Visitor Screen'  },
          { key: 'restricted', label: 'Restricted Visitor Screen' },
        ].map(({ key, label }) => (
          <Button
            key={key}
            onClick={() => { setTab(key); setChecked([]); }}
            disableElevation
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '13px',
              px: '22px',
              py: '8px',
              borderRadius: '8px',
              bgcolor: tab === key ? C.green       : C.white,
              color:   tab === key ? '#fff'        : C.slate,
              border:  tab === key ? 'none'        : `1px solid ${C.border}`,
              boxShadow: tab === key ? '0 4px 14px rgba(34,197,94,0.3)' : 'none',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: tab === key ? C.greenDark : '#f1f5f9' },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      {/* ── Alert Banner ── */}
      <Paper elevation={0} sx={{
        borderRadius: '14px', overflow: 'hidden', mb: '18px',
        border: '1px solid #1e3a6e',
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 60%, #0f2a50 100%)`,
        boxShadow: '0 4px 24px rgba(10,22,40,0.18)',
      }}>
        <Box sx={{ px: '28px', py: '22px', display: 'flex', alignItems: 'center', gap: '22px' }}>
          {/* Icon circle */}
          <Box sx={{
            width: 58, height: 58, borderRadius: '50%',
            bgcolor: isRestricted ? '#ef444420' : '#f9731620',
            border:  isRestricted ? '2px solid #ef444455' : '2px solid #f9731655',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': { '0%': { boxShadow: '0 0 0 0 #ef444440' }, '70%': { boxShadow: '0 0 0 12px #ef444400' }, '100%': { boxShadow: '0 0 0 0 #ef444400' } },
          }}>
            {isRestricted
              ? <Warning sx={{ color: C.red, fontSize: 28 }} />
              : <PeopleAlt sx={{ color: C.orange, fontSize: 28 }} />}
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: isRestricted ? C.red : C.orange, fontSize: '9px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', mb: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: isRestricted ? C.red : C.orange, display: 'inline-block', animation: 'blink 1s infinite', '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.2 } } }} />
              {isRestricted ? 'Severity · Critical • Auto-detected by Gate AI' : 'Alert · High • Duplicate Identity Detected'}
            </Typography>
            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '18px', sm: '26px' }, letterSpacing: '0.04em', lineHeight: 1.15, textTransform: 'uppercase' }}>
              {isRestricted ? 'Restricted Visitor Detected' : 'Duplicate Visitor Detected'}
            </Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '13px', mt: '7px', lineHeight: 1.5 }}>
              {isRestricted
                ? <>A blacklisted individual has attempted entry at <Box component="span" sx={{ color: '#fff', fontWeight: 700 }}>Head Office — Lobby A</Box>. Apply restricted-entry protocol immediately.</>
                : <>A visitor presenting multiple identities has been flagged at <Box component="span" sx={{ color: '#fff', fontWeight: 700 }}>Head Office — Lobby A</Box>. Initiate identity verification protocol.</>}
            </Typography>
          </Box>

          {/* Timestamp */}
          <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography sx={{ color: '#94a3b8', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', mb: '4px' }}>Detection Timestamp</Typography>
            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '30px', fontFamily: 'monospace', lineHeight: 1, letterSpacing: '0.04em' }}>09:09:01</Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '11px', mt: '4px' }}>Sat, 18 May 2026</Typography>
          </Box>
        </Box>
      </Paper>

      {/* ── Two-column: LEFT profile | RIGHT actions+stats ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '320px 1fr' }, gap: '18px', mb: '18px' }}>

        {/* LEFT — Visitor profile card */}
        <Paper elevation={0} sx={{ borderRadius: '14px', border: `1px solid ${C.border}`, p: '20px', bgcolor: C.white, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

          {/* ⊘ badge — small pill, left-aligned, NOT stretched */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '14px' }}>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              bgcolor: '#fef2f2',
              border: `1px solid ${C.red}40`,
              borderRadius: '20px',
              px: '10px', py: '4px',
            }}>
              <Block sx={{ fontSize: 12, color: C.red }} />
              <Typography sx={{ fontSize: '11px', fontWeight: 700, color: C.red, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                {isRestricted ? 'Permanently Restricted' : 'Duplicate Identity'}
              </Typography>
            </Box>
            <Tooltip title="Copy visitor details">
              <IconButton size="small" onClick={copyDetails} sx={{ color: C.slate, '&:hover': { bgcolor: '#f1f5f9' } }}>
                <ContentCopy sx={{ fontSize: 15 }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography sx={{ fontWeight: 800, fontSize: '16px', color: '#0f172a', mb: '3px' }}>{visitor.name}</Typography>
          <Typography sx={{ color: C.slate, fontSize: '12px', mb: '18px' }}>NIC · {visitor.nic} — {visitor.country}</Typography>

          <Grid container spacing={2} sx={{ mb: '14px' }}>
            {(isRestricted
              ? [
                  { label: 'Blacklist Status',  value: visitor.blacklist,   valueColor: C.red },
                  { label: 'Restriction Level', value: visitor.level },
                  { label: 'Added By',          value: visitor.addedBy },
                  { label: 'Last Attempt',      value: visitor.lastAttempt },
                ]
              : [
                  { label: 'Blacklist Status',   value: visitor.blacklist,   valueColor: C.red },
                  { label: 'Restriction Level',  value: visitor.level },
                  { label: 'Added By',           value: visitor.addedBy },
                  { label: 'Last Attempt',       value: visitor.lastAttempt },
                  { label: 'Duplicate Of (NIC)', value: visitor.duplicateOf, valueColor: C.amber },
                  { label: 'Match Score',        value: `${visitor.matchScore}%`, valueColor: C.orange },
                ]
            ).map(({ label, value, valueColor }) => (
              <Grid item xs={6} key={label}>
                <Typography sx={{ fontSize: '9px', fontWeight: 700, color: C.slateLight, textTransform: 'uppercase', letterSpacing: '0.09em', mb: '3px' }}>{label}</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: valueColor || '#0f172a' }}>{value}</Typography>
              </Grid>
            ))}
          </Grid>

          {/* Known aliases — duplicate only */}
          {!isRestricted && (
            <>
              <Typography sx={{ fontSize: '9px', fontWeight: 700, color: C.slateLight, textTransform: 'uppercase', letterSpacing: '0.09em', mb: '6px' }}>Known Aliases</Typography>
              <Box sx={{ display: 'flex', gap: '6px', flexWrap: 'wrap', mb: '14px' }}>
                {visitor.aliases.map((a) => (
                  <Chip key={a} label={a} size="small" sx={{ bgcolor: '#fff7ed', color: C.orange, fontWeight: 600, fontSize: 11, border: `1px solid ${C.orange}30`, height: 22 }} />
                ))}
              </Box>
            </>
          )}

          <Typography sx={{ fontSize: '9px', fontWeight: 700, color: C.slateLight, textTransform: 'uppercase', letterSpacing: '0.09em', mb: '5px' }}>
            {isRestricted ? 'Restriction Reason' : 'Reason'}
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#334155', lineHeight: 1.6, mb: '18px' }}>{visitor.reason}</Typography>

          {/* Risk score */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '7px' }}>
            <Typography sx={{ fontSize: '11px', fontWeight: 600, color: C.slate }}>Risk Score</Typography>
            <Typography sx={{ fontSize: '11px', fontWeight: 800, color: isRestricted ? C.red : C.orange }}>
              {visitor.riskScore} / 100 · {isRestricted ? 'Extreme' : 'High'}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate" value={visitor.riskScore}
            sx={{ height: 7, borderRadius: 4, bgcolor: isRestricted ? '#fee2e2' : '#fff7ed', '& .MuiLinearProgress-bar': { bgcolor: isRestricted ? C.red : C.orange, borderRadius: 4 } }}
          />
        </Paper>

        {/* RIGHT — actions panel + 4 stat cards below */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Security actions */}
          <Paper elevation={0} sx={{ borderRadius: '14px', border: `1px solid ${C.border}`, p: '22px', bgcolor: C.white, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '16px' }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>Required Security Actions</Typography>
                <Typography sx={{ fontSize: '12px', color: C.slate, mt: '2px' }}>
                  {isRestricted ? 'Follow protocol in order. All items must be confirmed within 15 minutes.' : 'Complete verification steps. All items must be confirmed within 30 minutes.'}
                </Typography>
              </Box>
              <Chip
                label={isRestricted ? 'PRIORITY · P1' : 'PRIORITY · P2'} size="small"
                sx={{ bgcolor: isRestricted ? '#fef2f2' : '#fffbeb', color: isRestricted ? C.red : C.amber, fontWeight: 800, fontSize: 10, border: `1px solid ${isRestricted ? C.red : C.amber}35`, height: 24 }}
              />
            </Box>

            {/* Checklist */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px', mb: '20px' }}>
              {actions.map((action, i) => (
                <Box key={i} onClick={() => toggleCheck(i)} sx={{
                  display: 'flex', alignItems: 'center', gap: '13px',
                  p: '11px 14px', borderRadius: '10px', cursor: 'pointer',
                  border: `1px solid ${checked.includes(i) ? '#86efac' : C.border}`,
                  bgcolor: checked.includes(i) ? '#f0fdf4' : '#f8fafc',
                  transition: 'all 0.18s ease',
                  '&:hover': { borderColor: checked.includes(i) ? '#4ade80' : '#cbd5e1', bgcolor: checked.includes(i) ? '#dcfce7' : '#f1f5f9' },
                }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: checked.includes(i) ? C.greenDark : C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background-color 0.2s' }}>
                    {checked.includes(i)
                      ? <CheckCircle sx={{ color: '#fff', fontSize: 16 }} />
                      : <Typography sx={{ color: '#fff', fontSize: '11px', fontWeight: 800 }}>0{i + 1}</Typography>}
                  </Box>
                  <Typography sx={{ flex: 1, fontSize: '13px', fontWeight: 500, color: '#334155', textDecoration: checked.includes(i) ? 'line-through' : 'none', transition: 'all 0.15s' }}>
                    {action}
                  </Typography>
                  <Checkbox checked={checked.includes(i)} onChange={() => toggleCheck(i)} size="small" sx={{ p: 0, color: C.border, '&.Mui-checked': { color: C.greenDark } }} />
                </Box>
              ))}
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
              {[
                { label: 'Deny Entry',      key: 'deny',     icon: <GppBad sx={{ fontSize: 15 }} />,              bg: C.red,     hover: C.redDark,  tc: '#fff'     },
                { label: 'Notify Security', key: 'notify',   icon: <NotificationsActive sx={{ fontSize: 15 }} />,  bg: C.navy,    hover: '#1a2e4a',  tc: '#fff'     },
                { label: 'Duty Officer',    key: 'duty',     icon: <Security sx={{ fontSize: 15 }} />,             bg: '#f1f5f9', hover: '#e2e8f0',  tc: '#334155', ol: true },
                { label: 'Incident Report', key: 'incident', icon: <Assignment sx={{ fontSize: 15 }} />,           bg: '#f1f5f9', hover: '#e2e8f0',  tc: '#334155', ol: true },
                { label: 'Log Attempt',     key: 'log',      icon: <History sx={{ fontSize: 15 }} />,              bg: '#f1f5f9', hover: '#e2e8f0',  tc: '#334155', ol: true },
              ].map(({ label, key, icon, bg, hover, tc, ol }) => (
                <Button key={key} variant="contained" disableElevation startIcon={icon} onClick={() => openDialog(key)}
                  sx={{ bgcolor: bg, color: tc, fontWeight: 700, fontSize: '12px', px: '15px', py: '8px', borderRadius: '8px', textTransform: 'none', border: ol ? `1px solid ${C.border}` : 'none', transition: 'all 0.15s', '&:hover': { bgcolor: hover, transform: 'translateY(-1px)' }, '&:active': { transform: 'translateY(0)' } }}>
                  {label}
                </Button>
              ))}
            </Box>
          </Paper>

          {/* ── 4 Stats cards — below actions, inside right column ── */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {STATS.map(({ label, value, sub, Icon, color, bg }) => (
              <Paper key={label} elevation={0} sx={{
                borderRadius: '12px', border: `1px solid ${C.border}`, p: '14px 16px', bgcolor: C.white,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' },
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '8px' }}>
                  <Typography sx={{ fontSize: '10px', fontWeight: 600, color: C.slate, lineHeight: 1.3, pr: '4px' }}>{label}</Typography>
                  <Box sx={{ width: 28, height: 28, borderRadius: '7px', bgcolor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon sx={{ fontSize: 15, color }} />
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 900, fontSize: '22px', color: '#0f172a', lineHeight: 1 }}>{value}</Typography>
                <Typography sx={{ fontSize: '10px', color, fontWeight: 600, mt: '4px' }}>{sub}</Typography>
              </Paper>
            ))}
          </Box>

        </Box>{/* end right col */}
      </Box>

      {/* ── Incident History table ── */}
      <Paper elevation={0} sx={{ borderRadius: '14px', border: `1px solid ${C.border}`, bgcolor: C.white, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <Box sx={{ px: '22px', py: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}` }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>Incident History</Typography>
            <Typography sx={{ fontSize: '12px', color: C.slate, mt: '1px' }}>Previous attempts logged against this profile</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
            <TextField
              size="small" placeholder="Search incidents..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 15, color: C.slate }} /></InputAdornment> }}
              sx={{ width: 190, '& .MuiOutlinedInput-root': { borderRadius: '8px', fontSize: '12px', '& fieldset': { borderColor: C.border }, '&:hover fieldset': { borderColor: '#94a3b8' } } }}
            />
            <Button startIcon={<FilterList sx={{ fontSize: 15 }} />}
              sx={{ textTransform: 'none', fontSize: '12px', fontWeight: 600, color: C.slate, border: `1px solid ${C.border}`, borderRadius: '8px', px: '13px', py: '6px', bgcolor: '#fff', '&:hover': { bgcolor: '#f8fafc' } }}>
              Filter
            </Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                {['Date & Time', 'Location', 'Officer', 'Action', 'Severity', 'Status', ''].map((h) => (
                  <TableCell key={h} sx={{ fontSize: '10px', fontWeight: 700, color: C.slate, textTransform: 'uppercase', letterSpacing: '0.07em', py: '10px', borderBottom: `1px solid ${C.border}` }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIncidents.map((row, i) => (
                <TableRow key={i} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                  <TableCell sx={{ fontSize: '13px', color: '#334155', py: '13px', borderBottom: `1px solid ${C.border}` }}>{row.date}</TableCell>
                  <TableCell sx={{ fontSize: '13px', color: '#334155', py: '13px', borderBottom: `1px solid ${C.border}` }}>{row.location}</TableCell>
                  <TableCell sx={{ fontSize: '13px', color: '#334155', py: '13px', borderBottom: `1px solid ${C.border}` }}>{row.officer}</TableCell>
                  <TableCell sx={{ fontSize: '13px', color: '#334155', py: '13px', borderBottom: `1px solid ${C.border}` }}>{row.action}</TableCell>
                  <TableCell sx={{ py: '13px', borderBottom: `1px solid ${C.border}` }}><SeverityChip label={row.severity} /></TableCell>
                  <TableCell sx={{ py: '13px', borderBottom: `1px solid ${C.border}` }}><StatusChip label={row.status} /></TableCell>
                  <TableCell sx={{ py: '13px', borderBottom: `1px solid ${C.border}`, color: C.slateLight, fontSize: '18px', cursor: 'pointer', '&:hover': { color: C.slate } }}>···</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ── Dialog ── */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth TransitionComponent={Zoom} PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}>
        {dialogType && (
          <>
            <DialogTitle sx={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 100%)`, color: '#fff', fontWeight: 700, fontSize: '15px', px: '24px', py: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {dialogContent[dialogType]?.title}
              <IconButton size="small" onClick={() => setDialogOpen(false)} sx={{ color: '#94a3b8', '&:hover': { color: '#fff' } }}><Close fontSize="small" /></IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ px: '24px', py: '22px' }}>
              <Typography sx={{ fontSize: '14px', color: '#334155', lineHeight: 1.65 }}>{dialogContent[dialogType]?.body}</Typography>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ px: '24px', py: '14px', gap: '10px' }}>
              <Button onClick={() => setDialogOpen(false)} sx={{ textTransform: 'none', fontWeight: 600, color: C.slate, border: `1px solid ${C.border}`, borderRadius: '8px', px: '16px', '&:hover': { bgcolor: '#f8fafc' } }}>Cancel</Button>
              <Button variant="contained" disableElevation
                onClick={() => { setDialogOpen(false); toast(`✓ ${dialogContent[dialogType]?.action} — confirmed`); }}
                sx={{ bgcolor: dialogContent[dialogType]?.color, color: '#fff', fontWeight: 700, fontSize: '13px', px: '20px', borderRadius: '8px', textTransform: 'none', '&:hover': { filter: 'brightness(0.88)' } }}>
                {dialogContent[dialogType]?.action}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ── Snackbar ── */}
      <Snackbar open={snackOpen} autoHideDuration={2800} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', bgcolor: C.navy, color: '#fff', px: '20px', py: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
          <CheckCircle sx={{ color: C.green, fontSize: 18 }} />
          {snackMsg}
        </Box>
      </Snackbar>
    </Box>
  );
};

export default RestrictedVisitorAlert;
