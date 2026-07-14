import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { colors } from './theme';
import StatusTimeline from './StatusTimeline';

/**
 * RequestRejected
 *
 * All content comes from the `data` prop, passed down from whichever
 * screen triggered the popup (e.g. after polling a request-status
 * endpoint and getting a "rejected" response back).
 *
 * IMPORTANT: sizing below uses CSS clamp() tied to viewport height (vh)
 * rather than fixed px values — see RequestApproved.jsx for the full
 * explanation. This lets the dialog scale itself to fit whatever screen
 * it's shown on without ever needing to scroll.
 *
 * Usage:
 *   <RequestRejected
 *     open={open}
 *     data={{
 *       entryCode: 'VE20260518-002',
 *       requestType: 'Maintenance',
 *       department: 'Network',
 *       requestedDate: '2025-05-11',
 *       rejectedBy: 'Duty Officer',
 *       rejectedDate: '2026-05-12 10:45 AM',
 *       reason: 'The submitted request does not meet the required approval criteria. Please review the request details and resubmit if necessary.',
 *     }}
 *     onClose={() => setOpen(false)}
 *     onViewTrackingDetails={(data) => navigate(`/requests/${data.entryCode}/tracking`)}
 *   />
 */
export default function RequestRejected({ open, data, onClose, onViewTrackingDetails }) {
  const { entryCode, requestType, department, requestedDate, rejectedBy, rejectedDate, reason } = data;

  const steps = [
    { label: 'Request', subLabel: 'Submitted', state: 'done' },
    { label: 'Supervisor', subLabel: 'Approved', state: 'done' },
    { label: 'Duty Officer', subLabel: 'Rejected', state: 'rejected' },
    { label: 'Request Closed', state: 'pending' },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, maxHeight: '96vh' } }}
    >
      <Box sx={{ position: 'relative', p: 'clamp(14px, 3vh, 28px)' }}>
        <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box sx={{ textAlign: 'center', mb: 'clamp(8px, 1.6vh, 20px)' }}>
          <Box
            sx={{
              width: 'clamp(40px, 8vh, 72px)',
              height: 'clamp(40px, 8vh, 72px)',
              borderRadius: '50%',
              bgcolor: colors.rejectRed,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 'clamp(6px, 1.2vh, 12px)',
            }}
          >
            <CloseIcon sx={{ color: '#fff', fontSize: 'clamp(20px, 4vh, 36px)' }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: 'clamp(1.05rem, 2.4vh, 1.5rem)' }}>
            Request Rejected
          </Typography>
          <Typography sx={{ color: colors.slate, mt: 0.5, fontSize: 'clamp(0.72rem, 1.5vh, 0.875rem)' }}>
            The request has been reviewed and was not approved.
          </Typography>
        </Box>

        <Typography sx={{ color: colors.slate, fontWeight: 700, fontSize: 'clamp(0.62rem, 1.2vh, 0.75rem)' }}>
          REQUEST SUMMARY
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(6px, 1.2vh, 16px)',
            mt: 'clamp(4px, 1vh, 8px)',
            mb: 'clamp(8px, 1.6vh, 20px)',
          }}
        >
          {[
            ['ENTRY CODE', entryCode],
            ['REQUEST TYPE', requestType],
            ['DEPARTMENT', department],
            ['REQUESTED DATE', requestedDate],
          ].map(([label, value]) => (
            <Box
              key={label}
              sx={{
                border: `1px solid ${colors.border}`,
                borderRadius: 0,
                p: 'clamp(6px, 1.3vh, 16px)',
              }}
            >
              <Typography sx={{ color: colors.slate, fontSize: 'clamp(0.6rem, 1.2vh, 0.72rem)' }}>{label}</Typography>
              <Typography sx={{ fontWeight: 700, mt: 0.4, fontSize: 'clamp(0.78rem, 1.6vh, 1rem)' }}>{value}</Typography>
            </Box>
          ))}
        </Box>

        <Typography sx={{ color: colors.slate, fontWeight: 700, fontSize: 'clamp(0.62rem, 1.2vh, 0.75rem)' }}>
          REJECTION DETAILS
        </Typography>
        <Box
          sx={{
            border: `1px solid ${colors.rejectRedBorder}`,
            bgcolor: colors.rejectRedBg,
            borderRadius: 0,
            p: 'clamp(8px, 1.6vh, 16px)',
            mt: 'clamp(4px, 1vh, 8px)',
            mb: 'clamp(8px, 1.6vh, 20px)',
          }}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 'clamp(6px, 1.2vh, 12px)' }}>
            <Box>
              <Typography sx={{ color: colors.slate, fontSize: 'clamp(0.6rem, 1.2vh, 0.72rem)' }}>REJECTED BY</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 'clamp(0.78rem, 1.6vh, 1rem)' }}>{rejectedBy}</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: colors.slate, fontSize: 'clamp(0.6rem, 1.2vh, 0.72rem)' }}>REJECTED DATE</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 'clamp(0.78rem, 1.6vh, 1rem)' }}>{rejectedDate}</Typography>
            </Box>
          </Box>
          <Typography sx={{ color: colors.slate, fontSize: 'clamp(0.6rem, 1.2vh, 0.72rem)' }}>REASON FOR REJECTION</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
            <WarningAmberIcon sx={{ color: colors.rejectRed, fontSize: 'clamp(14px, 2.4vh, 18px)', mt: 0.2 }} />
            <Typography sx={{ fontStyle: 'italic', fontSize: 'clamp(0.72rem, 1.5vh, 0.875rem)' }}>
              &ldquo;{reason}&rdquo;
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ color: colors.slate, fontWeight: 700, fontSize: 'clamp(0.62rem, 1.2vh, 0.75rem)' }}>
          STATUS TIMELINE
        </Typography>
        <Box sx={{ mt: 'clamp(4px, 1vh, 12px)', mb: 'clamp(8px, 1.6vh, 20px)' }}>
          <StatusTimeline steps={steps} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: colors.ink,
              borderColor: colors.border,
              borderRadius: 0,
              px: 2.5,
              py: 'clamp(4px, 1vh, 8px)',
              fontSize: 'clamp(0.75rem, 1.5vh, 0.875rem)',
              '&:hover': { borderColor: colors.ink, bgcolor: 'transparent' },
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => onViewTrackingDetails?.(data)}
            sx={{
              bgcolor: '#0B1B33',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 0,
              px: 2.75,
              py: 'clamp(4px, 1vh, 8px)',
              fontSize: 'clamp(0.75rem, 1.5vh, 0.875rem)',
              '&:hover': { bgcolor: '#050E1B' },
            }}
          >
            View Tracking Details
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

RequestRejected.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    entryCode: PropTypes.string.isRequired,
    requestType: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    requestedDate: PropTypes.string.isRequired,
    rejectedBy: PropTypes.string.isRequired,
    rejectedDate: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onViewTrackingDetails: PropTypes.func,
};
