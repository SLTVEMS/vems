import { Button, Divider, Stack } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import styled from "styled-components";

const Aside = styled.aside`
  position: fixed;
  inset: 0 auto 0 0;
  width: 264px;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding: 16px 14px 18px;
  background: #061c3f;
  color: #fff;
  overflow: hidden;
  z-index: 20;
`;

const Brand = styled.div`
  min-height: 68px;
  display: flex;
  align-items: center;
  padding: 2px 2px 20px;
  margin-bottom: 8px;
`;

const LogoImage = styled.img`
  width: 132px;
  max-height: 42px;
  display: block;
  object-fit: contain;
`;

const BrandFallback = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BrandMark = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  flex: 0 0 auto;

  span {
    position: absolute;
    display: block;
    border-radius: 6px;
  }

  span:nth-child(1) {
    width: 3px;
    height: 22px;
    left: 2px;
    top: 2px;
    background: linear-gradient(180deg, #11a7df, #5fd36f);
    transform: rotate(16deg);
  }

  span:nth-child(2) {
    width: 3px;
    height: 15px;
    left: 11px;
    top: 4px;
    background: #5fd36f;
    transform: rotate(16deg);
  }

  span:nth-child(3) {
    width: 3px;
    height: 11px;
    left: 18px;
    top: 10px;
    background: #11a7df;
    transform: rotate(16deg);
  }
`;

const BrandText = styled.div`
  display: grid;
  line-height: 1;

  strong {
    color: #5fd36f;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.02em;
  }

  small {
    margin-top: 3px;
    color: #7db5d7;
    font-size: 6px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
`;

const NavButton = styled(Button)`
  justify-content: flex-start !important;
  padding: 12px 14px !important;
  min-height: 46px;
  border-radius: 14px !important;
  font-weight: 500 !important;
  letter-spacing: 0 !important;
`;

const NavScrollArea = styled(Stack)`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 2px;
`;

const LogoutSection = styled.div`
  margin-top: auto;
`;

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "create-request", label: "Create Request", icon: <AddIcon /> },
  { id: "my-requests", label: "My Requests", icon: <DescriptionOutlinedIcon /> },
  { id: "approval-requests", label: "Approval Requests", icon: <FactCheckOutlinedIcon /> },
  { id: "pending-requests", label: "Pending Requests", icon: <HourglassTopOutlinedIcon /> },
  { id: "rejected-requests", label: "Rejected Requests", icon: <CancelOutlinedIcon /> },
  { id: "tracking-details", label: "Tracking Details", icon: <RoomOutlinedIcon /> },
];

function Sidebar({ activePage, onNavigate, onLogout }) {
  const [hasLogoImage, setHasLogoImage] = useState(true);

  return (
    <Aside>
      <Brand>
        {hasLogoImage ? (
          <LogoImage
            src="/sltmobitel-logo.png"
            alt="SLT Mobitel"
            onError={() => setHasLogoImage(false)}
          />
        ) : (
          <BrandFallback>
            <BrandMark aria-hidden="true">
              <span />
              <span />
              <span />
            </BrandMark>
            <BrandText aria-label="SLT Mobitel">
              <strong>SLTMOBITEL</strong>
              <small>The Connection</small>
            </BrandText>
          </BrandFallback>
        )}
      </Brand>

      <NavScrollArea spacing={1.25}>
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            fullWidth
            variant={activePage === item.id ? "contained" : "text"}
            color={activePage === item.id ? "primary" : "inherit"}
            startIcon={item.icon}
            onClick={() => onNavigate(item.id)}
            sx={{
              color: activePage === item.id ? "#fff" : "#b6c3d7",
              backgroundColor:
                activePage === item.id ? "#5fd36f" : "transparent",
              boxShadow:
                activePage === item.id ? "0 14px 30px rgba(95, 211, 111, 0.25)" : "none",
              "&:hover": {
                backgroundColor:
                  activePage === item.id ? "#5fd36f" : "rgba(255,255,255,0.08)",
              },
            }}
          >
            {item.label}
          </NavButton>
        ))}
      </NavScrollArea>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 2 }} />

      <LogoutSection>
        <Button
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{
            justifyContent: "flex-start",
            color: "#cfd8e7",
            borderRadius: 2,
            px: 1.5,
            py: 1.25,
          }}
        >
          Logout
        </Button>
      </LogoutSection>
    </Aside>
  );
}

export default Sidebar;