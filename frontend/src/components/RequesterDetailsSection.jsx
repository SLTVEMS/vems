import styled from "styled-components";
import {
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const SectionWrapper = styled(Box)`
  margin-top: 24px;
`;

const SectionHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
    borderRadius: "10px",
    backgroundColor: "#f5f6f8",

    "& fieldset": {
      borderColor: "#d1d5db",
    },

    "&.Mui-error fieldset": {
      borderColor: "#ef4444 !important",
      borderWidth: "2px",
    },

    "&:hover fieldset": {
      borderColor: "#bfc5cc",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#071b52",
      borderWidth: "2px",
    },
  },

  "& .MuiInputBase-input": {
    fontSize: "13px",
    padding: "12px 14px",
  },
};

function RequesterDetailsSection({ formik }) {
  const requesterRequiredFields = [
  formik.values.requestDate,
  formik.values.requesterName,
  formik.values.requesterEmail,
  formik.values.requesterServiceNo,
  formik.values.requesterDesignation,
  formik.values.requesterContactNo,
  formik.values.costCenterCode,
  formik.values.costCenterName,
];
const requesterCompletedCount =
  requesterRequiredFields.filter(Boolean).length;

const requesterTotalCount = requesterRequiredFields.length;

  return (
    <SectionWrapper>
      <SectionHeader>
        <GreenBar />

        <HeaderText>Requester Details</HeaderText>

        <Divider />

        <StatusIconWrapper>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              color:
                requesterCompletedCount === requesterTotalCount
                  ? "#22c55e"
                  : "#f59e0b",
            }}
          >
            {requesterCompletedCount}/{requesterTotalCount}
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

        <Grid item xs={12} sm={6}>
          <Label>
            Request Date <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            type="date"
            name="requestDate"
            value={formik.values.requestDate}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              !formik.values.requestDate
            }
            InputLabelProps={{ shrink: true }}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Label>
            Requester Name <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            placeholder="e.g. Kavindu Perera"
            name="requesterName"
            value={formik.values.requesterName}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              !formik.values.requesterName
            }
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Label>
            Requester Email <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            placeholder="name@sltmobitel.lk"
            name="requesterEmail"
            value={formik.values.requesterEmail}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              Boolean(formik.errors.requesterEmail)
            }
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Label>
            Requester Service No <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            placeholder="SVC0000"
            name="requesterServiceNo"
            value={formik.values.requesterServiceNo}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              !formik.values.requesterServiceNo
            }
            sx={inputStyle}
          />
        </Grid>

        {/* Row 2 */}

        <Grid item xs={12} sm={6}>
          <Label>Requester Designation</Label>

          <TextField
            fullWidth
            placeholder="e.g. Senior Engineer"
            name="requesterDesignation"
            value={formik.values.requesterDesignation}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              !formik.values.requesterDesignation
            }
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Label>
            Requester Contact No <Required>*</Required>
          </Label>

          <TextField
            fullWidth
            placeholder="+94 7X XXX XXXX"
            name="requesterContactNo"
            value={formik.values.requesterContactNo}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              Boolean(formik.errors.requesterContactNo)
            }
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Label>Cost Center Code</Label>

         <TextField
          fullWidth
          placeholder="CC-XXXX"
          name="costCenterCode"
          value={formik.values.costCenterCode}
          onChange={formik.handleChange}
          error={
            formik.submitCount > 0 &&
            !formik.values.costCenterCode
          }
          sx={inputStyle}
        />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Label>Cost Centre Name</Label>

          <TextField
            fullWidth
            placeholder="e.g. IT Operations"
            name="costCenterName"
            value={formik.values.costCenterName}
            onChange={formik.handleChange}
            error={
              formik.submitCount > 0 &&
              !formik.values.costCenterName
            }
            sx={inputStyle}
          />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}

export default RequesterDetailsSection;