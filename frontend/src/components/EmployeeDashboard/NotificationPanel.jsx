import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { COLORS } from "../theme/colors";

const Panel = styled.div`
  height: 430px;
  border-radius: 16px;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 18px 35px rgba(35, 52, 94, 0.09);
`;

const Header = styled.div`
  height: 70px;
  padding: 17px 20px;
  background: ${COLORS.navy};
  color: white;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Count = styled.div`
  width: 24px;
  height: 24px;
  background: #58d66b;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Item = styled.div`
  min-height: 71px;
  padding: 13px 18px;
  display: grid;
  grid-template-columns: 34px 1fr auto;
  gap: 12px;
  border-bottom: 1px solid #edf0f4;
  transition: 0.2s ease;

  &:hover {
    background: #f8fbff;
  }
`;

const IconCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: ${({ $theme }) => $theme.main};
  background: ${({ $theme }) => $theme.light};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterButton = styled(Button)`
  && {
    width: 100%;
    height: 38px;
    border-radius: 0;
    justify-content: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 900;
    color: ${COLORS.navy};
    text-transform: none;
    border-radius: 0 0 16px 16px;
    background: #ffffff;
    box-shadow: none;

    &:hover {
      background: #f8fbff;
    }
  }
`;

function NotificationPanel({ notifications }) {
  return (
    <Panel>
      <Header>
        <div>
          <Typography fontSize="14px" fontWeight={900}>
            Notifications
          </Typography>
          <Typography fontSize="10px" color="rgba(255,255,255,0.65)" mt="2px">
            Latest activity feed
          </Typography>
        </div>

        <Count>{notifications.length}</Count>
      </Header>

      {notifications.map((item) => {
        const theme = COLORS[item.color];
        const Icon = item.icon;

        return (
          <Item key={item.title}>
            <IconCircle $theme={theme}>
              <Icon sx={{ fontSize: 16 }} />
            </IconCircle>

            <div>
              <Typography fontSize="12px" fontWeight={900} color={COLORS.textDark}>
                {item.title}
              </Typography>
              <Typography fontSize="10px" fontWeight={500} color={COLORS.textMuted} mt="2px">
                {item.desc}
              </Typography>
            </div>

            <Typography
              fontSize="10px"
              fontWeight={600}
              color={COLORS.textMuted}
              whiteSpace="nowrap"
            >
              {item.time}
            </Typography>
          </Item>
        );
      })}

      <FooterButton variant="text" disableElevation endIcon={<ArrowForwardOutlinedIcon sx={{ fontSize: 13 }} />}>
        View all notifications
      </FooterButton>
    </Panel>
  );
}

export default NotificationPanel;
