import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { COLORS } from "../theme/colors";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  margin-top: 28px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  min-height: 184px;
  padding: 20px 20px 18px;
  border-radius: 16px;
  background: ${({ $theme }) => $theme.bg};
  border: 1px solid ${({ $theme }) => $theme.border};
  box-shadow: 0 16px 30px ${({ $theme }) => $theme.shadow};
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 38px ${({ $theme }) => $theme.shadow};
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
`;

const IconBox = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 13px;
  background: ${({ $theme }) => $theme.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 18px ${({ $theme }) => $theme.shadow};
`;

const Badge = styled.span`
  display: inline-flex;
  margin-top: 8px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 800;
  color: ${({ $theme }) => $theme.main};
  background: ${({ $theme }) => $theme.light};
`;

const StatValue = styled(Typography)`
  font-size: 20px !important;
  font-weight: 900 !important;
  color: ${COLORS.textDark} !important;
  line-height: 1.05 !important;
  margin-top: 12px !important;
`;

const CardButton = styled(Button)`
  && {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 18px;
    border-radius: 10px;
    height: 34px;
    padding: 0 14px;
    background: ${({ $theme }) => $theme.main};
    color: white;
    font-size: 10px;
    font-weight: 800;
    display: inline-flex;
    justify-content: space-between;
    box-shadow: 0 9px 18px ${({ $theme }) => $theme.shadow};
    text-transform: none;
    align-items: center;
    min-width: 0;

    &:hover {
      filter: brightness(0.96);
      transform: translateY(-1px);
      background: ${({ $theme }) => $theme.main};
    }
  }
`;

function StatsCards({ cards }) {
  return (
    <Grid>
      {cards.map((card) => {
        const theme = COLORS[card.color];
        const Icon = card.icon;

        return (
          <Card key={card.title} $theme={theme}>
            <TopRow>
              <div>
                <Typography
                  fontSize="10px"
                  fontWeight={800}
                  letterSpacing="0.6px"
                  color="#5f6c7f"
                  textTransform="uppercase"
                >
                  {card.title}
                </Typography>

                <StatValue>{card.value}</StatValue>

                <Badge $theme={theme}>{card.badge}</Badge>
              </div>

              <IconBox $theme={theme}>
                <Icon sx={{ fontSize: 19 }} />
              </IconBox>
            </TopRow>

            <CardButton
              $theme={theme}
              variant="contained"
              disableElevation
              endIcon={<ArrowOutwardOutlinedIcon sx={{ fontSize: 13 }} />}
            >
              {card.buttonText}
            </CardButton>
          </Card>
        );
      })}
    </Grid>
  );
}

export default StatsCards;
