import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const StatsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  margin-bottom: 42px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Box)`
  min-height: 118px;
  padding: 26px 28px;
  background: #ffffff;
  border: 1px solid #d9e1ea;
  border-radius: 18px;
  box-shadow: 0 5px 12px rgba(15, 23, 42, 0.08);
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
  }
`;

const colorMap = {
  green: "#1eb84f",
  dark: "#071c3d",
  orange: "#ff8a00",
  red: "#ff0000",
};

const RequestStats = ({ stats }) => {
  return (
    <StatsGrid>
      {stats.map((item, index) => (
        <StatCard key={index}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#65758c",
              marginBottom: "14px",
            }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{
              fontSize: "26px",
              fontWeight: 800,
              color: colorMap[item.color],
              letterSpacing: "-0.6px",
            }}
          >
            {item.value}
          </Typography>
        </StatCard>
      ))}
    </StatsGrid>
  );
};

export default RequestStats;