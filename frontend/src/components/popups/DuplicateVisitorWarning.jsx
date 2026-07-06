import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { colors } from './theme';

/**
 * DuplicateVisitorWarning
 *
 * Data-transfer pattern: this component receives everything it displays
 * through the `data` prop (passed down from a parent/controller). It never
 * fetches or owns that data itself — the parent is the single source of
 * truth, and this is a "dumb" presentational popup.
 *
 * Usage:
 *   <DuplicateVisitorWarning
 *     open={open}
 *     data={{
 *       previousRequestCode: 'VE20260512-005',
 *       nic: '200456987132',
 *       visitorName: 'T.N.Karunarathna',
 *     }}
 *     onClose={() => setOpen(false)}
 *     onViewExistingRecord={(data) => navigate(`/requests/${data.previousRequestCode}`)}
 *   />
 */
export default function DuplicateVisitorWarning({
  open,
  data,
  onClose,
  onViewExistingRecord,
}) {
  const { previousRequestCode, nic, visitorName } = data;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          borderTop: `5px solid ${colors.warningIcon}`,
          p: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', px: 3, pt: 3, pb: 3, textAlign: 'center' }}>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: 'absolute', top: 0, right: 0 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF6E0 0%, #FCE3AE 100%)',
            border: '4px solid #F0B94D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            boxSizing: 'border-box',
          }}
        >
          <WarningIcon sx={{ fontSize: 40, color: '#FFB300' }} />
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: colors.warningText, mb: 2 }}
        >
          Duplicate Visitor Pass Detected
        </Typography>

        <Typography variant="body2" sx={{ color: colors.slate, mb: 0.5 }}>
          PREVIOUS REQUEST CODE: {previousRequestCode}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.slate, mb: 0.5 }}>
          NIC: {nic}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.slate, mb: 2 }}>
          VISITOR NAME: {visitorName}
        </Typography>

        <Divider sx={{ width: 60, mx: 'auto', mb: 2 }} />

        <Box
          sx={{
            bgcolor: colors.warningBg,
            border: `1px solid ${colors.warningBorder}`,
            borderRadius: 0,
            p: 2,
            textAlign: 'left',
            mb: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: '#7A5A15' }}>
            An approved visitor request already exists for this visitor on
            the selected date. The entered NIC matches an existing approved
            visitor request. Please review the existing request before
            proceeding. Multiple visitor requests for the same visitor on
            the same date are not permitted.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={onClose}
            sx={{ borderRadius: 0, textTransform: 'none', fontWeight: 600 }}
          >
            OK &ndash; Return to Form
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<DescriptionOutlinedIcon />}
            onClick={() => onViewExistingRecord?.(data)}
            sx={{
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: '#1B4B91',
              '&:hover': { bgcolor: '#163C74' },
            }}
          >
            View Existing Record
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

DuplicateVisitorWarning.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    previousRequestCode: PropTypes.string.isRequired,
    nic: PropTypes.string.isRequired,
    visitorName: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onViewExistingRecord: PropTypes.func,
};
