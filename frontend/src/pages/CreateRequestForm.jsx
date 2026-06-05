import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import VisitorTypeSection from "../components/VisitorTypeSection";
import RequesterDetailsSection from "../components/RequesterDetailsSection";
import VisitDetailsSection from "../components/VisitDetailsSection";
import RecommendingOfficerSection from "../components/RecommendingOfficerSection";
import DutyOfficerSection from "../components/DutyOfficerSection";
import SupportingDocumentsSection from "../components/SupportingDocumentsSection";

const validationSchema = Yup.object({
  requesterName: Yup.string().required(
    "Requester Name is required"
  ),

  requesterEmail: Yup.string()
    .email("Invalid Email")
    .required("Requester Email is required"),

  requesterServiceNo: Yup.string().required(
    "Service Number is required"
  ),
});

const initialValues = {
  visitorType: "Guest",

  requestDate: "",

  requesterName: "",
  requesterEmail: "",
  requesterServiceNo: "",
  requesterDesignation: "",
  requesterContactNo: "",
  costCenterCode: "",
  costCenterName: "",

  entryStartDate: "",
  entryEndDate: "",
  nightWorkRequired: "",
  nightWorkStartTime: "",
  nightWorkEndTime: "",
  visitingBuilding: "",
  visitingSection: "",
  meetingWith: "",
  vehicleParking: "",
  vehicleNumber: "",
  telephoneNumber: "",
  companyName: "",
  reason: "",

  officerSvcNo: "",
  officerName: "",
  officerEmail: "",
  officerContactNo: "",
  recommendationStatus: "",
  recommendedOn: "",
  recommendationRemarks: "",

  dutyOfficerSvcNo: "",
  dutyApprovalStatus: "",
  dutyApprovedOn: "",
  dutyOfficerRemarks: "",

  attachments: [],
};

function CreateRequestForm() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F5F7FB",
        padding: {
          xs: "15px",
          sm: "25px",
          md: "40px",
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow:
            "0px 15px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg,#021C54,#0A2F88)",
            color: "white",
            padding: {
              xs: "25px",
              md: "32px 40px",
            },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "24px",
                md: "32px",
              },
              fontWeight: 700,
            }}
          >
            Visitor Entry Request Form
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: "14px",
              opacity: 0.85,
            }}
          >
            Fill in the details below to register a
            visitor entry request.
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Box
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 5,
                  },

                  maxWidth: "1300px",
                  mx: "auto",
                }}
              >
                <VisitorTypeSection
                  formik={formik}
                />

                <RequesterDetailsSection
                  formik={formik}
                />

                <VisitDetailsSection
                  formik={formik}
                />

                <RecommendingOfficerSection
                  formik={formik}
                />

                <DutyOfficerSection
                  formik={formik}
                />

                <SupportingDocumentsSection
                  values={formik.values}
                  setFieldValue={
                    formik.setFieldValue
                  }
                />

                <Box
                  sx={{
                    mt: 5,
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      formik.resetForm()
                    }
                    sx={{
                      borderRadius: "12px",
                      px: 4,
                      py: 1.3,
                      textTransform: "none",
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: "12px",
                      px: 4,
                      py: 1.3,
                      textTransform: "none",
                      fontWeight: 600,
                      background:
                        "linear-gradient(135deg,#021C54,#0A2F88)",

                      "&:hover": {
                        background:
                          "linear-gradient(135deg,#021C54,#0A2F88)",
                      },
                    }}
                  >
                    Submit Request
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}

export default CreateRequestForm;