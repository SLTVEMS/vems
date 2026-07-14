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
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { colors } from './theme';
import StatusTimeline from './StatusTimeline';

/**
 * RequestApproved
 *
 * All content comes from the `data` prop, passed down from whichever
 * screen triggered the popup (e.g. after polling a request-status
 * endpoint and getting an "approved" response back).
 *
 * IMPORTANT: sizing below uses CSS clamp() tied to viewport height (vh)
 * rather than fixed px values. This means the whole dialog scales itself
 * to fit whatever screen it's shown on: full, spacious sizing on a tall
 * window, automatically shrinking on a short one — so it never needs to
 * scroll, without needing to hand-tune pixel values for every screen.
 *
 * Usage:
 *   <RequestApproved
 *     open={open}
 *     data={{
 *       entryCode: 'VE20260513-003',
 *       requestType: 'Maintenance',
 *       department: 'Network',
 *       requestedDate: '2025-05-11',
 *       approvedBy: 'Duty Officer',
 *       approvalDate: '2025-05-12 · 10:45 AM',
 *       timeline: [
 *         { label: 'Request Submitted', subLabel: '2025-05-11 09:12 AM' },
 *         { label: 'Supervisor Approved', subLabel: '2025-05-11 04:30 PM' },
 *         { label: 'Duty Officer Approved', subLabel: '2025-05-12 10:45 AM' },
 *         { label: 'Request Completed', subLabel: 'Active now' },
 *       ],
 *     }}
 *     onClose={() => setOpen(false)}
 *     onViewTrackingDetails={(data) => navigate(`/requests/${data.entryCode}/tracking`)}
 *   />
 */
export default function RequestApproved({ open, data, onClose, onViewTrackingDetails }) {
  const { entryCode, requestType, department, requestedDate, approvedBy, approvalDate, timeline } = data;

  const steps = (timeline ?? []).map((t) => ({ ...t, state: 'done' }));

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
              bgcolor: colors.approveGreen,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 'clamp(6px, 1.2vh, 12px)',
            }}
          >
            <CheckIcon sx={{ color: '#fff', fontSize: 'clamp(20px, 4vh, 36px)' }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: 'clamp(1.05rem, 2.4vh, 1.5rem)' }}>
            Request Approved
          </Typography>
          <Typography sx={{ color: colors.slate, mt: 0.5, fontSize: 'clamp(0.72rem, 1.5vh, 0.875rem)' }}>
            Your request has been successfully reviewed and approved.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(6px, 1.2vh, 16px)',
            mb: 'clamp(8px, 1.6vh, 20px)',
          }}
        >
          {[
            ['ENTRY CODE', entryCode, <DescriptionOutlinedIcon key="i" sx={{ fontSize: 'clamp(13px, 2vh, 18px)' }} />],
            ['REQUEST TYPE', requestType, <BuildOutlinedIcon key="i" sx={{ fontSize: 'clamp(13px, 2vh, 18px)' }} />],
            ['DEPARTMENT', department, <ApartmentOutlinedIcon key="i" sx={{ fontSize: 'clamp(13px, 2vh, 18px)' }} />],
            ['REQUESTED DATE', requestedDate, <CalendarTodayOutlinedIcon key="i" sx={{ fontSize: 'clamp(13px, 2vh, 18px)' }} />],
          ].map(([label, value, icon]) => (
            <Box
              key={label}
              sx={{
                border: `1px solid ${colors.border}`,
                borderRadius: 0,
                p: 'clamp(6px, 1.3vh, 16px)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: colors.slate }}>
                {icon}
                <Typography sx={{ fontSize: 'clamp(0.6rem, 1.2vh, 0.72rem)' }}>{label}</Typography>
              </Box>
              <Typography sx={{ fontWeight: 700, mt: 0.4, fontSize: 'clamp(0.78rem, 1.6vh, 1rem)' }}>{value}</Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            border: `1px solid ${colors.approveGreenBorder}`,
            bgcolor: colors.approveGreenBg,
            borderRadius: 0,
            p: 'clamp(8px, 1.6vh, 16px)',
            mb: 'clamp(8px, 1.6vh, 20px)',
            display: 'flex',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 'clamp(20px, 4vh, 32px)',
              height: 'clamp(20px, 4vh, 32px)',
              borderRadius: '50%',
              bgcolor: colors.approveGreen,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <HowToRegIcon sx={{ color: '#fff', fontSize: 'clamp(12px, 2.2vh, 18px)' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ color: colors.slate, fontSize: 'clamp(0.6rem, 1.2vh, 0.72rem)' }}>APPROVED BY</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 'clamp(0.78rem, 1.6vh, 1rem)' }}>{approvedBy}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ color: colors.slate, fontSize: 'clamp(0.6rem, 1.2vh, 0.72rem)' }}>APPROVAL DATE</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 'clamp(0.78rem, 1.6vh, 1rem)' }}>{approvalDate}</Typography>
              </Box>
            </Box>
            <Typography sx={{ mt: 0.6, fontSize: 'clamp(0.68rem, 1.4vh, 0.875rem)' }}>
              The request has met all approval requirements and has been successfully authorized.
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ color: colors.slate, fontWeight: 700, fontSize: 'clamp(0.62rem, 1.2vh, 0.75rem)' }}>
          APPROVAL PROGRESS
        </Typography>
        <Box sx={{ mt: 'clamp(4px, 1vh, 12px)', mb: 'clamp(8px, 1.6vh, 20px)' }}>
          <StatusTimeline steps={steps} />
        </Box>

        <Box
          sx={{
            bgcolor: colors.approveGreenBg,
            border: `1px solid ${colors.approveGreenBorder}`,
            borderRadius: 0,
            p: 'clamp(8px, 1.6vh, 16px)',
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            mb: 'clamp(8px, 1.6vh, 20px)',
          }}
        >
          <Box sx={{ fontSize: 'clamp(15px, 2.5vh, 22px)', lineHeight: 1 }} aria-hidden>🎉</Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 'clamp(0.78rem, 1.6vh, 1rem)' }}>Request Successfully Approved</Typography>
            <Typography sx={{ color: colors.slate, fontSize: 'clamp(0.68rem, 1.4vh, 0.875rem)' }}>
              The request is now active and all related stakeholders have been notified.
            </Typography>
          </Box>
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
            endIcon={<ArrowForwardIcon />}
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

RequestApproved.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    entryCode: PropTypes.string.isRequired,
    requestType: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    requestedDate: PropTypes.string.isRequired,
    approvedBy: PropTypes.string.isRequired,
    approvalDate: PropTypes.string.isRequired,
    timeline: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string.isRequired, subLabel: PropTypes.string })
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onViewTrackingDetails: PropTypes.func,
};
