import styled from "styled-components";
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const SectionWrapper = styled(Box)`
  margin-top: 30px;
`;

const SectionHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const GreenBar = styled(Box)`
  width: 5px;
  height: 30px;
  background: #32d74b;
  border-radius: 3px;
`;

const HeaderText = styled(Typography)`
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #071b52 !important;
  margin-left: 12px !important;
  text-transform: uppercase;
`;

const Divider = styled(Box)`
  flex: 1;
  height: 1px;
  background: #d9dde3;
  margin-left: 16px;
`;

const StatusIconWrapper = styled(Box)`
  margin-left: 12px;
  display: flex;
  align-items: center;
`;

const Label = styled(Typography)`
  font-size: 13px !important;
  font-weight: 600 !important;
  margin-bottom: 6px !important;
  color: #1f2937 !important;
`;

const Required = styled.span`
  color: red;
`;

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: "48px",
    borderRadius: "14px",
    backgroundColor: "#f8fafc",
    transition: "all 0.25s ease",

    "& fieldset": {
      borderColor: "#d1d5db",
    },

    "&:hover": {
      backgroundColor: "#ffffff",

      "& fieldset": {
        borderColor: "#94a3b8",
      },
    },

    "&.Mui-focused": {
      backgroundColor: "#ffffff",

      "& fieldset": {
        borderColor: "#071b52",
        borderWidth: "2px",
      },
    },
  },

  "& .MuiInputBase-input": {
    fontSize: "13px",
    padding: "12px 16px",
  },

  "& .MuiSelect-icon": {
    color: "#64748b",
  },

  "& input[type='time']": {
  cursor: "pointer",
  fontWeight: 500,
  },

  "& input[type='time']::-webkit-calendar-picker-indicator": {
    cursor: "pointer",
    opacity: 0.8,
    transform: "scale(1.2)",
  },

  "& input[type='date']::-webkit-calendar-picker-indicator": {
    cursor: "pointer",
    opacity: 1,
  },
};

const menuProps = {
  PaperProps: {
    sx: {
      borderRadius: "20px",
      mt: 1,
      overflow: "hidden",

      border: "1px solid #E2E8F0",

      boxShadow:
        "0px 20px 40px rgba(15,23,42,0.12)",

      "& .MuiMenuItem-root": {
        minHeight: "50px",

        fontSize: "14px",
        fontWeight: 500,

        borderRadius: "12px",

        margin: "4px 8px",

        transition: "all 0.2s ease",
      },

      "& .MuiMenuItem-root:hover": {
        background: "#F1F5F9",
      },

      "& .Mui-selected": {
        background: "#E8F0FF !important",
        color: "#0A2F88",
        fontWeight: 600,
      },
    },
  },
};

function VisitDetailsSection({ formik }) {
  const visitRequiredFields = [
  formik.values.visitorName,
  formik.values.visitorEmail,
  formik.values.passType,
  formik.values.reason,
];

if (formik.values.passType === "One Day") {
  visitRequiredFields.push(
    formik.values.entryStartDate,
    formik.values.entryStartTime,
    formik.values.entryEndTime
  );
}

if (formik.values.passType === "More Than One Day") {
  visitRequiredFields.push(
    formik.values.entryStartDate,
    formik.values.entryEndDate
  );
}

if (formik.values.visitorType !== "Emp. Child") {
  visitRequiredFields.push(
    formik.values.nightWorkRequired
  );
}

  if (
    formik.values.entryStartDate &&
    formik.values.entryEndDate &&
    formik.values.entryStartDate ===
      formik.values.entryEndDate
  ) {
    visitRequiredFields.push(
      formik.values.entryStartTime,
      formik.values.entryEndTime
    );
  }

  if (
    formik.values.nightWorkRequired === "Yes"
  ) {
    visitRequiredFields.push(
      formik.values.nightWorkStartTime,
      formik.values.nightWorkEndTime
    );
  }

  if (
    formik.values.vehicleParking === "Yes"
  ) {
    visitRequiredFields.push(
      formik.values.vehicleNumber
    );
  }

  const visitCompletedCount =
    visitRequiredFields.filter(
      (field) =>
        field !== "" &&
        field !== null &&
        field !== undefined
    ).length;

  const visitTotalCount =
    visitRequiredFields.length;

  return (
    <SectionWrapper>
     <SectionHeader>
      <GreenBar />

      <HeaderText>Visit Details</HeaderText>

      <Divider />

      <StatusIconWrapper>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            color:
              visitCompletedCount === visitTotalCount
                ? "#22c55e"
                : "#f59e0b",
          }}
        >
          {visitCompletedCount}/{visitTotalCount}
        </Typography>
      </StatusIconWrapper>
    </SectionHeader>

          
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            margin: 0,
          }}
        >
        <Grid item xs={12} sm={4}>
          <Label>
            Pass Type <Required>*</Required>
          </Label>

          <TextField
            select
            fullWidth
            name="passType"
            value={formik.values.passType}
            onChange={formik.handleChange}
            sx={inputStyle}
            SelectProps={{
              MenuProps: menuProps,
            }}
          >
            <MenuItem value="One Day">
              One Day
            </MenuItem>

            <MenuItem value="More Than One Day">
              More Than One Day
            </MenuItem>
          </TextField>
        </Grid>

        {/* ONE DAY */}
        {formik.values.passType === "One Day" && (
          <>
            <Grid item xs={12} sm={4}>
              <Label>
                Entry Date <Required>*</Required>
              </Label>

              <TextField
                fullWidth
                type="date"
                name="entryStartDate"
                value={formik.values.entryStartDate}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Label>
                Start Time <Required>*</Required>
              </Label>

              <TextField
                fullWidth
                type="time"
                name="entryStartTime"
                value={formik.values.entryStartTime}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Label>
                End Time <Required>*</Required>
              </Label>

              <TextField
                fullWidth
                type="time"
                name="entryEndTime"
                value={formik.values.entryEndTime}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
            </Grid>
          </>
        )}

        {/* MORE THAN ONE DAY */}
        {formik.values.passType === "More Than One Day" && (
          <>
            <Grid item xs={12} sm={6}>
              <Label>
                Entry Start Date <Required>*</Required>
              </Label>

              <TextField
                fullWidth
                type="date"
                name="entryStartDate"
                value={formik.values.entryStartDate}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Label>
                Entry End Date <Required>*</Required>
              </Label>

              <TextField
                fullWidth
                type="date"
                name="entryEndDate"
                value={formik.values.entryEndDate}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
            </Grid>
          </>
        )}  

        {/* Visitor Name */}
        <Grid item xs={12} sm={6} md={4}>
          <Label>
            Visitor Name <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            placeholder="Enter Visitor Name"
            name="visitorName"
            value={formik.values.visitorName}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              Boolean(formik.errors.visitorName)
            }
            sx={inputStyle}
          />
        </Grid>

        {/* Visitor Email */}
        <Grid item xs={12} sm={6} md={4}>
          <Label>
            {formik.values.visitorType === "Emp. Child"
              ? "Visitor / Guardian Email"
              : "Visitor Email"}{" "}
            <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            placeholder={
              formik.values.visitorType === "Emp. Child"
                ? "guardian@example.com"
                : "visitor@example.com"
            }
            name="visitorEmail"
            value={formik.values.visitorEmail}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              Boolean(formik.errors.visitorEmail)
            }
            sx={inputStyle}
          />
        </Grid>

        {/* EMPTY GRID TO FORCE NEW ROW */}
        <Grid item xs={12} />

        {formik.values.visitorType !== "Emp. Child" && (
        <Grid item xs={12} sm={6} md={4}>
          <Label>
            Night Work Required <Required>*</Required>
          </Label>

          <TextField
            select
            fullWidth
            name="nightWorkRequired"
            value={formik.values.nightWorkRequired}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              Boolean(formik.errors.nightWorkRequired)
            }
            sx={inputStyle}
            SelectProps={{
              MenuProps: menuProps,
            }}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
      )}

        {formik.values.visitorType !== "Emp. Child" &&
          formik.values.nightWorkRequired === "Yes" && (
          <>
            <Grid item xs={12} md={6}>
              <Label>
                Night Work Start Time <Required>*</Required>
              </Label>

                <TextField
                  fullWidth
                  type="time"
                  name="nightWorkStartTime"
                  value={formik.values.nightWorkStartTime}
                  onChange={formik.handleChange}
                  error={
                    formik.submitCount > 0 &&
                    Boolean(formik.errors.nightWorkStartTime)
                  }
                  inputProps={{
                    step: 300,
                  }}
                  sx={inputStyle}
                />
            </Grid>

            <Grid item xs={12} md={6}>
              <Label>
                Night Work End Time <Required>*</Required>
              </Label>

                <TextField
                  fullWidth
                  type="time"
                  name="nightWorkEndTime"
                  value={formik.values.nightWorkEndTime}
                  onChange={formik.handleChange}
                  error={
                    formik.submitCount > 0 &&
                    Boolean(formik.errors.nightWorkEndTime)
                  }
                  inputProps={{
                    step: 300,
                  }}
                  sx={inputStyle}
                />
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6} md={4}>
          <Label>Visiting Building</Label>

          <TextField
            fullWidth
            placeholder="Enter Building"
            name="visitingBuilding"
            value={formik.values.visitingBuilding}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>


        <Grid item xs={12} sm={6} md={4}>
          <Label>Visiting Section</Label>

          <TextField
            fullWidth
            placeholder="Enter Section"
            name="visitingSection"
            value={formik.values.visitingSection}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Label>Meeting With</Label>

          <TextField
            fullWidth
            placeholder="Person Name"
            name="meetingWith"
            value={formik.values.meetingWith}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        {formik.values.visitorType !== "Emp. Child" &&
          formik.values.visitorType !== "Trainee" && (
            <Grid item xs={12} sm={6} md={4}>
              <Label>Vehicle Parking</Label>

              <TextField
                select
                fullWidth
                name="vehicleParking"
                value={formik.values.vehicleParking}
                onChange={formik.handleChange}
                sx={inputStyle}
                SelectProps={{
                  MenuProps: menuProps,
                }}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>
          )}

        {formik.values.visitorType !== "Emp. Child" &&
          formik.values.visitorType !== "Trainee" &&
          formik.values.vehicleParking === "Yes" && (
          <Grid item xs={12} sm={6} md={4}>
            <Label>
              Vehicle Number <Required>*</Required>
            </Label>

            <TextField
              fullWidth
              placeholder="Vehicle Number"
              name="vehicleNumber"
              value={formik.values.vehicleNumber}
              onChange={formik.handleChange}
              error={
                formik.submitCount > 0 &&
                Boolean(formik.errors.vehicleNumber)
              }
              sx={inputStyle}
            />
          </Grid>
        )}


        <Grid item xs={12} sm={6} md={4}>
          <Label>Telephone Number</Label>

          <TextField
            fullWidth
            placeholder="07XXXXXXXX"
            name="telephoneNumber"
            value={formik.values.telephoneNumber}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              Boolean(formik.errors.telephoneNumber)
            }
            sx={inputStyle}
          />
        </Grid>

        {formik.values.visitorType === "Trainee" && (
          <Grid item xs={12} sm={6} md={4}>
            <Label>
              Laptop Serial Number <Required>*</Required>
            </Label>

            <TextField
              fullWidth
              placeholder="Enter Laptop Serial Number"
              name="laptopSerialNumber"
              value={formik.values.laptopSerialNumber}
              onChange={formik.handleChange}
              error={
                formik.submitCount > 0 &&
                Boolean(formik.errors.laptopSerialNumber)
              }
              sx={inputStyle}
            />
          </Grid>
        )}

        {formik.values.visitorType !== "Trainee" &&
          formik.values.visitorType !== "Emp. Child" && (
            <Grid item xs={12} sm={6} md={4}>
              <Label>Company Name</Label>

              <TextField
                fullWidth
                placeholder="Company Name"
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                sx={inputStyle}
              />
            </Grid>
        )}


        <Box
          sx={{
            textAlign: "left",
            width: "100%",
            marginTop: "24px",
          }}
        >
          <Label>
            Reason for Visit <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            multiline
            rows={1}
            placeholder="Enter detailed reason for visit..."
            name="reason"
            value={formik.values.reason}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              Boolean(formik.errors.reason)
            }
            sx={{
              width: "100%",

              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "#f8fafc",

                "& fieldset": {
                  borderColor: "#d1d5db",
                },

                "&.Mui-error fieldset": {
                  borderColor: "#ef4444 !important",
                  borderWidth: "2px",
                },

                "&:hover fieldset": {
                  borderColor: "#94a3b8",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#071b52",
                  borderWidth: "2px",
                },
              },

              "& .MuiInputBase-input": {
                fontSize: "13px",
                padding: "12px 16px",
              },
            }}
          />
        </Box>
      </Grid>
    </SectionWrapper>
  );
}

export default VisitDetailsSection;