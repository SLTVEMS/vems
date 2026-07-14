import { Box, Typography } from "@mui/material";

import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  {
    label: "TYPE",
    title: "Visitor Type",
    icon: BadgeOutlinedIcon,
  },
  {
    label: "DETAILS",
    title: "Request Details",
    icon: DescriptionOutlinedIcon,
  },
  {
    label: "DONE",
    title: "Submitted",
    icon: CheckCircleIcon,
  },
];

function FormProgressTracker({
  activeStep = 0,
  activeColor = "#071B52",
}) {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 5,
        borderRadius: "22px",
        border: "1px solid #D7E8FF",
        background:
          "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 100%)",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "4px",
          width: `${((activeStep + 1) / steps.length) * 100}%`,
          background: activeColor,
          transition: "width 0.35s ease",
        }}
      />

      <Box
        sx={{
          px: {
            xs: 2,
            md: 6,
          },
          py: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {steps.map((step, index) => {
          const StepIcon = step.icon;

          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <Box
              key={step.label}
              sx={{
                display: "flex",
                alignItems: "center",
                flex:
                  index === steps.length - 1
                    ? "0 0 auto"
                    : "1 1 auto",
              }}
            >
              <Box
                sx={{
                  minWidth: {
                    xs: 80,
                    md: 130,
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      isActive || isCompleted
                        ? activeColor
                        : "#EEF2F7",
                    color:
                      isActive || isCompleted
                        ? "#FFFFFF"
                        : "#94A3B8",
                    border:
                      isActive || isCompleted
                        ? `1px solid ${activeColor}`
                        : "1px solid #E5E7EB",
                    boxShadow: isActive
                      ? `0 10px 24px ${activeColor}35`
                      : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  <StepIcon sx={{ fontSize: 22 }} />
                </Box>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.5px",
                    color:
                      isActive || isCompleted
                        ? activeColor
                        : "#94A3B8",
                  }}
                >
                  {step.label}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: {
                      xs: "11px",
                      md: "12px",
                    },
                    fontWeight: 700,
                    color: isActive ? "#1F2937" : "#94A3B8",
                  }}
                >
                  {step.title}
                </Typography>
              </Box>

              {index !== steps.length - 1 && (
                <Box
                  sx={{
                    flex: 1,
                    height: "2px",
                    mx: {
                      xs: 1,
                      md: 2,
                    },
                    background:
                      index < activeStep
                        ? activeColor
                        : "#E5E7EB",
                    transition: "all 0.25s ease",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default FormProgressTracker;