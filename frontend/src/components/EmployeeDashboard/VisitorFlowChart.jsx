import styled from "styled-components";
import { Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../theme/colors";

const Card = styled.div`
  height: 430px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 26px;
  box-shadow: 0 18px 35px rgba(35, 52, 94, 0.09);
  overflow: hidden;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const Legend = styled.div`
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
`;

const Pill = styled.div`
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 48px;
`;

const ChartTitle = styled(Typography)`
  font-size: 15px;
  font-weight: 900;
  color: ${COLORS.textDark};
`;

const ChartSubtitle = styled(Typography)`
  font-size: 10px;
  font-weight: 500;
  color: ${COLORS.textMuted};
  margin-top: 4px;
`;

function VisitorFlowChart({ data }) {
  return (
    <Card>
      <HeaderRow>
        <div>
          <ChartTitle>Visitor Flow — This Week</ChartTitle>
          <ChartSubtitle>Daily entries across all SLTMobitel premises.</ChartSubtitle>
        </div>

        <Legend>
          <Pill $color={COLORS.green.main} $bg={COLORS.green.light}>● Approved</Pill>
          <Pill $color={COLORS.blue.main} $bg={COLORS.blue.light}>● Pending</Pill>
          <Pill $color={COLORS.red.main} $bg={COLORS.red.light}>● Rejected</Pill>
        </Legend>
      </HeaderRow>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={6}
            barCategoryGap="45%"
            margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#667085",
                fontSize: 10,
                fontWeight: 600,
              }}
            />

            <Tooltip
              cursor={{ fill: "rgba(2, 20, 64, 0.03)" }}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #edf0f5",
                boxShadow: "0 12px 28px rgba(20,40,90,0.12)",
                fontSize: "12px",
              }}
            />

            <Bar dataKey="approved" fill={COLORS.green.main} radius={[8, 8, 0, 0]} barSize={10} />
            <Bar dataKey="pending" fill={COLORS.blue.main} radius={[8, 8, 0, 0]} barSize={10} />
            <Bar dataKey="rejected" fill={COLORS.red.main} radius={[8, 8, 0, 0]} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </Card>
  );
}

export default VisitorFlowChart;
