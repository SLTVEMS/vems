import React, { useState } from 'react';
import {
  Box, Typography, Button, Paper, IconButton, Tooltip, Snackbar, Fab
} from '@mui/material';
import {
  CheckCircle, WarningAmber, Block, ContentCopy, QrCode2,
  OpenInNew, AddCircleOutline, Visibility, ReportProblem
} from '@mui/icons-material';

const NAVY = '#0d1b2a';
const GREEN = '#50B748';

const SCREENS = {
  success: {
    icon: CheckCircle,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    title: 'Request Submitted Successfully !',
    subtitle: 'Your visitor request has been sent for employee.',
    badgeBg: '#f0fdf4',
    badgeBorder: '#86efac',
    badgeColor: '#15803d',
    badgePrefix: 'Entry Code :',
    badgeValue: 'VE20260512-005',
    showCopy: true,
    showQr: true,
    buttons: [
      { label: 'View Direct Entry Details', icon: <Visibility sx={{ fontSize: 16 }} />, action: 'view' },
      { label: 'Create Another Request',    icon: <AddCircleOutline sx={{ fontSize: 16 }} />, action: 'create' },
    ],
  },
  duplicate: {
    icon: WarningAmber,
    iconBg: '#fef9c3',
    iconColor: '#ca8a04',
    title: 'Duplicate Request Found !',
    subtitle: 'An active request already exists for this visitor entry profile today.',
    badgeBg: '#fffbeb',
    badgeBorder: '#fcd34d',
    badgeColor: '#b45309',
    badgePrefix: 'Active Code :',
    badgeValue: 'VE20260512-005',
    showCopy: true,
    showQr: false,
    buttons: [
      { label: 'View Existing Request', icon: <Visibility sx={{ fontSize: 16 }} />, action: 'view' },
      { label: 'Create New Request',    icon: <AddCircleOutline sx={{ fontSize: 16 }} />, action: 'create' },
    ],
  },
  restricted: {
    icon: Block,
    iconBg: '#fee2e2',
    iconColor: '#dc2626',
    title: 'Access Request Denied !',
    subtitle: 'This visitor credential matches the global facility restriction list configuration.',
    badgeBg: '#fef2f2',
    badgeBorder: '#fca5a5',
    badgeColor: '#b91c1c',
    badgePrefix: 'Access Status:',
    badgeValue: 'RESTRICTED',
    showCopy: false,
    showQr: false,
    buttons: [
      { label: 'View Restriction Details', icon: <ReportProblem sx={{ fontSize: 16 }} />, action: 'view' },
      { label: 'Try Different Visitor',    icon: <AddCircleOutline sx={{ fontSize: 16 }} />, action: 'create' },
    ],
  },
};

const TABS = [
  { key: 'success',    label: 'Success Screen' },
  { key: 'duplicate',  label: 'Duplicate Visitor Screen' },
  { key: 'restricted', label: 'Restricted Visitor Screen' },
];

// Flip card button — front shows label, back shows a data summary
const FlipButton = ({ label, icon, data, color }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      onClick={() => setFlipped(f => !f)}
      sx={{
        perspective: '800px',
        width: '100%',
        height: '48px',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
          transform: flipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
        }}
      >
        {/* Front */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            bgcolor: NAVY,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#fff',
            fontWeight: 700,
            fontSize: '13px',
            fontFamily: 'inherit',
          }}
        >
          {icon}
          {label}
        </Box>

        {/* Back */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
            bgcolor: color || GREEN,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#fff',
            fontWeight: 700,
            fontSize: '12px',
            fontFamily: 'monospace',
            px: 2,
            letterSpacing: '0.04em',
          }}
        >
          {data}
        </Box>
      </Box>
    </Box>
  );
};

const DirectEntry = () => {
  const [view, setView]       = useState('success');
  const [snackOpen, setSnackOpen] = useState(false);
  const cfg      = SCREENS[view];
  const IconComp = cfg.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(cfg.badgeValue).catch(() => {});
    setSnackOpen(true);
  };

  // Data shown on the back of each flip button
  const flipData = [
    `Code: ${cfg.badgeValue}`,
    `Status: ${view.toUpperCase()} | ${new Date().toLocaleDateString()}`,
  ];

  return (
    <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 72px - 48px)', display: 'flex', flexDirection: 'column' }}>

      {/* Tab bar */}
      <Box sx={{ display: 'flex', gap: '8px', mb: '28px', flexWrap: 'wrap' }}>
        {TABS.map(({ key, label }) => (
          <Button
            key={key}
            onClick={() => setView(key)}
            disableElevation
            sx={{
              textTransform: 'none',
              fontWeight: view === key ? 700 : 500,
              fontSize: '13px',
              px: '18px',
              py: '7px',
              borderRadius: '999px',
              border: view === key ? `2px solid ${GREEN}` : '2px solid #d1d5db',
              bgcolor: view === key ? GREEN : 'transparent',
              color: view === key ? '#fff' : '#6b7280',
              '&:hover': {
                bgcolor: view === key ? GREEN : '#f3f4f6',
                borderColor: view === key ? GREEN : '#9ca3af',
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      {/* Centered card */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: '32px 24px', sm: '52px 56px 48px' },
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            width: '100%',
            maxWidth: 500,
            textAlign: 'center',
            bgcolor: '#fff',
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              bgcolor: cfg.iconBg,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mx: 'auto',
              mb: '24px',
            }}
          >
            <IconComp sx={{ fontSize: 36, color: cfg.iconColor }} />
          </Box>

          {/* Title */}
          <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', mb: '8px', color: '#0f172a' }}>
            {cfg.title}
          </Typography>

          {/* Subtitle */}
          <Typography sx={{ color: '#94a3b8', fontSize: '14px', mb: '28px', lineHeight: 1.6, px: 1 }}>
            {cfg.subtitle}
          </Typography>

          {/* Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              px: '18px',
              py: '10px',
              borderRadius: '10px',
              bgcolor: cfg.badgeBg,
              border: `1px solid ${cfg.badgeBorder}`,
              mb: '36px',
            }}
          >
            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: cfg.badgeColor, fontFamily: 'monospace', letterSpacing: '0.04em' }}>
              {cfg.badgePrefix}&nbsp;{cfg.badgeValue}
            </Typography>
            {cfg.showCopy && (
              <Tooltip title="Copy code">
                <IconButton size="small" onClick={handleCopy} sx={{ color: cfg.badgeColor, p: '2px' }}>
                  <ContentCopy sx={{ fontSize: 15 }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* Flip buttons — side by side */}
          <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {cfg.buttons.map((btn, i) => (
              <FlipButton
                key={btn.action}
                label={btn.label}
                icon={btn.icon}
                data={flipData[i]}
                color={i === 0 ? '#1e3a5f' : GREEN}
              />
            ))}
          </Box>

          <Typography sx={{ mt: '12px', fontSize: '11px', color: '#cbd5e1' }}>
            Click buttons to reveal data
          </Typography>
        </Paper>
      </Box>

      {/* Show QR FAB — bottom right, green */}
      {cfg.showQr && (
        <Fab
          variant="extended"
          size="medium"
          sx={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            bgcolor: GREEN,
            color: '#fff',
            fontWeight: 700,
            fontSize: '13px',
            textTransform: 'none',
            boxShadow: '0 4px 20px rgba(80,183,72,0.4)',
            '&:hover': { bgcolor: '#3da334' },
            gap: '6px',
          }}
        >
          <QrCode2 sx={{ fontSize: 20 }} />
          Show QR
        </Fab>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message="Code copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default DirectEntry;
