import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import DuplicateVisitorWarning from '../components/popups/DuplicateVisitorWarning';
import RestrictedVisitorAlert from '../components/popups/RestrictedVisitorAlertModal';
import RequestRejected from '../components/popups/RequestRejected';
import RequestApproved from '../components/popups/RequestApproved';

export default function PopupTestPage() {
  const [activePopup, setActivePopup] = useState(null);

  const duplicateData = {
    previousRequestCode: 'VE20260512-005',
    nic: '200456987132',
    visitorName: 'T.N.Karunarathna',
  };

  const restrictedData = {
    visitor: {
      name: 'Kasun Pradeep Jayasinghe',
      nic: '892450137V',
      country: 'Sri Lanka',
      blacklistStatus: 'Active',
      restrictionLevel: 'Tier 1 · Critical',
      addedBy: 'Corporate Security Div.',
      lastAttempt: '12 May 2026',
      reason: 'Attempted unauthorized access to data centre infrastructure (Case #SEC-2025-117).',
      riskScore: 92,
      location: 'Head Office — Lobby A',
      detectedAt: { time: '09:09:01', date: 'Sat, 16 May 2026' },
    },
    stats: { restrictedAttempts: 148, monthlyIncidents: 37, activeRestrictions: 2914, highRiskVisitors: 63 },
    incidents: [
      { dateTime: '12 May 2026 · 09:42', location: 'Head Office — Lobby A', officer: 'Lt. R. Fernando', action: 'Entry denied', severity: 'Critical', status: 'Closed' },
      { dateTime: '28 Apr 2026 · 14:18', location: 'Welikada Exchange', officer: 'Sgt. M. Perera', action: 'Detained & escorted', severity: 'High', status: 'Reported' },
    ],
  };

  const rejectedData = {
    entryCode: 'VE20260518-002',
    requestType: 'Maintenance',
    department: 'Network',
    requestedDate: '2025-05-11',
    rejectedBy: 'Duty Officer',
    rejectedDate: '2026-05-12 10:45 AM',
    reason: 'The submitted request does not meet the required approval criteria. Please review the request details and resubmit if necessary.',
  };

  const approvedData = {
    entryCode: 'VE20260513-003',
    requestType: 'Maintenance',
    department: 'Network',
    requestedDate: '2025-05-11',
    approvedBy: 'Duty Officer',
    approvalDate: '2025-05-12 · 10:45 AM',
    timeline: [
      { label: 'Request Submitted', subLabel: '2025-05-11 09:12 AM' },
      { label: 'Supervisor Approved', subLabel: '2025-05-11 04:30 PM' },
      { label: 'Duty Officer Approved', subLabel: '2025-05-12 10:45 AM' },
      { label: 'Request Completed', subLabel: 'Active now' },
    ],
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button variant="outlined" onClick={() => setActivePopup('duplicate')}>Trigger Duplicate Warning</Button>
        <Button variant="outlined" onClick={() => setActivePopup('restricted')}>Trigger Restricted Alert</Button>
        <Button variant="outlined" onClick={() => setActivePopup('rejected')}>Trigger Rejected</Button>
        <Button variant="outlined" onClick={() => setActivePopup('approved')}>Trigger Approved</Button>
      </Stack>

      <DuplicateVisitorWarning
        open={activePopup === 'duplicate'}
        data={duplicateData}
        onClose={() => setActivePopup(null)}
        onViewExistingRecord={(data) => console.log('View existing record for', data.previousRequestCode)}
      />

      <RequestRejected
        open={activePopup === 'rejected'}
        data={rejectedData}
        onClose={() => setActivePopup(null)}
        onViewTrackingDetails={(data) => console.log('Track', data.entryCode)}
      />

      <RequestApproved
        open={activePopup === 'approved'}
        data={approvedData}
        onClose={() => setActivePopup(null)}
        onViewTrackingDetails={(data) => console.log('Track', data.entryCode)}
      />

      {activePopup === 'restricted' && (
        <Box sx={{ mt: 3 }}>
          <RestrictedVisitorAlert
            visitor={restrictedData.visitor}
            stats={restrictedData.stats}
            incidents={restrictedData.incidents}
            onDenyEntry={(v) => console.log('Deny entry for', v.nic)}
            onNotifySecurity={(v) => console.log('Notify security about', v.nic)}
          />
        </Box>
      )}
    </Box>
  );
}
