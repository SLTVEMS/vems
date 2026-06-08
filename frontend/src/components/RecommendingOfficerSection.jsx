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

function RecommendingOfficerSection({ formik }) {
  return (
    <SectionWrapper>
      <SectionHeader>
        <GreenBar />
        <HeaderText>Recommending Officer</HeaderText>
        <Divider />
      </SectionHeader>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Label>Officer Service No</Label>

          <TextField
            fullWidth
            placeholder="Enter Service Number"
            name="officerSvcNo"
            value={formik.values.officerSvcNo}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Label>Officer Name</Label>

          <TextField
            fullWidth
            placeholder="Enter Officer Name"
            name="officerName"
            value={formik.values.officerName}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Label>Officer Email</Label>

          <TextField
            fullWidth
            placeholder="Enter Officer Email"
            name="officerEmail"
            value={formik.values.officerEmail}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Label>Officer Contact No</Label>

          <TextField
            fullWidth
            placeholder="Enter Contact Number"
            name="officerContactNo"
            value={formik.values.officerContactNo}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Label>Recommendation Status</Label>

          <TextField
            select
            fullWidth
            name="recommendationStatus"
            value={formik.values.recommendationStatus}
            onChange={formik.handleChange}
            sx={inputStyle}
            SelectProps={{
              MenuProps: menuProps,
            }}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Recommended">Recommended</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <Label>Recommended On</Label>

          <TextField
            fullWidth
            type="date"
            name="recommendedOn"
            value={formik.values.recommendedOn}
            onChange={formik.handleChange}
            sx={inputStyle}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          textAlign: "left",
          width: "100%",
          marginTop: "24px",
        }}
      >
        <Label>Recommendation Remarks</Label>

        <TextField
          fullWidth
          multiline
          rows={1}
          placeholder="Enter recommendation remarks..."
          name="recommendationRemarks"
          value={formik.values.recommendationRemarks}
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
    </SectionWrapper>
  );
}

export default RecommendingOfficerSection;