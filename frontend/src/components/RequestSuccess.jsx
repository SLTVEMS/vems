import React, { useState } from 'react';
import {
  Box, Typography, Button, Paper, Snackbar, Dialog,
  DialogTitle, DialogContent, DialogActions, Divider,
  Grid, IconButton
} from '@mui/material';
import { CheckCircle, ContentCopy, Close } from '@mui/icons-material';

const NAVY = '#0d1b2a';
const GREEN = '#50B748';

// Entry detail data shown in the flop-out dialog
const ENTRY_DETAIL = {
  'Entry Code':    'VE20260512-001',
  'Visitor Name':  'Nethmi Perera',
  'NIC Number':    '200012345678',
  'Division':      'IT Division',
  'Host Employee': 'C.M. Kulathunga',
  'Date':          'Wednesday, 10 June 2026',
  'Time':          '01:12:00',
  'Status':        'Pending Approval',
  'Gate':          'Main Entrance',
};

const RequestSuccess = ({ onCreateAnother }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [snackOpen, setSnackOpen]   = useState(false);
  const [snackMsg, setSnackMsg]     = useState('');

  const entryCode = ENTRY_DETAIL['Entry Code'];

  const toast = (msg) => { setSnackMsg(msg); setSnackOpen(true); };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(entryCode).catch(() => {});
    toast('Entry code copied to clipboard');
  };

  const handleCopyAll = () => {
    const text = Object.entries(ENTRY_DETAIL).map(([k, v]) => `${k}: ${v}`).join('\n');
    navigator.clipboard.writeText(text).catch(() => {});
    toast('Request details copied to clipboard');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 72px - 48px)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 520,
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          bgcolor: '#fff',
          p: { xs: '36px 24px', sm: '52px 60px 48px' },
          textAlign: 'center',
        }}
      >
        {/* Green check icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: '#dcfce7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: '24px',
          }}
        >
          <CheckCircle sx={{ fontSize: 40, color: '#16a34a' }} />
        </Box>

        {/* Title */}
        <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', mb: '8px' }}>
          Request Submitted Successfully!
        </Typography>

        {/* Subtitle */}
        <Typography sx={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6, mb: '32px' }}>
          Your visitor request has been sent for supervisor approval.
        </Typography>

        {/* Entry code box */}
        <Box
          onClick={handleCopyCode}
          sx={{
            border: '1.5px dashed #86efac',
            borderRadius: '12px',
            bgcolor: '#f0fdf4',
            py: '20px',
            px: '24px',
            mb: '36px',
            cursor: 'pointer',
            transition: 'all 0.15s',
            '&:hover': { bgcolor: '#dcfce7', borderColor: GREEN },
          }}
        >
          <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', letterSpacing: '0.12em', textTransform: 'uppercase', mb: '6px' }}>
            Entry Code
          </Typography>
          <Typography sx={{ fontSize: '22px', fontWeight: 900, color: '#15803d', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
            {entryCode}
          </Typography>
          <Typography sx={{ fontSize: '11px', color: '#86efac', mt: '4px' }}>
            Click to copy
          </Typography>
        </Box>

        {/* Buttons — side by side */}
        <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => setDetailOpen(true)}
            sx={{
              flex: 1,
              maxWidth: '220px',
              fontWeight: 700,
              fontSize: '13px',
              py: '12px',
              borderRadius: '10px',
              textTransform: 'none',
              borderColor: '#e2e8f0',
              color: '#334155',
              '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' },
            }}
          >
            View My Request
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={onCreateAnother}
            sx={{
              flex: 1,
              maxWidth: '220px',
              fontWeight: 700,
              fontSize: '13px',
              py: '12px',
              borderRadius: '10px',
              textTransform: 'none',
              bgcolor: NAVY,
              color: '#fff',
              '&:hover': { bgcolor: '#1e3a5f' },
            }}
          >
            Create Another Request
          </Button>
        </Box>
      </Paper>

      {/* ── Flop-out detail dialog ── */}
      <Dialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}
      >
        <DialogTitle
          sx={{
            bgcolor: NAVY,
            color: '#fff',
            fontWeight: 700,
            fontSize: '15px',
            px: '24px',
            py: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Request Details
          <IconButton size="small" onClick={() => setDetailOpen(false)} sx={{ color: '#fff' }}>
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ px: '28px', py: '24px' }}>
          <Grid container spacing={2.5}>
            {Object.entries(ENTRY_DETAIL).map(([label, value]) => (
              <Grid item xs={12} sm={6} key={label}>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', mb: '3px' }}>
                  {label}
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: '24px', py: '14px', gap: '10px' }}>
          <Button
            onClick={handleCopyAll}
            startIcon={<ContentCopy sx={{ fontSize: 15 }} />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '13px',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              px: '16px',
              py: '8px',
            }}
          >
            Copy Details
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => setDetailOpen(false)}
            sx={{
              bgcolor: NAVY,
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              px: '20px',
              py: '8px',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': { bgcolor: '#1e3a5f' },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message={snackMsg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default RequestSuccess;
