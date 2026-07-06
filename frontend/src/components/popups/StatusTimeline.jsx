import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

/**
 * StatusTimeline
 * Shared horizontal stepper used by RequestRejected and RequestApproved.
 * `steps` is an array of { label, subLabel?, state } where state is
 * 'done' | 'rejected' | 'pending'.
 *
 * Sizing uses clamp() tied to viewport height so it scales alongside the
 * parent dialog instead of using fixed px values (see RequestApproved.jsx
 * for the full explanation of why).
 *
 * Column width is a fixed (non-shrinking) value and each connecting line
 * has a guaranteed minWidth + flexShrink: 0, so the lines can never be
 * squeezed down to invisible/zero width the way they were before.
 */
export default function StatusTimeline({ steps }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const circleColor =
          step.state === 'done' ? '#1AA152' : step.state === 'rejected' ? '#E5312F' : '#D0D5DD';
        const lineColor =
          step.state === 'pending' ? '#D0D5DD' : circleColor;

        return (
          <React.Fragment key={step.label}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'clamp(58px, 11vh, 90px)', flexShrink: 0 }}>
              <Box
                sx={{
                  width: 'clamp(22px, 4.5vh, 32px)',
                  height: 'clamp(22px, 4.5vh, 32px)',
                  borderRadius: '50%',
                  bgcolor: step.state === 'pending' ? '#fff' : circleColor,
                  border: step.state === 'pending' ? `2px solid ${circleColor}` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                {step.state === 'done' && <CheckIcon sx={{ fontSize: 'clamp(12px, 2.4vh, 18px)' }} />}
                {step.state === 'rejected' && <CloseIcon sx={{ fontSize: 'clamp(12px, 2.4vh, 18px)' }} />}
              </Box>
              <Typography sx={{ fontWeight: 700, mt: 0.75, textAlign: 'center', lineHeight: 1.2, fontSize: 'clamp(0.6rem, 1.15vh, 0.75rem)' }}>
                {step.label}
              </Typography>
              {step.subLabel && (
                <Typography sx={{ color: '#8A93A3', textAlign: 'center', lineHeight: 1.2, fontSize: 'clamp(0.54rem, 1vh, 0.68rem)' }}>
                  {step.subLabel}
                </Typography>
              )}
            </Box>
            {!isLast && (
              <Box sx={{ flex: '1 1 auto', minWidth: 10, height: 2, bgcolor: lineColor, mt: 'clamp(11px, 2.25vh, 16px)' }} />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
}

StatusTimeline.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
      state: PropTypes.oneOf(['done', 'rejected', 'pending']).isRequired,
    })
  ).isRequired,
};
