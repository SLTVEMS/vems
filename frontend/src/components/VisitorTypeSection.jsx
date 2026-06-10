import styled from "styled-components";
import { Box, Typography } from "@mui/material";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

const visitorTypes = [
  {
  label: "Employee",
  color: "#0EA5E9",
  icon: <BadgeOutlinedIcon sx={{ fontSize: 40 }} />,
  },
  {
    label: "Guest",
    color: "#2F80ED",
    icon: <PersonOutlinedIcon sx={{ fontSize: 40 }} />,
  },
  {
    label: "Contractor",
    color: "#FF7F22",
    icon: <EngineeringOutlinedIcon sx={{ fontSize: 40 }} />,
  },
  {
    label: "Canteen",
    color: "#30C28E",
    icon: <RestaurantOutlinedIcon sx={{ fontSize: 40 }} />,
  },
  {
    label: "Trainee",
    color: "#AF52DE",
    icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
  },
  {
    label: "Emp. Child",
    color: "#2DB7D9",
    icon: <ChildCareOutlinedIcon sx={{ fontSize: 40 }} />,
  },
];

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TypeCard = styled.div`
  height: 180px;
  border-radius: 14px;

  background: ${(props) => props.bg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
  cursor: pointer;

  transition: all 0.25s ease;

  border: ${(props) =>
    props.active
      ? "3px solid rgba(255,255,255,0.95)"
      : "none"};

  box-shadow: ${(props) =>
    props.active
      ? "0px 10px 24px rgba(0,0,0,0.18)"
      : "0px 6px 14px rgba(0,0,0,0.12)"};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 14px 24px rgba(0,0,0,0.18);
  }
`;

function VisitorTypeSection({ formik }) {
  return (
    <Box
      mb={6}
      sx={{
        maxWidth: "1100px",
        mx: "auto",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "16px",
          color: "#071b52",
          textAlign: "center",
        }}
      >
        Visitor Type
      </Typography>

      <Typography
        sx={{
          fontSize: "18px",
          color: "#6B7280",
          mt: 0.5,
          textAlign: "center",
        }}
      >
        Select the category of visitor.
      </Typography>

      <CardContainer>
        {visitorTypes.map((type) => (
          <TypeCard
            key={type.label}
            bg={type.color}
            active={
              formik.values.visitorType === type.label
            }
            onClick={() =>
              formik.setFieldValue(
                "visitorType",
                type.label
              )
            }
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {type.icon}
            </Box>

            <Typography
              sx={{
                mt: 1,
                fontWeight: 600,
                fontSize: "18px",
                color: "#fff",
              }}
            >
              {type.label}
            </Typography>
          </TypeCard>
        ))}
      </CardContainer>
    </Box>
  );
}

export default VisitorTypeSection;