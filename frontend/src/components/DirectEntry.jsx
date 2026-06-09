import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Stack, Divider
} from '@mui/material';
import { 
  CheckCircleOutline, 
  WarningAmber, 
  Block, 
  ContentCopy, 
  QrCodeScanner
} from '@mui/icons-material';

const DirectEntry = () => {
  const [view, setView] = useState('success'); // success | duplicate | restricted
  const [entryCode] = useState("VE20260608-005");

  const colors = {
    navy: '#0d1b2a',
    brandGreen: '#50B748',
    bg: '#f1f5f9'
  };

  const config = {
    success: {
      title: "Request Submitted Successfully !",
      sub: "Your visitor request has been sent for employee.",
      color: '#edf7ec',
      text: '#078930',
      badgeLabel: `Entry Code : ${entryCode}`
    },
    duplicate: {
      title: "Duplicate Request Found !",
      sub: "An active request already exists for this visitor entry profile today.",
      color: '#fffbeb',
      text: '#d97706',
      badgeLabel: `Active Code : ${entryCode}`
    },
    restricted: {
      title: "Access Request Denied !",
      sub: "This visitor credential matches the global facility restriction list configuration.",
      color: '#fef2f2',
      text: '#dc2626',
      badgeLabel: "Access Status: RESTRICTED"
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: colors.bg, width: '100%' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Dynamic State Tabs */}
        <Stack direction="row" spacing={1} sx={{ p: '12px 22px 0', bgcolor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          {['success', 'duplicate', 'restricted'].map((state) => (
            <Button 
              key={state}
              variant="text"
              onClick={() => setView(state)}
              sx={{ 
                px: 2, py: 1,
                borderRadius: '8px 8px 0 0',
                fontSize: '12px',
                textTransform: 'none',
                fontWeight: view === state ? 600 : 400,
                bgcolor: view === state ? colors.brandGreen : '#f1f5f9',
                color: view === state ? '#fff' : '#475569',
                '&:hover': { bgcolor: view === state ? '#3d9438' : '#e2e8f0' }
              }}
            >
              {state.charAt(0).toUpperCase() + state.slice(1)} Screen
            </Button>
          ))}
        </Stack>

        {/* Card Content Shell */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <Paper elevation={0} sx={{ p: '48px 52px 40px', borderRadius: '18px', border: '1px solid #e2e8f0', width: 440, maxWidth: '100%', textAlign: 'center', boxShadow: '0 6px 32px rgba(0,0,0,0.06)' }}>
            
            {/* Layered Status Ring Graphic */}
            <Box sx={{ 
              width: 72, height: 72, borderRadius: '50%', bgcolor: config[view].color, 
              display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 'auto', mb: '22px' 
            }}>
              {view === 'success' && <CheckCircleOutline sx={{ fontSize: 32, color: config[view].text }} />}
              {view === 'duplicate' && <WarningAmber sx={{ fontSize: 32, color: config[view].text }} />}
              {view === 'restricted' && <Block sx={{ fontSize: 32, color: config[view].text }} />}
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: '8px', color: '#0f172a', letterSpacing: '-0.3px', fontSize: '19px' }}>
              {config[view].title}
            </Typography>
            
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: '26px', lineHeight: 1.6, fontSize: '13px' }}>
              {config[view].sub}
            </Typography>

            {/* Custom No-Border Badge Layout */}
            <Box sx={{ 
              display: 'inline-flex', alignItems: 'center', gap: '6px', 
              bgcolor: config[view].color, color: config[view].text,
              px: '22px', py: '10px', borderRadius: '8px', mb: '28px', cursor: view === 'restricted' ? 'default' : 'pointer',
              transition: 'transform 0.1s ease', '&:hover': { transform: view !== 'restricted' ? 'scale(1.015)' : 'none' }
            }}>
              <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '12px', letterSpacing: '0.2px' }}>
                {config[view].badgeLabel}
              </Typography>
              {view !== 'restricted' && <ContentCopy sx={{ fontSize: 14 }} />}
            </Box>

            <Divider sx={{ mb: '22px', bgcolor: '#f1f5f9' }} />

            {/* Layout Row Button Packs */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button fullWidth variant="contained" sx={{ bgcolor: colors.navy, borderRadius: '9px', textTransform: 'none', fontSize: '12px', py: '11px', fontWeight: 600, '&:hover': { bgcolor: '#1a2d42' } }}>
                {view === 'restricted' ? "Contact Security Administrator" : "View Direct Entry Details"}
              </Button>
              {view !== 'restricted' && (
                <Button fullWidth variant="contained" sx={{ bgcolor: colors.navy, borderRadius: '9px', textTransform: 'none', fontSize: '12px', py: '11px', fontWeight: 600, '&:hover': { bgcolor: '#1a2d42' } }}>
                  {view === 'success' ? "Create Another Request" : "View Existing Details"}
                </Button>
              )}
            </Stack>
          </Paper>
        </Box>

        {/* Fixed Mini Floating QR Trigger */}
        <Button
          variant="contained"
          startIcon={<QrCodeScanner />}
          sx={{ 
            position: 'absolute', bottom: 22, right: 22, 
            bgcolor: colors.brandGreen, borderRadius: '22px', px: '20px', py: '9px',
            fontSize: '12px', fontWeight: 600, textTransform: 'none',
            boxShadow: '0 4px 14px rgba(80,183,72,0.3)',
            '&:hover': { bgcolor: '#3d9438' }
          }}
        >
          Show QR
        </Button>
      </Box>
    </Box>
  );
};

export default DirectEntry;