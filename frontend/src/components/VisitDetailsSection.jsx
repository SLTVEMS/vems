import styled from "styled-components";
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

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

  "& input[type='time']::-webkit-calendar-picker-indicator": {
    cursor: "pointer",
    opacity: 1,
  },

  "& input[type='date']::-webkit-calendar-picker-indicator": {
    cursor: "pointer",
    opacity: 1,
  },
};

const menuProps = {
  PaperProps: {
    sx: {
      borderRadius: "14px",
      mt: 1,
      boxShadow: "0px 12px 25px rgba(0,0,0,0.12)",
    },
  },
};

function VisitDetailsSection({ formik }) {
  return (
    <SectionWrapper>
      <SectionHeader>
        <GreenBar />
        <HeaderText>Visit Details</HeaderText>
        <Divider />
      </SectionHeader>

          
        <Grid container spacing={4}>

        <Grid item xs={12} md={3}>
          <Label>
            Visitor Name <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            placeholder="Enter Visitor Name"
            name="visitorName"
            value={formik.values.visitorName}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Label>
            Visitor Email <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            placeholder="Enter Visitor Email"
            name="visitorEmail"
            value={formik.values.visitorEmail}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Label>
            Entry Start Date <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            type="date"
            name="entryStartDate"
            value={formik.values.entryStartDate}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Label>
            Entry End Date <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            type="date"
            name="entryEndDate"
            value={formik.values.entryEndDate}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Label>
            Night Work Required <Required>*</Required>
          </Label>

          <TextField
            select
            fullWidth
            name="nightWorkRequired"
            value={formik.values.nightWorkRequired}
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

        <Grid item xs={12} md={3}>
          <Label>Visiting Building / Pass Type</Label>

          <TextField
            fullWidth
            placeholder="Enter Building"
            name="visitingBuilding"
            value={formik.values.visitingBuilding}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        {/* Row 2 - Night Work */}

        {formik.values.nightWorkRequired === "Yes" && (
          <>
            <Grid item xs={12} md={3}>
              <Label>Night Work Start Time</Label>

              <TextField
                fullWidth
                type="time"
                name="nightWorkStartTime"
                value={formik.values.nightWorkStartTime}
                onChange={formik.handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Label>Night Work End Time</Label>

              <TextField
                fullWidth
                type="time"
                name="nightWorkEndTime"
                value={formik.values.nightWorkEndTime}
                onChange={formik.handleChange}
                sx={inputStyle}
              />
            </Grid>
          </>
        )}

        {/* Row 3 */}

        {/* Row 3 */}

        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={3}>
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

        {formik.values.vehicleParking === "Yes" && (
          <Grid item xs={12} md={3}>
            <Label>
              Vehicle Number <Required>*</Required>
            </Label>

            <TextField
              fullWidth
              placeholder="Vehicle Number"
              name="vehicleNumber"
              value={formik.values.vehicleNumber}
              onChange={formik.handleChange}
              sx={inputStyle}
            />
          </Grid>
        )}

        {/* Row 4 */}

                {/* Row 4 */}

        <Grid item xs={12} md={3}>
          <Label>Telephone Number</Label>

          <TextField
            fullWidth
            placeholder="Telephone Number"
            name="telephoneNumber"
            value={formik.values.telephoneNumber}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={3}>
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

        {/* Row 5 - Full Width Reason */}

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
            sx={{
              width: "100%",

              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "#f8fafc",

                "& fieldset": {
                  borderColor: "#d1d5db",
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