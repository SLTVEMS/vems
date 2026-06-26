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
import VisitorCreateRequestForm from "../components/VisitorCreateRequestForm";
import VisitorSuccessScreen from "../components/VisitorSuccessScreen";

const visitorValidationSchema = Yup.object({
  visitorName: Yup.string().required(),

  visitorEmail: Yup.string()
    .email("Invalid Email")
    .required(),

  passType: Yup.string().required(),

  entryStartDate: Yup.string().required(),

  entryEndDate: Yup.string().when("passType", {
    is: "More Than One Day",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  entryStartTime: Yup.string().when("passType", {
    is: "One Day",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  entryEndTime: Yup.string().when("passType", {
    is: "One Day",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  reason: Yup.string().required(),

  nightWorkRequired: Yup.string().when("$visitorType", {
    is: (val) => val !== "Emp. Child",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  nightWorkStartTime: Yup.string().when("nightWorkRequired", {
    is: "Yes",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  nightWorkEndTime: Yup.string().when("nightWorkRequired", {
    is: "Yes",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  vehicleNumber: Yup.string().when("vehicleParking", {
    is: "Yes",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  telephoneNumber: Yup.string().matches(
    /^(?:\+94|0)(70|71|72|74|75|76|77|78)\d{7}$/,
    {
      message: "Enter a valid Sri Lankan mobile number",
      excludeEmptyString: true,
    }
  ),

  laptopSerialNumber: Yup.string().when("$visitorType", {
    is: "Trainee",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),

  attachments: Yup.array().notRequired(),
});

const validationSchema = Yup.object({
  visitorType: Yup.string().required(),

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

  visitors: Yup.array()
    .of(visitorValidationSchema)
    .min(1)
    .required(),

  officerSvcNo: Yup.string(),
  officerName: Yup.string(),
  officerEmail: Yup.string(),
  officerContactNo: Yup.string(),
  recommendationStatus: Yup.string(),
  recommendedOn: Yup.string(),
  recommendationRemarks: Yup.string(),
});

const visitorDetailInitialValues = {
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
  visitorName: "",
  visitorEmail: "",
  reason: "",
  attachments: [],
};

const buildVisitorDetailValues = (visitor = {}) => ({
  ...visitorDetailInitialValues,
  ...visitor,
  attachments: [...(visitor.attachments || [])],
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

  ...visitorDetailInitialValues,


  visitors: [buildVisitorDetailValues()],

  officerSvcNo: "",
  officerName: "",
  officerEmail: "",
  officerContactNo: "",
  recommendationStatus: "",
  recommendedOn: "",
  recommendationRemarks: "",
};
const createVisitorFormik = (formik, index) => {
  const visitorValues =
    formik.values.visitors[index] || buildVisitorDetailValues();

  const visitorErrors =
    Array.isArray(formik.errors.visitors) &&
    formik.errors.visitors[index]
      ? formik.errors.visitors[index]
      : {};

  const visitorTouched =
    Array.isArray(formik.touched.visitors) &&
    formik.touched.visitors[index]
      ? formik.touched.visitors[index]
      : {};

  return {
    ...formik,

    values: {
      ...visitorValues,
      visitorType: formik.values.visitorType,
    },

    errors: visitorErrors,
    touched: visitorTouched,

    setFieldValue: (field, value, shouldValidate) =>
      formik.setFieldValue(
        `visitors.${index}.${field}`,
        value,
        shouldValidate
      ),

    setFieldTouched: (field, touched, shouldValidate) =>
      formik.setFieldTouched(
        `visitors.${index}.${field}`,
        touched,
        shouldValidate
      ),

    handleChange: (event) => {
      const { name, value } = event.target;

      formik.setFieldValue(`visitors.${index}.${name}`, value);
    },

    handleBlur: (event) => {
      const { name } = event.target;

      formik.setFieldTouched(`visitors.${index}.${name}`, true);
    },
  };
};

function CreateRequestForm({ onClose, onRequestCreated } = {}) {
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
  const [shareFormOpen, setShareFormOpen] = useState(false);
  const [visitorRequestSubmitted, setVisitorRequestSubmitted] =
  useState(false);
  const [sharedFormValues, setSharedFormValues] = useState(null);
  const [mainFormValues, setMainFormValues] = useState(null);

  const duplicateVisitorData = {
  requestCode: "VE20260615-90",
  nic: "200534009821",
  visitorName: "Kasun Perera",
  };

  const handleDuplicateVisitor = (formik, index) => {
  const currentVisitor =
    formik.values.visitors[index] || buildVisitorDetailValues();

  const duplicatedVisitor = buildVisitorDetailValues(currentVisitor);

  const updatedVisitors = [
    ...formik.values.visitors.slice(0, index + 1),
    duplicatedVisitor,
    ...formik.values.visitors.slice(index + 1),
  ];

  formik.setFieldValue("visitors", updatedVisitors);
};

const handleRemoveVisitor = (formik, index) => {
  if (formik.values.visitors.length === 1) return;

  const updatedVisitors = formik.values.visitors.filter(
    (_, visitorIndex) => visitorIndex !== index
  );

  formik.setFieldValue("visitors", updatedVisitors);
};



  const handleFormReset = (formik) => {
    formik.setValues({
      ...initialValues,
      visitorType: formik.values.visitorType,
      visitors: [buildVisitorDetailValues()],
    });
  };

  const handleSubmit = (values) => {
    const firstVisitor = values.visitors?.[0] || {};

    const payload = {
      ...values,
      ...firstVisitor,
      visitors: values.visitors,
    };

    console.log(payload);

    setRequestSubmitted(true);

    if (onRequestCreated) {
      onRequestCreated(payload);
    }
  };

  // ── Visitor success screen ──
  // Shown after the shared Visitor Create Request Form is submitted.
  if (visitorRequestSubmitted) {
    return (
      <VisitorSuccessScreen
        onCreateAnother={() => {
          setVisitorRequestSubmitted(false);
          setShareFormOpen(false);
          setSharedFormValues(null);
          setMainFormValues(null);
        }}
      />
    );
  }

  // ── Visitor Create Request Form ──
  // Opened by clicking "Share Form" on the main request form below.
  if (shareFormOpen) {
    return (
      <VisitorCreateRequestForm
        sharedValues={sharedFormValues || {}}
        onBack={() => {
          setShareFormOpen(false);
        }}
        onSubmitted={() => setVisitorRequestSubmitted(true)}
      />
    );
  }

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
          initialValues={mainFormValues || initialValues}
          enableReinitialize
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

                <Box sx={{ mb: 5 }}>
                  <RequesterDetailsSection
                    formik={formik}
                  />
                </Box>

                {formik.values.visitors.map((visitor, index) => {
                  const visitorFormik = createVisitorFormik(formik, index);

                  return (
                    <Paper
                      key={`visitor-section-${index}`}
                      elevation={0}
                      sx={{
                        mt: 2,
                        mb: 4,
                        p: 3,
                        borderRadius: "24px",
                        border: "1px solid #E2E8F0",
                        background: "#FFFFFF",
                      }}
                    >
                      <VisitDetailsSection
                        formik={visitorFormik}
                        title={`Visit Details ${
                          formik.values.visitors.length > 1 ? index + 1 : ""
                        }`}
                        headerActions={
                          <>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setMainFormValues(formik.values);

                                setSharedFormValues({
                                  ...formik.values,
                                  ...formik.values.visitors[index],
                                  selectedVisitorIndex: index,
                                });

                                setShareFormOpen(true);
                              }}
                              sx={{
                                borderRadius: "12px",
                                px: 2.2,
                                py: 0.8,
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: "12px",
                                background:
                                  "linear-gradient(135deg,#021C54,#0A2F88)",
                                boxShadow:
                                  "0px 8px 18px rgba(2,28,84,0.18)",

                                "&:hover": {
                                  background:
                                    "linear-gradient(135deg,#021C54,#0A2F88)",
                                },
                              }}
                            >
                              Share Form
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleDuplicateVisitor(formik, index)}
                              sx={{
                                borderRadius: "12px",
                                px: 2.2,
                                py: 0.8,
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: "12px",
                                borderColor: "#22C55E",
                                color: "#16A34A",
                                background: "#F0FDF4",

                                "&:hover": {
                                  borderColor: "#16A34A",
                                  background: "#DCFCE7",
                                },
                              }}
                            >
                              + Visitor
                            </Button>

                            {formik.values.visitors.length > 1 && (
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleRemoveVisitor(formik, index)}
                                sx={{
                                  borderRadius: "12px",
                                  px: 2,
                                  py: 0.8,
                                  textTransform: "none",
                                  fontWeight: 700,
                                  fontSize: "12px",
                                  borderColor: "#FCA5A5",
                                  color: "#DC2626",
                                  background: "#FEF2F2",

                                  "&:hover": {
                                    borderColor: "#EF4444",
                                    background: "#FEE2E2",
                                  },
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </>
                        }
                      />

                      <SupportingDocumentsSection
                        values={visitorFormik.values}
                        setFieldValue={visitorFormik.setFieldValue}
                      />
                    </Paper>
                  );
                })}

                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (onClose) {
                        onClose();
                      } else {
                        setShowForm(false);
                      }
                    }}
                    sx={{
                      borderRadius: "16px",
                      px: 4,
                      py: 1.4,

                      textTransform: "none",

                      fontWeight: 600,
                      fontSize: "14px",

                      borderColor: "#E2E8F0",
                      color: "#475569",

                      "&:hover": {
                        borderColor: "#CBD5E1",
                        background: "#F8FAFC",
                      },
                    }}
                  >
                    ← Back
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="text"
                      onClick={() => handleFormReset(formik)}
                      sx={{
                        borderRadius: "16px",
                        px: 3,
                        py: 1.4,

                        textTransform: "none",

                        fontWeight: 600,
                        fontSize: "14px",

                        color: "#64748B",
                      }}
                    >
                      Clear
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
                      setMainFormValues(null);
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
