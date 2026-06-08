import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { COLORS } from "../theme/colors";

const Header = styled.div`
  min-height: 166px;
  border-radius: 18px;
  padding: 34px 36px;
  background: ${COLORS.header};
  color: #ffffff;
  box-shadow: 0 18px 35px rgba(33, 35, 100, 0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  max-width: 720px;
`;

const DatePill = styled.div`
  width: fit-content;
  padding: 6px 15px;
  border-radius: 18px;
  font-size: 10px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.13);
  color: rgba(255, 255, 255, 0.86);
`;

const Title = styled(Typography)`
  font-size: 46px;
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

const Description = styled(Typography)`
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  max-width: 740px;
`;

const Highlight = styled.span`
  color: #ffffff;
  font-weight: 800;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

const ActionButton = styled(Button)`
  && {
    border-radius: 999px;
    text-transform: none;
    font-size: 12px;
    font-weight: 700;
    padding: 10px 20px;
    box-shadow: none;
    min-width: 154px;
    background: ${({ bgcolor }) => bgcolor};
    color: ${({ textcolor }) => textcolor || "#fff"};
    transition: transform 0.2s ease, filter 0.2s ease;

    &:hover {
      background: ${({ hoverbg }) => hoverbg};
      transform: translateY(-1px);
    }
  }
`;

function DashboardHeader({ data }) {
  return (
    <Header>
      <HeaderContent>
        <DatePill>{data.date}</DatePill>

        <Title>{data.title}</Title>

        <Description>
          Good Morning, <Highlight>{data.user}</Highlight> — {data.description}
        </Description>
      </HeaderContent>

      <Actions>
        <ActionButton
          variant="contained"
          startIcon={<AddOutlinedIcon sx={{ fontSize: 16 }} />}
          bgcolor="#58d66b"
          hoverbg="#4bc55e"
        >
          New Visitor Request
        </ActionButton>

        <ActionButton
          variant="contained"
          startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 15 }} />}
          bgcolor="rgba(255,255,255,0.18)"
          hoverbg="rgba(255,255,255,0.25)"
          textcolor="#fff"
        >
          Export
        </ActionButton>
      </Actions>
    </Header>
  );
}

export default DashboardHeader;


