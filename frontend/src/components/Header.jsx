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
  inset: 0 0 auto;
  min-height: var(--header-height, 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 28px;
  background: linear-gradient(135deg, rgba(0, 31, 77, 0.98), rgba(4, 21, 50, 0.98) 58%, rgba(6, 28, 63, 0.98));
  color: #ffffff;
  z-index: 30;
  border-bottom: 1px solid rgba(125, 181, 215, 0.2);
  box-shadow: 0 14px 34px rgba(0, 8, 31, 0.28);
  backdrop-filter: blur(18px);

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background: linear-gradient(90deg, #5fd36f 0%, #11a7df 48%, #001f4d 100%);
  }

  @media (max-width: 1180px) {
    gap: 16px;
    padding: 0 18px;
  }

  @media (max-width: 760px) {
    min-height: var(--header-height, 76px);
    gap: 10px;
    padding: 0 12px;
  }
`;

const LeftCluster = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1 1 auto;
`;

const BrandBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`;

const LogoShell = styled.div`
  width: 292px;
  height: 62px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border-radius: 8px;
  background: rgba(7, 31, 69, 0.9);
  border: 1px solid rgba(125, 181, 215, 0.32);
  box-shadow:
    0 12px 26px rgba(0, 8, 31, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  overflow: hidden;

  @media (max-width: 940px) {
    width: 226px;
    height: 56px;
  }

  @media (max-width: 620px) {
    width: 62px;
  }
`;

const LogoImage = styled.img`
  width: 266px;
  max-height: 54px;
  display: block;
  object-fit: contain;

  @media (max-width: 940px) {
    width: 206px;
    max-height: 48px;
  }

  @media (max-width: 620px) {
    width: 48px;
    max-height: 40px;
    object-fit: contain;
    object-position: left center;
  }
`;

const BrandFallback = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  min-width: 0;

  @media (max-width: 620px) {
    gap: 0;
    padding: 0;
    justify-content: center;
  }
`;

const BrandMark = styled.div`
  position: relative;
  width: 52px;
  height: 48px;
  flex: 0 0 auto;
  border-radius: 6px;
  overflow: visible;

  span {
    position: absolute;
    display: block;
    width: 7px;
    border-radius: 999px;
    transform: rotate(28deg);
    transform-origin: center;
  }

  span:nth-child(1) {
    height: 34px;
    left: 12px;
    top: 0;
    background: #11a7df;
  }

  span:nth-child(2) {
    height: 27px;
    left: 10px;
    top: 23px;
    background: #1674d1;
  }

  span:nth-child(3) {
    width: 8px;
    height: 8px;
    left: 29px;
    top: 20px;
    background: #5fd36f;
  }

  span:nth-child(4) {
    height: 29px;
    left: 38px;
    top: 18px;
    background: #5fd36f;
  }

  @media (max-width: 940px) {
    width: 44px;
    height: 42px;

    span {
      width: 6px;
    }

    span:nth-child(1) {
      height: 29px;
      left: 10px;
      top: 0;
    }

    span:nth-child(2) {
      height: 23px;
      left: 9px;
      top: 20px;
    }

    span:nth-child(3) {
      width: 7px;
      height: 7px;
      left: 25px;
      top: 18px;
    }

    span:nth-child(4) {
      height: 25px;
      left: 32px;
      top: 17px;
    }
  }
`;

const BrandText = styled.div`
  display: grid;
  gap: 3px;
  line-height: 1;
  min-width: 0;

  strong {
    font-size: 25px;
    font-weight: 900;
    letter-spacing: 0;
    white-space: nowrap;
  }

  small {
    color: #1674d1;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
  }

  .slt {
    color: #1674d1;
  }

  .mobitel {
    color: #5fd36f;
  }

  @media (max-width: 940px) {
    strong {
      font-size: 20px;
    }

    small {
      font-size: 10px;
      letter-spacing: 0.14em;
    }
  }

  @media (max-width: 620px) {
    display: none;
  }
`;

const TitleWrap = styled.div`
  min-width: 0;
  padding-left: 16px;
  border-left: 1px solid rgba(213, 224, 239, 0.16);

  @media (max-width: 940px) {
    display: none;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 17px;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: 0;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  color: #b9cbe2;
  font-size: 12px;
  line-height: 1.25;
  font-weight: 600;
`;

const RightCluster = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  min-width: 0;
  flex: 0 1 auto;

  @media (max-width: 760px) {
    gap: 8px;
  }
`;

const DateCard = styled.div`
  min-width: 146px;
  padding: 7px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  text-align: right;
  border: 1px solid rgba(213, 224, 239, 0.16);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);

  span {
    display: block;
    color: #b9cbe2;
    font-size: 10px;
    line-height: 1.1;
    font-weight: 700;
  }

  strong {
    display: block;
    margin-top: 4px;
    color: #ffffff;
    font-size: 14px;
    line-height: 1;
    font-weight: 850;
  }

  @media (max-width: 1260px) {
    display: none;
  }
`;

const SearchWrap = styled.div`
  width: 300px;
  max-width: 30vw;

  .MuiInputBase-root {
    height: 42px;
    border-radius: 8px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.11);
    transition:
      box-shadow 160ms ease,
      background 160ms ease;
  }

  .MuiInputBase-root:hover,
  .Mui-focused {
    background: rgba(255, 255, 255, 0.16);
  }

  .MuiInputBase-input {
    font-size: 13px;
    font-weight: 600;
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
    border-color: #11a7df !important;
  }

  .Mui-focused {
    box-shadow: 0 0 0 4px rgba(17, 167, 223, 0.12);
  }

  @media (max-width: 1100px) {
    width: 220px;
    max-width: 28vw;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const ControlButton = styled(IconButton)`
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  background: rgba(255, 255, 255, 0.11) !important;
  color: #ffffff !important;
  border: 1px solid rgba(213, 224, 239, 0.16) !important;
  transition:
    transform 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease,
    border-color 160ms ease !important;

  &:hover {
    background: rgba(17, 167, 223, 0.22) !important;
    border-color: rgba(17, 167, 223, 0.48) !important;
    box-shadow: 0 12px 24px rgba(0, 8, 31, 0.24);
    transform: translateY(-1px);
  }
`;

const ProfileChip = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  max-width: 248px;
  padding: 4px 9px 4px 5px;
  border: 1px solid rgba(213, 224, 239, 0.16);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.11);
  color: #ffffff;
  cursor: pointer;
  text-align: left;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease,
    border-color 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.17);
    border-color: rgba(125, 181, 215, 0.42);
    box-shadow: 0 12px 24px rgba(0, 8, 31, 0.24);
    transform: translateY(-1px);
  }

  @media (max-width: 760px) {
    padding-right: 6px;
    gap: 6px;
  }
`;

const ProfileText = styled.div`
  display: grid;
  min-width: 0;

  strong {
    color: #ffffff;
    font-size: 12px;
    line-height: 1.15;
    font-weight: 800;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    margin-top: 2px;
    color: #b9cbe2;
    font-size: 10px;
    line-height: 1.1;
    font-weight: 650;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

const ProfileAvatar = styled(Avatar)`
  width: 32px !important;
  height: 32px !important;
  font-size: 12px !important;
  font-weight: 850 !important;
  color: #ffffff !important;
  background: linear-gradient(135deg, #001f4d, #0b86c7 58%, #5fd36f) !important;
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
                src="/sltmobitel-logo.svg"
                alt="SLT Mobitel"
                onError={() => setHasLogoImage(false)}
              />
            ) : (
              <BrandFallback>
                <BrandMark aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </BrandMark>
                <BrandText>
                  <strong>
                    <span className="slt">SLT</span>
                    <span className="mobitel">MOBITEL</span>
                  </strong>
                  <small>The Connection</small>
                </BrandText>
              </BrandFallback>
            )}
          </LogoShell>
        </BrandBlock>

        <TitleWrap>
          <Title>Employee Dashboard</Title>
          <Subtitle>Visitor Entry Management System</Subtitle>
        </TitleWrap>
      </LeftCluster>

      <RightCluster>
        <DateCard>
          <span>{now.format("dddd, DD MMM YYYY")}</span>
          <strong>{now.format("HH:mm:ss")}</strong>
        </DateCard>

        <SearchWrap>
          <TextField
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            size="small"
            placeholder="Search visitor NIC"
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

        <ProfileChip
          type="button"
          onClick={(event) => setProfileAnchor(event.currentTarget)}
          aria-label="Open user menu"
        >
          <ProfileAvatar>{initials || "CM"}</ProfileAvatar>
          <ProfileText>
            <strong>{profileName}</strong>
            <small>{user?.department ?? "Engineer, IT Division"}</small>
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
