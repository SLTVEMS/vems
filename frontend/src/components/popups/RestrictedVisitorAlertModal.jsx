import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  InputAdornment,
} from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { colors, severityColor, statusColor } from './theme';

/**
 * RestrictedVisitorAlert
 *
 * Full-screen critical alert. Like the other popups, all content is driven
 * by the `visitor` and `stats` props passed in from the parent (e.g. a
 * websocket/gate-AI event handler that receives a detection payload and
 * passes it straight down as props — no local fetching here).
 *
 * Usage:
 *   <RestrictedVisitorAlert
 *     visitor={{
 *       name: 'Kasun Pradeep Jayasinghe',
 *       nic: '892450137V',
 *       country: 'Sri Lanka',
 *       blacklistStatus: 'Active',
 *       restrictionLevel: 'Tier 1 · Critical',
 *       addedBy: 'Corporate Security Div.',
 *       lastAttempt: '12 May 2026',
 *       reason: 'Attempted unauthorized access to data centre infrastructure (Case #SEC-2025-117).',
 *       riskScore: 92,
 *       location: 'Head Office — Lobby A',
 *       detectedAt: { time: '09:09:01', date: 'Sat, 16 May 2026' },
 *     }}
 *     stats={{ restrictedAttempts: 148, monthlyIncidents: 37, activeRestrictions: 2914, highRiskVisitors: 63 }}
 *     incidents={[...]}
 *     onDenyEntry={(visitor) => api.denyEntry(visitor.nic)}
 *     onNotifySecurity={(visitor) => api.notifySecurity(visitor.nic)}
 *   />
 */
export default function RestrictedVisitorAlert({
  visitor,
  stats,
  incidents,
  onDenyEntry,
  onNotifySecurity,
}) {
  return (
    <Box sx={{ bgcolor: colors.panelBg, p: { xs: 2, md: 4 }, borderRadius: 2 }}>
      {/* Top banner */}
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(115deg, #3A1220 0%, ${colors.alertBannerFrom} 22%, ${colors.alertBannerTo} 100%)`,
          color: '#fff',
          borderRadius: 3,
          p: 3.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: 'rgba(229,72,77,0.18)',
              boxShadow: '0 0 0 1px rgba(229,72,77,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ReportIcon sx={{ color: colors.alertRed, fontSize: 30 }} />
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: colors.alertRed, fontWeight: 700, letterSpacing: 1 }}
            >
              SEVERITY · CRITICAL &nbsp;•&nbsp; AUTO-DETECTED BY GATE AI
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, letterSpacing: '-0.02em' }}>
              RESTRICTED VISITOR DETECTED
            </Typography>
            <Typography variant="body2" sx={{ color: '#B7BEDA', mt: 0.5, maxWidth: 480 }}>
              A blacklisted individual has attempted entry at{' '}
              <strong>{visitor.location}</strong>. Apply restricted-entry
              protocol immediately.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography variant="caption" sx={{ color: '#8890AC', letterSpacing: 1 }}>
            DETECTION TIMESTAMP
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {visitor.detectedAt?.time}
          </Typography>
          <Typography variant="caption" sx={{ color: '#8890AC' }}>
            {visitor.detectedAt?.date}
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Visitor profile card */}
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ border: `1px solid ${colors.border}`, borderRadius: 2, p: 2.5, height: '100%' }}>
            <Chip
              icon={<BlockRoundedIcon sx={{ fontSize: 16 }} />}
              label="PERMANENTLY RESTRICTED"
              size="small"
              sx={{
                bgcolor: colors.alertRedBg,
                color: colors.alertRed,
                fontWeight: 700,
                mb: 2,
                boxShadow: '0 0 0 3px rgba(229,72,77,0.12)',
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {visitor.name}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.slate, mb: 2 }}>
              NIC · {visitor.nic} · {visitor.country}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: colors.slate }}>BLACKLIST STATUS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: colors.alertRed }}>
                  {visitor.blacklistStatus}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: colors.slate }}>RESTRICTION LEVEL</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {visitor.restrictionLevel}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: colors.slate }}>ADDED BY</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {visitor.addedBy}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: colors.slate }}>LAST ATTEMPT</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {visitor.lastAttempt}
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="caption" sx={{ color: colors.slate }}>RESTRICTION REASON</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{visitor.reason}</Typography>

            <Typography variant="caption" sx={{ color: colors.slate }}>RISK SCORE</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <LinearProgress
                variant="determinate"
                value={visitor.riskScore}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: colors.border,
                  '& .MuiLinearProgress-bar': { bgcolor: colors.alertRed, borderRadius: 4 },
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 700, color: colors.alertRed, whiteSpace: 'nowrap' }}>
                {visitor.riskScore} / 100 · Extreme
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Actions + stat cards */}
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ border: `1px solid ${colors.border}`, borderRadius: 2, p: 2.5, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Required Security Actions
                </Typography>
                <Typography variant="caption" sx={{ color: colors.slate }}>
                  Follow protocol in order. All items must be confirmed within 15 minutes.
                </Typography>
              </Box>
              <Chip label="PRIORITY · P1" size="small" sx={{ bgcolor: colors.alertRedBg, color: colors.alertRed, fontWeight: 700 }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<BlockRoundedIcon />}
                onClick={() => onDenyEntry?.(visitor)}
                sx={{
                  bgcolor: colors.alertRed,
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: 999,
                  px: 3,
                  py: 1,
                  boxShadow: '0 6px 16px rgba(229,72,77,0.35)',
                  '&:hover': { bgcolor: '#C53A3E' },
                }}
              >
                Deny Entry
              </Button>
              <Button
                variant="contained"
                startIcon={<NotificationsActiveOutlinedIcon />}
                onClick={() => onNotifySecurity?.(visitor)}
                sx={{
                  bgcolor: '#0B2C63',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: 999,
                  px: 3,
                  py: 1,
                  boxShadow: '0 6px 16px rgba(11,44,99,0.3)',
                  '&:hover': { bgcolor: '#082049' },
                }}
              >
                Notify Security
              </Button>
            </Box>
          </Paper>

          <Grid container spacing={2}>
            {[
              { label: 'Restricted Attempts', value: stats.restrictedAttempts, sub: `+${stats.restrictedAttemptsDelta ?? 12} this week`, icon: <MonitorHeartOutlinedIcon sx={{ fontSize: 18 }} />, fg: '#E5484D', bg: '#FBE9E9' },
              { label: 'Monthly Incidents', value: stats.monthlyIncidents, sub: `+${stats.monthlyIncidentsDelta ?? '5.4%'} MoM`, icon: <TrendingUpIcon sx={{ fontSize: 18 }} />, fg: '#B54708', bg: '#FEF0C7' },
              { label: 'Active Restrictions', value: stats.activeRestrictions, sub: 'Last sync 2m ago', icon: <ShieldOutlinedIcon sx={{ fontSize: 18 }} />, fg: '#0F766E', bg: '#E3F4F1' },
              { label: 'High-Risk Visitors', value: stats.highRiskVisitors, sub: `${stats.criticalCount ?? 9} critical`, icon: <GroupOutlinedIcon sx={{ fontSize: 18 }} />, fg: '#1AA152', bg: '#E9F8EF' },
            ].map((s) => (
              <Grid item xs={6} key={s.label}>
                <Paper elevation={0} sx={{ border: `1px solid ${colors.border}`, borderRadius: 2, p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="caption" sx={{ color: colors.slate }}>{s.label}</Typography>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: s.bg,
                        color: s.fg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {s.icon}
                    </Box>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{s.value}</Typography>
                  <Typography variant="caption" sx={{ color: colors.slate }}>{s.sub}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Incident history */}
      <Paper elevation={0} sx={{ border: `1px solid ${colors.border}`, borderRadius: 2, p: 2.5, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Incident History</Typography>
            <Typography variant="caption" sx={{ color: colors.slate }}>Previous attempts logged against this profile</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search incidents..."
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            />
            <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ textTransform: 'none' }}>Filter</Button>
          </Box>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              {['DATE & TIME', 'LOCATION', 'OFFICER', 'ACTION', 'SEVERITY', 'STATUS'].map((h) => (
                <TableCell key={h} sx={{ color: colors.slate, fontWeight: 700, fontSize: 12 }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.dateTime}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.officer}</TableCell>
                <TableCell>{row.action}</TableCell>
                <TableCell>
                  <Chip
                    icon={<WarningRoundedIcon sx={{ fontSize: 14 }} />}
                    label={row.severity}
                    size="small"
                    sx={{ bgcolor: severityColor[row.severity]?.bg, color: severityColor[row.severity]?.fg, fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{ bgcolor: statusColor[row.status]?.bg, color: statusColor[row.status]?.fg, fontWeight: 600 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

RestrictedVisitorAlert.propTypes = {
  visitor: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  incidents: PropTypes.array.isRequired,
  onDenyEntry: PropTypes.func,
  onNotifySecurity: PropTypes.func,
};
