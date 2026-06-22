import styled from "styled-components";
import { Box, Typography } from "@mui/material";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const visitorTypes = [
  {
    label: "Employee",
    description: "SLT internal employee visit",
    color: "#E7B900",
    tint: "#FFF8D6",
    icon: <BadgeOutlinedIcon />,
  },
  {
    label: "Guest",
    description: "External guest visitor",
    color: "#2F80ED",
    tint: "#EFF6FF",
    icon: <PersonOutlinedIcon />,
  },
  {
    label: "Contractor",
    description: "Service or project contractor",
    color: "#FF7F22",
    tint: "#FFF3E8",
    icon: <EngineeringOutlinedIcon />,
  },
  {
    label: "Canteen",
    description: "Canteen related visitor",
    color: "#30C28E",
    tint: "#ECFDF5",
    icon: <RestaurantOutlinedIcon />,
  },
  {
    label: "Trainee",
    description: "Trainee visitor entry",
    color: "#AF52DE",
    tint: "#F8EDFF",
    icon: <SchoolOutlinedIcon />,
  },
  {
    label: "Emp. Child",
    description: "Employee child entry request",
    color: "#2DB7D9",
    tint: "#ECFEFF",
    icon: <ChildCareOutlinedIcon />,
  },
];

const SectionWrapper = styled.div`
  width: 100%;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 28px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TypeCard = styled.button`
  position: relative;
  min-height: 175px;
  width: 100%;
  padding: 26px 24px;
  border-radius: 18px;
  overflow: hidden;

  border: 2px solid
    ${(props) => (props.$active ? props.$color : "#E5E7EB")};

  background: ${(props) => (props.$active ? props.$tint : "#FFFFFF")};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  outline: none;
  text-align: center;

  box-shadow: ${(props) =>
    props.$active
      ? `0 14px 30px ${props.$color}26`
      : "0 8px 24px rgba(15, 23, 42, 0.08)"};

  transition: all 0.25s ease;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: ${(props) => (props.$active ? "100%" : "0")};
    height: 4px;
    background: ${(props) => props.$color};
    transform: translateX(-50%);
    border-radius: 999px 999px 0 0;
    transition: width 0.35s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: ${(props) => props.$color};
    background: ${(props) => props.$tint};
    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.14);
  }

  &:hover::after {
    width: 100%;
  }

  &:active {
    transform: translateY(-2px) scale(0.99);
  }
`;

const IconCircle = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) =>
    props.$active ? props.$color : "#F1F5F9"};

  color: ${(props) =>
    props.$active ? "#FFFFFF" : props.$color};

  transition: all 0.25s ease;

  .MuiSvgIcon-root {
    font-size: 32px;
  }

  ${TypeCard}:hover & {
    background: ${(props) => props.$color};
    color: #ffffff;
    transform: scale(1.07);
  }
`;

const CheckMark = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  color: ${(props) => props.$color};
  animation: popIn 0.25s ease;

  .MuiSvgIcon-root {
    font-size: 24px;
  }

  @keyframes popIn {
    from {
      opacity: 0;
      transform: scale(0.6);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

function VisitorTypeSection({ formik, onAutoNext }) {
  const handleVisitorSelect = (type) => {
    formik.setFieldValue("visitorType", type.label);

    setTimeout(() => {
      onAutoNext();

      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });
    }, 350);
  };

  return (
    <Box mb={6}>
      <SectionWrapper>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "20px",
            color: "#071B52",
            textAlign: "center",
          }}
        >
          Visitor Type
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            color: "#6B7280",
            mt: 0.8,
            textAlign: "center",
          }}
        >
          Select the category of visitor.
        </Typography>

        <CardContainer>
          {visitorTypes.map((type) => {
            const isActive =
              formik.values.visitorType === type.label;

            return (
              <TypeCard
                key={type.label}
                type="button"
                $active={isActive}
                $color={type.color}
                $tint={type.tint}
                onClick={() => handleVisitorSelect(type)}
              >
                {isActive && (
                  <CheckMark $color={type.color}>
                    <CheckCircleIcon />
                  </CheckMark>
                )}

                <IconCircle
                  $active={isActive}
                  $color={type.color}
                >
                  {type.icon}
                </IconCircle>

                <Typography
                  sx={{
                    mt: 2,
                    fontWeight: 800,
                    fontSize: "18px",
                    color: isActive ? type.color : "#1F2937",
                  }}
                >
                  {type.label}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.6,
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#94A3B8",
                  }}
                >
                  {type.description}
                </Typography>
              </TypeCard>
            );
          })}
        </CardContainer>
      </SectionWrapper>
    </Box>
  );
}

export default VisitorTypeSection;