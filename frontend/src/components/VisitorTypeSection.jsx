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
    color: "#e7b900",
    icon: <BadgeOutlinedIcon sx={{ fontSize: 60 }} />,
  },
  {
    label: "Guest",
    color: "#2F80ED",
    icon: <PersonOutlinedIcon sx={{ fontSize: 60 }} />,
  },
  {
    label: "Contractor",
    color: "#FF7F22",
    icon: <EngineeringOutlinedIcon sx={{ fontSize: 60 }} />,
  },
  {
    label: "Canteen",
    color: "#30C28E",
    icon: <RestaurantOutlinedIcon sx={{ fontSize: 60 }} />,
  },
  {
    label: "Trainee",
    color: "#AF52DE",
    icon: <SchoolOutlinedIcon sx={{ fontSize: 60 }} />,
  },
  {
    label: "Emp. Child",
    color: "#2DB7D9",
    icon: <ChildCareOutlinedIcon sx={{ fontSize: 60 }} />,
  },
];

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  justify-content: center;
  gap: 24px;
  margin-top: 24px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(340px, 340px));
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(280px, 340px);
  }
`;

const TypeCard = styled.div`
  height: 300px;
  width: 100%;
  border-radius: 18px;

  background: ${(props) => props.$bg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
  cursor: pointer;

  transition: all 0.25s ease;

  border: ${(props) =>
    props.$active
      ? "3px solid rgba(255,255,255,0.95)"
      : "none"};

  box-shadow: ${(props) =>
    props.$active
      ? "0px 10px 24px rgba(0,0,0,0.18)"
      : "0px 6px 14px rgba(0,0,0,0.12)"};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 16px 30px rgba(0,0,0,0.18);
  }
`;

function VisitorTypeSection({ formik }) {
  return (
    <Box
      mb={6}
      sx={{
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "18px",
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
            $bg={type.color}
            $active={
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
                mt: 2,
                fontWeight: 700,
                fontSize: "24px",
                color: "#fff",
                textAlign: "center",
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