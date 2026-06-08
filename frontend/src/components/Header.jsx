import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Badge,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";

const Bar = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 264px;
  min-height: var(--header-height, 72px);
  width: calc(100% - 264px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #001f4d;
  color: #ffffff;
  z-index: 30;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 1200px) {
    min-height: var(--header-height, 80px);
  }

  @media (max-width: 900px) {
    left: 0;
    width: 100%;
  }
`;

const LeftCluster = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

const MainCopy = styled.div`
  min-width: 0;
  padding: 12px 20px 10px 24px;
  display: flex;
  align-items: center;
`;

const MobileMenuButton = styled(IconButton)`
  margin-left: 10px !important;
  color: #ffffff !important;

  @media (min-width: 901px) {
    display: none !important;
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
  font-size: 17px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: 0;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #d5e0ef;
  font-size: 11px;
  line-height: 1.3;
  font-weight: 500;
`;

const RightCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px 10px 0;
  flex-wrap: nowrap;

  @media (max-width: 1240px) {
    gap: 8px;
  }
`;

const DateCard = styled.div`
  min-width: 154px;
  padding: 7px 12px 6px;
  border-radius: 16px;
  background: #ffffff;
  color: #0d1b2f;
  text-align: center;
  box-shadow: 0 10px 22px rgba(0, 8, 31, 0.18);

  span {
    display: block;
    color: #74839a;
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
`;

const SearchWrap = styled.div`
  width: 178px;
  max-width: 22vw;

  .MuiInputBase-root {
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 10px 22px rgba(0, 8, 31, 0.18);
  }

  @media (min-width: 1280px) {
    width: 226px;
  }
`;

const ControlButton = styled(IconButton)`
  width: 38px;
  height: 38px;
  background: #ffffff !important;
  color: #0d1b2f !important;
  box-shadow: 0 10px 22px rgba(0, 8, 31, 0.18);

  &:hover {
    background: #eef4ff !important;
  }
`;

const ProfileChip = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 38px;
  padding: 4px 10px 4px 12px;
  border: 0;
  border-radius: 999px;
  background: #ffffff;
  color: #0d1b2f;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(0, 8, 31, 0.18);
  text-align: left;

  &:hover {
    background: #f8fbff;
  }
`;

const ProfileText = styled.div`
  display: grid;
  min-width: 0;

  strong {
    font-size: 11px;
    line-height: 1.15;
    font-weight: 800;
    color: #0d1b2f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    font-size: 8px;
    line-height: 1.1;
    font-weight: 700;
    color: #5f7089;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function Header({
  user,
  unreadCount,
  searchValue,
  onSearchChange,
  onOpenNotifications,
  onOpenSidebar,
  onLogout,
}) {
  const [now, setNow] = useState(() => dayjs());
  const [profileAnchor, setProfileAnchor] = useState(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(dayjs()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Bar>
      <LeftCluster>
        <MobileMenuButton onClick={onOpenSidebar} aria-label="Open sidebar">
          <MenuIcon />
        </MobileMenuButton>
        <MainCopy>
          <TitleWrap>
            <Title>Employee Dashboard</Title>
            <Subtitle>
              Welcome back, C.M.Kulathunga - here&apos;s what&apos;s happening across your gates today.
            </Subtitle>
          </TitleWrap>
        </MainCopy>
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

        <Tooltip title="Refresh time">
          <ControlButton onClick={() => setNow(dayjs())} aria-label="Refresh date and time">
            <RefreshIcon fontSize="small" />
          </ControlButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <ControlButton onClick={onOpenNotifications} aria-label="Open notifications">
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsOutlinedIcon fontSize="small" />
            </Badge>
          </ControlButton>
        </Tooltip>

        <ProfileChip onClick={(event) => setProfileAnchor(event.currentTarget)}>
          <ProfileText>
            <strong>{user?.name ?? "C.M.Kulathunga"}</strong>
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
