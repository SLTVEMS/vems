import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const visitorTypes = [
  {
    label: "Guest",
    color: "#2F80ED",
    icon: "👤",
  },
  {
    label: "Contractor",
    color: "#FF7F22",
    icon: "👷",
  },
  {
    label: "Canteen",
    color: "#30C28E",
    icon: "🍽️",
  },
  {
    label: "Trainee",
    color: "#AF52DE",
    icon: "🎓",
  },
  {
    label: "Emp. Child",
    color: "#2DB7D9",
    icon: "👶",
  },
];

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
  height: 120px;
  border-radius: 24px;

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
      ? "3px solid rgba(255,255,255,0.8)"
      : "none"};

  box-shadow:
    0 10px 20px rgba(0,0,0,0.12);

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 18px 30px rgba(0,0,0,0.18);
  }
`;

function VisitorTypeSection({ formik }) {
  return (
    <Box mb={6}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "16px",
        }}
      >
        Visitor Type
      </Typography>

      <Typography
        sx={{
          fontSize: "13px",
          color: "#6B7280",
          mt: 0.5,
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
              formik.values.visitorType ===
              type.label
            }
            onClick={() =>
              formik.setFieldValue(
                "visitorType",
                type.label
              )
            }
          >
            <Typography
              sx={{
                fontSize: "34px",
              }}
            >
              {type.icon}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontWeight: 600,
                fontSize: "14px",
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