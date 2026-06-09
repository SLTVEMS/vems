import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Avatar,
  Badge,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";

const Bar = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  min-height: var(--header-height, 78px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 26px;
  background:
    radial-gradient(circle at 16% 0%, rgba(17, 167, 223, 0.34), transparent 30%),
    linear-gradient(135deg, rgba(0, 31, 77, 0.97), rgba(4, 21, 50, 0.96) 58%, rgba(6, 28, 63, 0.98));
  color: #ffffff;
  z-index: 30;
  border-bottom: 1px solid rgba(125, 181, 215, 0.2);
  box-shadow:
    0 18px 46px rgba(0, 8, 31, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(90deg, rgba(95, 211, 111, 0.12), transparent 22%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 44%);
  }

  &::after {
    content: "";
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(17, 167, 223, 0.72), rgba(95, 211, 111, 0.54), transparent);
  }

  @media (max-width: 1200px) {
    min-height: var(--header-height, 80px);
    padding: 0 18px;
  }

  @media (max-width: 980px) {
    gap: 10px;
    padding: 0 14px;
  }
`;

const LeftCluster = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
  flex: 1 1 auto;
`;

const BrandBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 230px;
  padding-right: 22px;
  border-right: 1px solid rgba(213, 224, 239, 0.16);

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    right: 8px;
    width: 1px;
    height: 30px;
    background: linear-gradient(180deg, transparent, rgba(17, 167, 223, 0.62), rgba(95, 211, 111, 0.38), transparent);
    box-shadow: 0 0 16px rgba(17, 167, 223, 0.5);
  }

  @media (max-width: 1180px) {
    min-width: auto;
    padding-right: 16px;
  }
`;

const LogoShell = styled.div`
  position: relative;
  width: 154px;
  height: 50px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  isolation: isolate;
  background:
    linear-gradient(135deg, rgba(17, 167, 223, 0.16), rgba(0, 31, 77, 0.84) 46%, rgba(95, 211, 111, 0.14)),
    rgba(7, 31, 69, 0.9);
  border: 1px solid rgba(125, 181, 215, 0.36);
  box-shadow:
    0 18px 42px rgba(0, 8, 31, 0.34),
    0 0 0 1px rgba(17, 167, 223, 0.12),
    0 0 30px rgba(17, 167, 223, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  overflow: hidden;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease,
    background 220ms ease;

  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    z-index: -1;
    border-radius: inherit;
    background: linear-gradient(135deg, #11a7df, #1674d1 48%, #5fd36f);
    opacity: 0.56;
    filter: blur(11px);
    transition:
      opacity 220ms ease,
      filter 220ms ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 17px;
    pointer-events: none;
    background:
      linear-gradient(115deg, rgba(255, 255, 255, 0.34), transparent 26%),
      radial-gradient(circle at 18% 20%, rgba(17, 167, 223, 0.34), transparent 32%),
      radial-gradient(circle at 82% 78%, rgba(95, 211, 111, 0.24), transparent 34%);
    mix-blend-mode: screen;
    opacity: 0.82;
    transition: opacity 220ms ease;
  }

  &:hover {
    background:
      linear-gradient(135deg, rgba(17, 167, 223, 0.24), rgba(0, 31, 77, 0.88) 44%, rgba(95, 211, 111, 0.2)),
      rgba(7, 31, 69, 0.96);
    border-color: rgba(17, 167, 223, 0.64);
    box-shadow:
      0 22px 50px rgba(0, 8, 31, 0.42),
      0 0 0 1px rgba(95, 211, 111, 0.22),
      0 0 42px rgba(17, 167, 223, 0.3),
      0 0 30px rgba(95, 211, 111, 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(-2px) scale(1.015);
  }

  &:hover::before {
    opacity: 0.82;
    filter: blur(13px);
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 1180px) {
    width: 136px;
  }

  @media (max-width: 980px) {
    width: 118px;
    height: 46px;
  }
`;

const LogoImage = styled.img`
  position: relative;
  z-index: 1;
  width: 126px;
  max-height: 36px;
  display: block;
  object-fit: contain;
  filter:
    drop-shadow(0 0 7px rgba(17, 167, 223, 0.34))
    drop-shadow(0 5px 10px rgba(0, 8, 31, 0.28));
  transform: translateZ(0);
  transition:
    filter 220ms ease,
    transform 220ms ease;

  ${LogoShell}:hover & {
    filter:
      drop-shadow(0 0 10px rgba(17, 167, 223, 0.5))
      drop-shadow(0 0 8px rgba(95, 211, 111, 0.28))
      drop-shadow(0 7px 12px rgba(0, 8, 31, 0.34));
    transform: scale(1.025);
  }

  @media (max-width: 1180px) {
    width: 112px;
  }

  @media (max-width: 980px) {
    width: 98px;
  }
`;

const BrandFallback = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BrandMark = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  flex: 0 0 auto;

  span {
    position: absolute;
    display: block;
    border-radius: 6px;
  }

  span:nth-child(1) {
    width: 3px;
    height: 20px;
    left: 2px;
    top: 2px;
    background: linear-gradient(180deg, #11a7df, #1674d1 46%, #5fd36f);
    box-shadow: 0 0 10px rgba(17, 167, 223, 0.5);
    transform: rotate(16deg);
  }

  span:nth-child(2) {
    width: 3px;
    height: 14px;
    left: 10px;
    top: 4px;
    background: linear-gradient(180deg, #5fd36f, #11a7df);
    box-shadow: 0 0 10px rgba(95, 211, 111, 0.44);
    transform: rotate(16deg);
  }

  span:nth-child(3) {
    width: 3px;
    height: 10px;
    left: 17px;
    top: 10px;
    background: linear-gradient(180deg, #1674d1, #11a7df);
    box-shadow: 0 0 10px rgba(17, 167, 223, 0.46);
    transform: rotate(16deg);
  }
`;

const BrandText = styled.div`
  display: grid;
  line-height: 1;

  strong {
    color: #43d16f;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.02em;
    text-shadow:
      0 0 12px rgba(67, 209, 111, 0.44),
      0 0 18px rgba(95, 211, 111, 0.22),
      0 2px 8px rgba(0, 8, 31, 0.34);
    transition:
      color 180ms ease,
      text-shadow 180ms ease;
  }

  small {
    margin-top: 3px;
    color: #9dd9ff;
    font-size: 6px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
`;

const MainCopy = styled.div`
  min-width: 0;
  display: grid;
  gap: 3px;

  @media (max-width: 980px) {
    display: none;
  }
`;

const TitleWrap = styled.div`
  min-width: 0;
  display: grid;
  gap: 3px;
`;

const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 18px;
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: 0;
  text-shadow: 0 6px 18px rgba(0, 8, 31, 0.3);
`;

const Subtitle = styled.p`
  margin: 0;
  color: #b9cbe2;
  font-size: 11px;
  line-height: 1.3;
  font-weight: 650;

  @media (max-width: 1120px) {
    display: none;
  }
`;

const FutureNavSpace = styled.nav`
  flex: 1 1 180px;
  min-width: 48px;
  height: 40px;
  border-left: 1px solid rgba(213, 224, 239, 0.12);
  opacity: 0.65;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 18px;
    left: 18px;
    width: min(170px, 52%);
    height: 4px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(17, 167, 223, 0.52), rgba(95, 211, 111, 0.32), transparent);
  }

  @media (max-width: 1120px) {
    display: none;
  }
`;

const RightCluster = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  flex-wrap: nowrap;

  @media (max-width: 1240px) {
    gap: 8px;
  }
`;

const DateCard = styled.div`
  min-width: 136px;
  padding: 7px 12px 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  text-align: center;
  border: 1px solid rgba(213, 224, 239, 0.16);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);

  span {
    display: block;
    color: #b9cbe2;
    font-size: 10px;
    line-height: 1.1;
  }

  strong {
    display: block;
    margin-top: 4px;
    font-size: 14px;
    line-height: 1;
    font-weight: 800;
  }

  @media (max-width: 1260px) {
    display: none;
  }
`;

const SearchWrap = styled.div`
  width: 260px;
  max-width: 24vw;

  .MuiInputBase-root {
    height: 44px;
    border-radius: 14px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.11);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    transition:
      box-shadow 160ms ease,
      border-color 160ms ease,
      background 160ms ease,
      transform 160ms ease;
  }

  .MuiInputBase-root:hover,
  .Mui-focused {
    background: rgba(255, 255, 255, 0.16);
    transform: translateY(-1px);
  }

  .MuiInputBase-input::placeholder {
    color: rgba(213, 224, 239, 0.78);
    opacity: 1;
  }

  .MuiInputAdornment-root,
  .MuiSvgIcon-root {
    color: #9dd9ff;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(213, 224, 239, 0.18);
  }

  .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline,
  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: rgba(17, 167, 223, 0.82) !important;
  }

  .Mui-focused {
    box-shadow:
      0 0 0 4px rgba(17, 167, 223, 0.14),
      0 16px 32px rgba(0, 8, 31, 0.2);
  }

  @media (min-width: 1280px) {
    width: 300px;
  }

  @media (max-width: 1040px) {
    width: 188px;
    max-width: 28vw;
  }

  @media (max-width: 980px) {
    width: 168px;
    max-width: 24vw;
  }
`;

const ControlButton = styled(IconButton)`
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.11) !important;
  color: #ffffff !important;
  border: 1px solid rgba(213, 224, 239, 0.16) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  transition:
    transform 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease,
    border-color 160ms ease !important;

  &:hover {
    background: rgba(17, 167, 223, 0.22) !important;
    border-color: rgba(17, 167, 223, 0.48) !important;
    box-shadow:
      0 16px 34px rgba(0, 8, 31, 0.28),
      0 0 0 4px rgba(17, 167, 223, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProfileChip = styled.button`
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 44px;
  padding: 4px 10px 4px 6px;
  border: 1px solid rgba(213, 224, 239, 0.16);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.11);
  color: #ffffff;
  cursor: pointer;
  text-align: left;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease,
    border-color 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.17);
    border-color: rgba(125, 181, 215, 0.42);
    box-shadow:
      0 16px 34px rgba(0, 8, 31, 0.26),
      0 0 0 4px rgba(17, 167, 223, 0.08);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProfileText = styled.div`
  display: grid;
  min-width: 0;

  strong {
    font-size: 12px;
    line-height: 1.15;
    font-weight: 800;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    margin-top: 2px;
    font-size: 9px;
    line-height: 1.1;
    font-weight: 700;
    color: #b9cbe2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const ProfileAvatar = styled(Avatar)`
  width: 32px !important;
  height: 32px !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  color: #001f4d !important;
  background: linear-gradient(135deg, #d9f3ff, #5fd36f) !important;
  box-shadow: 0 8px 18px rgba(0, 8, 31, 0.2);
`;

function Header({
  user,
  unreadCount,
  searchValue,
  onSearchChange,
  onOpenNotifications,
  onLogout,
}) {
  const [now, setNow] = useState(() => dayjs());
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [hasLogoImage, setHasLogoImage] = useState(true);
  const profileName = user?.name ?? "C.M.Kulathunga";
  const initials = profileName
    .split(/[.\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(dayjs()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Bar>
      <LeftCluster>
        <BrandBlock aria-label="SLT Mobitel">
          <LogoShell>
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
                <BrandText>
                  <strong>SLTMOBITEL</strong>
                  <small>The Connection</small>
                </BrandText>
              </BrandFallback>
            )}
          </LogoShell>
        </BrandBlock>
        <MainCopy>
          <TitleWrap>
            <Title>Employee Dashboard</Title>
            <Subtitle>
              Visitor Entry Management System
            </Subtitle>
          </TitleWrap>
        </MainCopy>
        <FutureNavSpace aria-label="Future navigation area" />
      </LeftCluster>

      <RightCluster>
        <DateCard>
          <span>{now.format("dddd, DD MMMM YYYY")}</span>
          <strong>{now.format("HH:mm:ss")}</strong>
        </DateCard>

        <SearchWrap>
          <TextField
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            size="small"
            placeholder="Search Visitor NIC"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </SearchWrap>

        <Tooltip title="Notifications">
          <ControlButton onClick={onOpenNotifications} aria-label="Open notifications">
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsOutlinedIcon fontSize="small" />
            </Badge>
          </ControlButton>
        </Tooltip>

        <ProfileChip onClick={(event) => setProfileAnchor(event.currentTarget)}>
          <ProfileAvatar>{initials || "CM"}</ProfileAvatar>
          <ProfileText>
            <strong>{profileName}</strong>
            <small>{user?.department ?? "Engineer.IT Division"}</small>
          </ProfileText>
          <KeyboardArrowDownIcon fontSize="small" />
        </ProfileChip>

        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={() => setProfileAnchor(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setProfileAnchor(null)}>Settings</MenuItem>
          <MenuItem
            onClick={() => {
              setProfileAnchor(null);
              onLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </RightCluster>
    </Bar>
  );
}

export default Header;
