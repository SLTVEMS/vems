import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";

import VisitorTypeSection from "../components/VisitorTypeSection";
import RequesterDetailsSection from "../components/RequesterDetailsSection";
import VisitDetailsSection from "../components/VisitDetailsSection";
import SupportingDocumentsSection from "../components/SupportingDocumentsSection";
import FormProgressTracker from "../components/FormProgressTracker";

const validationSchema = Yup.object({
  requestDate: Yup.string().required(),

  requesterName: Yup.string().required(),

  requesterEmail: Yup.string()
    .email("Invalid Email")
    .required(),

  requesterServiceNo: Yup.string().required(),

  requesterDesignation: Yup.string().required(),

  requesterContactNo: Yup.string()
  .matches(
    /^(?:\+94|0)(70|71|72|74|75|76|77|78)\d{7}$/,
    "Enter a valid Sri Lankan mobile number"
  )
  .required(),

  costCenterCode: Yup.string().required(),

  costCenterName: Yup.string().required(),

  visitorName: Yup.string().required(),

  visitorEmail: Yup.string()
    .email("Invalid Email")
    .required(),

  passType: Yup.string().required(),

  entryStartDate: Yup.string().required(),

  entryEndDate: Yup.string().required(),

  entryStartTime: Yup.string().when(
  ["entryStartDate", "entryEndDate"],
  {
    is: (start, end) =>
      start &&
      end &&
      start === end,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }
  ),

  entryEndTime: Yup.string().when(
    ["entryStartDate", "entryEndDate"],
    {
      is: (start, end) =>
        start &&
        end &&
        start === end,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  reason: Yup.string().required(),

  nightWorkRequired: Yup.string().when(
  "visitorType",
  {
    is: (val) => val !== "Emp. Child",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }
),

nightWorkStartTime: Yup.string().when(
  "nightWorkRequired",
  {
    is: "Yes",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }
  ),

  nightWorkEndTime: Yup.string().when(
    "nightWorkRequired",
    {
      is: "Yes",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  vehicleNumber: Yup.string().when(
    "vehicleParking",
    {
      is: "Yes",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  vehicleNumber: Yup.string().when(
    "vehicleParking",
    {
      is: "Yes",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  telephoneNumber: Yup.string().matches(
  /^(?:\+94|0)(70|71|72|74|75|76|77|78)\d{7}$/,
  "Enter a valid Sri Lankan mobile number"
  ),
  laptopSerialNumber: Yup.string().when(
  "visitorType",
  {
    is: "Trainee",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }
  ),
});

const initialValues = {
  visitorType: "",

  requestDate: "",

  requesterName: "",
  requesterEmail: "",
  requesterServiceNo: "",
  requesterDesignation: "",
  requesterContactNo: "",
  costCenterCode: "",
  costCenterName: "",

  passType: "One Day",
  entryStartDate: "",
  entryEndDate: "",
  entryStartTime: "",
  entryEndTime: "",
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
  laptopSerialNumber: "",
  reason: "",

  officerSvcNo: "",
  officerName: "",
  officerEmail: "",
  officerContactNo: "",
  recommendationStatus: "",
  recommendedOn: "",
  recommendationRemarks: "",

  attachments: [],
};

function CreateRequestForm() {
  const visitorTypeColors = {
    Guest: "#2F80ED",
    Contractor: "#FF7F22",
    Canteen: "#30C28E",
    Trainee: "#AF52DE",
    "Emp. Child": "#2DB7D9",
    Employee: "#e7b900",
  };
  const [showForm, setShowForm] = useState(false);
  const [requestSubmitted, setRequestSubmitted] =
  useState(false);
  const [showDuplicateWarning, setShowDuplicateWarning] =
  useState(false);

  const duplicateVisitorData = {
    requestCode: "VE20260615-90",
    nic: "200534009821",
    visitorName: "Kasun Perera",
  };

  const handleSubmit = (values) => {
  console.log(values);

  setRequestSubmitted(true);
  };
  const handleFormReset = (formik) => {
    formik.setValues({
      ...initialValues,

      visitorType:
        formik.values.visitorType,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#FFFFFF",
        padding: 0
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          borderRadius: 0,
          overflowX: "hidden",
          overflowY: "visible",
          boxShadow: "none",
          background: "#fff",
        }}
      >
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
          {(formik) => {
            const selectedColor =
              visitorTypeColors[
                formik.values.visitorType
              ] || "#071B52";
                const activeStep = requestSubmitted
                  ? 2
                  : showForm
                  ? 1
                  : 0;

            return (
              <Form>
              <Box
                sx={{
                  p: 3,
                  width: "100%",
                  maxWidth: "1600px",
                  margin: "0 auto",
                  boxSizing: "border-box",
                }}
                
              >
                <FormProgressTracker
                  activeStep={activeStep}
                  activeColor={selectedColor}
                />
               {!showForm && (
              <>
                <Box sx={{ mb: 6 }}>
                  <VisitorTypeSection
                    formik={formik}
                    onAutoNext={() => setShowForm(true)}
                  />
                </Box>
              </>
            )}

              {showForm && !requestSubmitted && (
                <Box
                  sx={{
                    animation: "fadeSlideIn 0.7s ease",

                    "@keyframes fadeSlideIn": {
                      from: {
                        opacity: 0,
                        transform: "translateY(25px)",
                      },
                      to: {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                    
                  }}
                  >

                <Box
                  sx={{
                    mb: 4,
                      p: 3,
                      width: "100%",
                      boxSizing: "border-box",
                      borderRadius: "24px",

                    background: selectedColor,

                    color: "#fff",

                    boxShadow:
                      "0 15px 35px rgba(0,0,0,0.15)",

                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      Visitor Category: {formik.values.visitorType}
                    </Typography>
                  </Box>

                  <Button
                    onClick={() => setShowForm(false)}
                    sx={{
                      borderRadius: "14px",
                      px: 2.5,
                      py: 1,

                      color: "#fff",

                      background: "rgba(255,255,255,0.15)",

                      textTransform: "none",
                      fontWeight: 600,

                      "&:hover": {
                        background: "rgba(255,255,255,0.25)",
                      },
                    }}
                  >
                    Change Visitor Type
                  </Button>
                </Box>

                <RequesterDetailsSection
                  formik={formik}
                />

                <VisitDetailsSection
                  formik={formik}
                />

                <SupportingDocumentsSection
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
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
                    variant="contained"
                    onClick={() => handleFormReset(formik)}
                    sx={{
                      borderRadius: "16px",
                      px: 4,
                      py: 1.4,

                      textTransform: "none",

                      fontWeight: 600,
                      fontSize: "14px",

                      background: "#F1F5F9",
                      color: "#475569",

                      boxShadow: "none",

                      "&:hover": {
                        background: "#E2E8F0",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: "16px",

                      px: 5,
                      py: 1.4,

                      textTransform: "none",

                      fontWeight: 700,
                      fontSize: "14px",

                      background:
                        "linear-gradient(135deg,#021C54,#0A2F88)",

                      boxShadow:
                        "0px 10px 25px rgba(2,28,84,0.25)",

                      transition: "all 0.25s ease",

                      "&:hover": {
                        transform: "translateY(-2px)",

                        background:
                          "linear-gradient(135deg,#021C54,#0A2F88)",

                        boxShadow:
                          "0px 15px 30px rgba(2,28,84,0.35)",
                      },
                    }}
                  >
                    Submit Request
                  </Button>
                </Box>
              </Box>
              )}

             {requestSubmitted && (
              <Paper
                elevation={0}
                sx={{
                  maxWidth: "620px",
                  margin: "40px auto",
                  padding: "50px",
                  borderRadius: "24px",
                  textAlign: "center",
                  border: "1px solid #E5E7EB",
                  background: "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "#22C55E",
                    color: "#FFFFFF",
                    fontSize: "48px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    boxShadow: "0 10px 25px rgba(34,197,94,0.25)",
                  }}
                >
                  ✓
                </Box>

                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#021C54",
                    mb: 1,
                  }}
                >
                  Request Submitted Successfully!
                </Typography>

                <Typography
                  sx={{
                    color: "#64748B",
                    fontSize: "15px",
                    mb: 4,
                  }}
                >
                  Your visitor request has been sent for supervisor approval.
                </Typography>

                <Box
                  sx={{
                    background: "#F0FDF4",
                    border: "1px dashed #86EFAC",
                    borderRadius: "16px",
                    padding: "24px",
                    mb: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#64748B",
                      letterSpacing: "1px",
                      mb: 1,
                    }}
                  >
                    ENTRY CODE
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#166534",
                    }}
                  >
                    VE20260615-001
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      console.log("My Requests");
                    }}
                    sx={{
                      borderRadius: "14px",
                      px: 4,
                      py: 1.2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    View My Request
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => {
                      handleFormReset(formik);
                      setRequestSubmitted(false);
                      setShowForm(false);
                    }}
                    sx={{
                      borderRadius: "14px",
                      px: 4,
                      py: 1.2,
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
                    Create Another Request
                  </Button>
                </Box>
              </Paper>
            )}
              
              </Box>
              <Dialog
                open={showDuplicateWarning}
                onClose={() => setShowDuplicateWarning(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                  sx: {
                    borderRadius: "24px",
                    maxWidth: "700px",
                  },
                }}
              >
                <DialogContent
                  sx={{
                    p: 0,
                    overflow: "hidden",
                    borderRadius: "24px",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      p: 5,
                      textAlign: "center",
                      background: "#FFFFFF",
                    }}
                  >
                    <Box
                      sx={{
                        width: 95,
                        height: 95,
                        margin: "0 auto 24px",
                        borderRadius: "50%",
                        background: "#FFF5E6",
                        border: "2px solid #F5C26B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "42px",
                      }}
                    >
                      ⚠️
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "34px",
                        fontWeight: 700,
                        color: "#E89B17",
                        mb: 3,
                      }}
                    >
                      Duplicate Visitor Request Detected
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#4B5563",
                        mb: 1,
                      }}
                    >
                      PREVIOUS REQUEST CODE:
                      {" "}
                      {duplicateVisitorData.requestCode}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#6B7280",
                        mb: 1,
                      }}
                    >
                      NIC: {duplicateVisitorData.nic}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#374151",
                        mb: 4,
                      }}
                    >
                      VISITOR NAME: {duplicateVisitorData.visitorName}
                    </Typography>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: "18px",
                        background: "#FFF9EE",
                        border: "1px solid #F3C15A",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "15px",
                          lineHeight: 1.8,
                          color: "#5B6470",
                        }}
                      >
                        An approved visitor request already exists for this visitor on the selected date.
                        The entered NIC matches an existing approved visitor request.
                        Please review the existing request before proceeding.
                        Multiple visitor requests for the same visitor on the same date are not permitted.
                      </Typography>
                    </Paper>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setShowDuplicateWarning(false)
                        }
                        sx={{
                          borderRadius: "14px",
                          px: 4,
                          py: 1.2,
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        Return to Form
                      </Button>

                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: "14px",
                          px: 4,
                          py: 1.2,
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
                        View Existing Request
                      </Button>
                    </Box>
                  </Box>
                </DialogContent>
              </Dialog>
            </Form>
            )
          }}
        </Formik>
      </Paper>
    </Box>
  );
}

export default CreateRequestForm;