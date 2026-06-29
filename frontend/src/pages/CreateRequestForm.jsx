import { Formik, Form, getIn } from "formik";
import { useMemo, useState } from "react";
import * as Yup from "yup";

import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from "@mui/material";

import VisitorTypeSection from "../components/VisitorTypeSection";
import RequesterDetailsSection from "../components/RequesterDetailsSection";
import VisitDetailsSection from "../components/VisitDetailsSection";
import SupportingDocumentsSection from "../components/SupportingDocumentsSection";
import FormProgressTracker from "../components/FormProgressTracker";
import AddedVisitorsPreview from "../components/AddedVisitorsPreview";

const visitorValidationSchema = Yup.object({
  visitorName: Yup.string(),
  visitorEmail: Yup.string().email("Invalid Email"),
  passType: Yup.string(),
  entryStartDate: Yup.string(),
  entryEndDate: Yup.string(),
  entryStartTime: Yup.string(),
  entryEndTime: Yup.string(),
  reason: Yup.string(),
  nightWorkRequired: Yup.string(),
  nightWorkStartTime: Yup.string(),
  nightWorkEndTime: Yup.string(),
  vehicleParking: Yup.string(),
  vehicleNumber: Yup.string(),
  telephoneNumber: Yup.string().matches(
    /^(?:\+94|0)(70|71|72|74|75|76|77|78)\d{7}$/,
    {
      message: "Enter a valid Sri Lankan mobile number",
      excludeEmptyString: true,
    }
  ),
  laptopSerialNumber: Yup.string(),
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

  currentVisitor: visitorValidationSchema.notRequired(),

  addedVisitors: Yup.array()
    .of(visitorValidationSchema)
    .notRequired(),

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

  currentVisitor: buildVisitorDetailValues(),
  addedVisitors: [],

  officerSvcNo: "",
  officerName: "",
  officerEmail: "",
  officerContactNo: "",
  recommendationStatus: "",
  recommendedOn: "",
  recommendationRemarks: "",
};

const createNestedVisitorFormik = (formik, path) => {
  const visitorValues =
    getIn(formik.values, path) || buildVisitorDetailValues();

  const visitorErrors = getIn(formik.errors, path) || {};
  const visitorTouched = getIn(formik.touched, path) || {};

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
        `${path}.${field}`,
        value,
        shouldValidate
      ),

    setFieldTouched: (field, touched, shouldValidate) =>
      formik.setFieldTouched(
        `${path}.${field}`,
        touched,
        shouldValidate
      ),

    handleChange: (event) => {
      const { name, value } = event.target;
      formik.setFieldValue(`${path}.${name}`, value);
    },

    handleBlur: (event) => {
      const { name } = event.target;
      formik.setFieldTouched(`${path}.${name}`, true);
    },
  };
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const hasMeaningfulVisitorData = (visitor) => {
  if (!visitor) return false;

  const meaningfulFields = [
    visitor.visitorName,
    visitor.visitorEmail,
    visitor.entryStartDate,
    visitor.entryEndDate,
    visitor.entryStartTime,
    visitor.entryEndTime,
    visitor.reason,
    visitor.nightWorkRequired,
    visitor.nightWorkStartTime,
    visitor.nightWorkEndTime,
    visitor.visitingBuilding,
    visitor.visitingSection,
    visitor.meetingWith,
    visitor.vehicleParking,
    visitor.vehicleNumber,
    visitor.telephoneNumber,
    visitor.companyName,
    visitor.laptopSerialNumber,
  ];

  return (
    meaningfulFields.some(
      (field) =>
        field !== "" &&
        field !== null &&
        field !== undefined
    ) || visitor.attachments?.length > 0
  );
};

const getVisitorMissingFields = (visitor, visitorType) => {
  const missingFields = [];

  const addMissing = (field, label) => {
    if (
      visitor[field] === "" ||
      visitor[field] === null ||
      visitor[field] === undefined
    ) {
      missingFields.push({ field, label });
    }
  };

  addMissing("visitorName", "Visitor Name");
  addMissing("visitorEmail", "Visitor Email");
  addMissing("passType", "Pass Type");
  addMissing("reason", "Reason for Visit");

  if (visitor.visitorEmail && !isValidEmail(visitor.visitorEmail)) {
    missingFields.push({
      field: "visitorEmail",
      label: "Valid Visitor Email",
    });
  }

  if (visitor.passType === "One Day") {
    addMissing("entryStartDate", "Entry Date");
    addMissing("entryStartTime", "Start Time");
    addMissing("entryEndTime", "End Time");
  }

  if (visitor.passType === "More Than One Day") {
    addMissing("entryStartDate", "Entry Start Date");
    addMissing("entryEndDate", "Entry End Date");
  }

  if (visitorType !== "Emp. Child") {
    addMissing("nightWorkRequired", "Night Work Required");
  }

  if (visitor.nightWorkRequired === "Yes") {
    addMissing("nightWorkStartTime", "Night Work Start Time");
    addMissing("nightWorkEndTime", "Night Work End Time");
  }

  if (visitor.vehicleParking === "Yes") {
    addMissing("vehicleNumber", "Vehicle Number");
  }

  if (visitorType === "Trainee") {
    addMissing("laptopSerialNumber", "Laptop Serial Number");
  }

  return missingFields;
};

const sanitizeVisitorForShare = (visitor) => ({
  ...visitor,
  attachments: (visitor.attachments || []).map((file) => ({
    name: file.name || "Uploaded file",
    size: file.size || "",
    type: file.type || "",
  })),
});

const encodeSharedFormData = (values) => {
  const safeValues = {
    ...values,
    currentVisitor: sanitizeVisitorForShare(values.currentVisitor),
    addedVisitors: (values.addedVisitors || []).map(
      sanitizeVisitorForShare
    ),
  };

  const json = JSON.stringify(safeValues);
  return btoa(unescape(encodeURIComponent(json)));
};

const decodeSharedFormData = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const sharedForm = params.get("sharedForm");

    if (!sharedForm) return null;

    const json = decodeURIComponent(escape(atob(sharedForm)));
    const parsedValues = JSON.parse(json);

    return {
      ...initialValues,
      ...parsedValues,
      currentVisitor: buildVisitorDetailValues(
        parsedValues.currentVisitor || {}
      ),
      addedVisitors:
        parsedValues.addedVisitors?.length > 0
          ? parsedValues.addedVisitors.map((visitor) =>
              buildVisitorDetailValues(visitor)
            )
          : [],
    };
  } catch (error) {
    console.error("Invalid shared form link", error);
    return null;
  }
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

  const sharedInitialValues = useMemo(() => decodeSharedFormData(), []);
  const isSharedFormView = Boolean(sharedInitialValues);

  const [showForm, setShowForm] = useState(isSharedFormView);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareEmailError, setShareEmailError] = useState("");

  const [addVisitorConfirmOpen, setAddVisitorConfirmOpen] =
    useState(false);

  const [validationDialogOpen, setValidationDialogOpen] =
    useState(false);

  const [validationMessage, setValidationMessage] = useState("");

  const [selectedAddedVisitorIndex, setSelectedAddedVisitorIndex] =
    useState(null);

  const getCurrentVisitorSummary = (visitor) => [
    {
      label: "Visitor Name",
      value: visitor.visitorName || "-",
    },
    {
      label: "Visitor Email",
      value: visitor.visitorEmail || "-",
    },
    {
      label: "Pass Type",
      value: visitor.passType || "-",
    },
    {
      label: "Entry Date",
      value:
        visitor.passType === "More Than One Day"
          ? `${visitor.entryStartDate || "-"} to ${
              visitor.entryEndDate || "-"
            }`
          : visitor.entryStartDate || "-",
    },
    {
      label: "Reason",
      value: visitor.reason || "-",
    },
  ];

  const markCurrentVisitorTouched = (formik, fields) => {
    fields.forEach(({ field }) => {
      formik.setFieldTouched(`currentVisitor.${field}`, true, false);
    });
  };

  const handleOpenAddVisitorConfirm = (formik) => {
    const currentVisitor = formik.values.currentVisitor;
    const missingFields = getVisitorMissingFields(
      currentVisitor,
      formik.values.visitorType
    );

    if (missingFields.length > 0) {
      markCurrentVisitorTouched(formik, missingFields);

      setValidationMessage(
        `Please complete these required fields before adding the visitor: ${missingFields
          .map((item) => item.label)
          .join(", ")}.`
      );

      setValidationDialogOpen(true);
      return;
    }

    setAddVisitorConfirmOpen(true);
  };

  const handleConfirmAddVisitor = (formik) => {
    const currentVisitor = buildVisitorDetailValues(
      formik.values.currentVisitor
    );

    const updatedVisitors = [
      ...(formik.values.addedVisitors || []),
      currentVisitor,
    ];

    formik.setFieldValue("addedVisitors", updatedVisitors);
    formik.setFieldValue(
      "currentVisitor",
      buildVisitorDetailValues()
    );

    setAddVisitorConfirmOpen(false);
  };

  const handleRemoveAddedVisitor = (formik, index) => {
    const updatedVisitors = formik.values.addedVisitors.filter(
      (_, visitorIndex) => visitorIndex !== index
    );

    formik.setFieldValue("addedVisitors", updatedVisitors);
    setSelectedAddedVisitorIndex(null);
  };

  const handleOpenShareDialog = () => {
    setShareEmail("");
    setShareEmailError("");
    setShareDialogOpen(true);
  };

  const handleCloseShareDialog = () => {
    setShareDialogOpen(false);
    setShareEmail("");
    setShareEmailError("");
  };

  const buildShareableFormLink = (values) => {
    const encodedForm = encodeSharedFormData(values);
    const baseUrl = `${window.location.origin}${window.location.pathname}`;

    return `${baseUrl}?sharedForm=${encodeURIComponent(encodedForm)}`;
  };

  const handleShareFormLinkToEmail = (formik) => {
    const trimmedEmail = shareEmail.trim();

    if (!trimmedEmail) {
      setShareEmailError("Please enter an email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setShareEmailError("Please enter a valid email address.");
      return;
    }

    const formViewLink = buildShareableFormLink(formik.values);

    const subject = `Visitor Entry Request Form Link - ${
      formik.values.visitorType || "Visitor"
    }`;

    const body = `Dear Sir/Madam,

Please open the visitor entry request form using the link below:

${formViewLink}

Thank you.`;

    const mailtoLink = `mailto:${encodeURIComponent(
      trimmedEmail
    )}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    handleCloseShareDialog();
  };

  const handleFormReset = (formik) => {
    formik.setValues({
      ...initialValues,
      visitorType: formik.values.visitorType,
      currentVisitor: buildVisitorDetailValues(),
      addedVisitors: [],
    });
  };

  const getAllVisitorsForSubmit = (values) => {
    const visitors = [...(values.addedVisitors || [])];

    if (hasMeaningfulVisitorData(values.currentVisitor)) {
      visitors.push(values.currentVisitor);
    }

    return visitors;
  };

  const handleSubmit = (values) => {
    const currentVisitorHasData = hasMeaningfulVisitorData(
      values.currentVisitor
    );

    if (currentVisitorHasData) {
      const missingFields = getVisitorMissingFields(
        values.currentVisitor,
        values.visitorType
      );

      if (missingFields.length > 0) {
        setValidationMessage(
          `Please complete the current visitor details or add the visitor to the preview table first. Missing fields: ${missingFields
            .map((item) => item.label)
            .join(", ")}.`
        );

        setValidationDialogOpen(true);
        return;
      }
    }

    const finalVisitors = getAllVisitorsForSubmit(values);

    if (finalVisitors.length === 0) {
      setValidationMessage(
        "Please add at least one visitor before submitting the request."
      );

      setValidationDialogOpen(true);
      return;
    }

    const {
      currentVisitor,
      addedVisitors,
      ...requesterAndFormValues
    } = values;

    const payload = {
      ...requesterAndFormValues,
      visitors: finalVisitors,
    };

    console.log(payload);

    setRequestSubmitted(true);

    if (onRequestCreated) {
      onRequestCreated(payload);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#FFFFFF",
        padding: 0,
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
            background: "linear-gradient(135deg,#021C54,#0A2F88)",
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
            {isSharedFormView
              ? "Shared visitor form view."
              : "Fill in the details below to register a visitor entry request."}
          </Typography>
        </Box>

        <Formik
          initialValues={sharedInitialValues || initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const selectedColor =
              visitorTypeColors[formik.values.visitorType] ||
              "#071B52";

            const activeStep = requestSubmitted
              ? 2
              : showForm
              ? 1
              : 0;

            const currentVisitorFormik = createNestedVisitorFormik(
              formik,
              "currentVisitor"
            );

            const selectedAddedVisitorFormik =
              selectedAddedVisitorIndex !== null
                ? createNestedVisitorFormik(
                    formik,
                    `addedVisitors.${selectedAddedVisitorIndex}`
                  )
                : null;

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
                    <Box sx={{ mb: 6 }}>
                      <VisitorTypeSection
                        formik={formik}
                        onAutoNext={() => setShowForm(true)}
                      />
                    </Box>
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
                      {isSharedFormView && (
                        <Paper
                          elevation={0}
                          sx={{
                            mb: 3,
                            p: 2.5,
                            borderRadius: "18px",
                            border: "1px solid #BFDBFE",
                            background: "#EFF6FF",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#1E3A8A",
                              fontWeight: 800,
                              fontSize: "15px",
                            }}
                          >
                            Shared Form View
                          </Typography>

                          <Typography
                            sx={{
                              color: "#475569",
                              fontSize: "13px",
                              mt: 0.5,
                            }}
                          >
                            This form was opened from a shared link.
                          </Typography>
                        </Paper>
                      )}

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
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#fff",
                          }}
                        >
                          Visitor Category:{" "}
                          {formik.values.visitorType}
                        </Typography>

                        {!isSharedFormView && (
                          <Button
                            type="button"
                            onClick={() => setShowForm(false)}
                            sx={{
                              borderRadius: "14px",
                              px: 2.5,
                              py: 1,
                              color: "#fff",
                              background:
                                "rgba(255,255,255,0.15)",
                              textTransform: "none",
                              fontWeight: 600,

                              "&:hover": {
                                background:
                                  "rgba(255,255,255,0.25)",
                              },
                            }}
                          >
                            Change Visitor Type
                          </Button>
                        )}
                      </Box>

                      <Box sx={{ mb: 5 }}>
                        <RequesterDetailsSection
                          formik={formik}
                          headerActions={
                            !isSharedFormView ? (
                              <Button
                                type="button"
                                size="small"
                                variant="contained"
                                onClick={handleOpenShareDialog}
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
                            ) : null
                          }
                        />
                      </Box>

                      <Paper
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
                          formik={currentVisitorFormik}
                          title="Visit Details"
                        />

                        <SupportingDocumentsSection
                          values={currentVisitorFormik.values}
                          setFieldValue={
                            currentVisitorFormik.setFieldValue
                          }
                        />

                        {!isSharedFormView && (
                          <Box
                            sx={{
                              mt: 3,
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              gap: 2,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "#64748B",
                                fontWeight: 500,
                              }}
                            >
                              Confirm current visitor details before
                              adding another visitor.
                            </Typography>

                            <Button
                              type="button"
                              variant="contained"
                              onClick={() =>
                                handleOpenAddVisitorConfirm(formik)
                              }
                              sx={{
                                borderRadius: "14px",
                                px: 3,
                                py: 1.1,
                                textTransform: "none",
                                fontWeight: 800,
                                fontSize: "14px",
                                background:
                                  "linear-gradient(135deg,#16A34A,#22C55E)",
                                boxShadow:
                                  "0px 10px 22px rgba(34,197,94,0.22)",

                                "&:hover": {
                                  background:
                                    "linear-gradient(135deg,#15803D,#16A34A)",
                                },
                              }}
                            >
                              + Visitor
                            </Button>
                          </Box>
                        )}
                      </Paper>

                      <AddedVisitorsPreview
                        visitors={formik.values.addedVisitors}
                        onViewMore={(index) =>
                          setSelectedAddedVisitorIndex(index)
                        }
                      />

                      {!isSharedFormView && (
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
                            type="button"
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
                              type="button"
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
                      )}
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
                          boxShadow:
                            "0 10px 25px rgba(34,197,94,0.25)",
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
                        Your visitor request has been sent for
                        supervisor approval.
                      </Typography>
                    </Paper>
                  )}
                </Box>

                <Dialog
                  open={shareDialogOpen}
                  onClose={handleCloseShareDialog}
                  maxWidth="sm"
                  fullWidth
                  PaperProps={{
                    sx: {
                      borderRadius: "20px",
                    },
                  }}
                >
                  <DialogTitle
                    sx={{
                      fontWeight: 800,
                      color: "#071B52",
                      pb: 1,
                    }}
                  >
                    Share Form View Link
                  </DialogTitle>

                  <DialogContent>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#64748B",
                        mb: 2,
                      }}
                    >
                      Enter the email address. The email will contain
                      only a link to open this full form view.
                    </Typography>

                    <TextField
                      autoFocus
                      fullWidth
                      label="Recipient Email"
                      placeholder="example@gmail.com"
                      value={shareEmail}
                      onChange={(event) => {
                        setShareEmail(event.target.value);
                        setShareEmailError("");
                      }}
                      error={Boolean(shareEmailError)}
                      helperText={shareEmailError}
                      sx={{
                        mt: 1,

                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                        },
                      }}
                    />
                  </DialogContent>

                  <DialogActions
                    sx={{
                      px: 3,
                      pb: 3,
                    }}
                  >
                    <Button
                      type="button"
                      onClick={handleCloseShareDialog}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      variant="contained"
                      onClick={() =>
                        handleShareFormLinkToEmail(formik)
                      }
                      sx={{
                        borderRadius: "12px",
                        px: 3,
                        textTransform: "none",
                        fontWeight: 700,
                        background:
                          "linear-gradient(135deg,#021C54,#0A2F88)",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg,#021C54,#0A2F88)",
                        },
                      }}
                    >
                      Send Link
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={addVisitorConfirmOpen}
                  onClose={() => setAddVisitorConfirmOpen(false)}
                  maxWidth="sm"
                  fullWidth
                  PaperProps={{
                    sx: {
                      borderRadius: "24px",
                    },
                  }}
                >
                  <DialogTitle
                    sx={{
                      fontWeight: 900,
                      color: "#071B52",
                      pb: 1,
                    }}
                  >
                    Confirm Visitor Details
                  </DialogTitle>

                  <DialogContent>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#64748B",
                        mb: 2.5,
                      }}
                    >
                      Please confirm the current visitor details. After
                      confirmation, the visitor fields will be cleared
                      and requester details will remain unchanged.
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "1fr 1fr",
                        },
                        gap: 1.5,
                      }}
                    >
                      {getCurrentVisitorSummary(
                        formik.values.currentVisitor
                      ).map((item) => (
                        <Paper
                          key={item.label}
                          elevation={0}
                          sx={{
                            p: 1.8,
                            borderRadius: "16px",
                            border: "1px solid #E2E8F0",
                            background: "#F8FAFC",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "11px",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "#64748B",
                              fontWeight: 800,
                              mb: 0.5,
                            }}
                          >
                            {item.label}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#0F172A",
                              fontWeight: 700,
                              wordBreak: "break-word",
                            }}
                          >
                            {item.value}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </DialogContent>

                  <DialogActions
                    sx={{
                      px: 3,
                      pb: 3,
                    }}
                  >
                    <Button
                      type="button"
                      onClick={() => setAddVisitorConfirmOpen(false)}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 700,
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => handleConfirmAddVisitor(formik)}
                      sx={{
                        borderRadius: "12px",
                        px: 3,
                        textTransform: "none",
                        fontWeight: 800,
                        background:
                          "linear-gradient(135deg,#16A34A,#22C55E)",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg,#15803D,#16A34A)",
                        },
                      }}
                    >
                      Confirm & Add
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={validationDialogOpen}
                  onClose={() => setValidationDialogOpen(false)}
                  maxWidth="sm"
                  fullWidth
                  PaperProps={{
                    sx: {
                      borderRadius: "22px",
                    },
                  }}
                >
                  <DialogTitle
                    sx={{
                      fontWeight: 900,
                      color: "#B45309",
                    }}
                  >
                    Required Details Missing
                  </DialogTitle>

                  <DialogContent>
                    <Typography
                      sx={{
                        color: "#475569",
                        fontSize: "14px",
                        lineHeight: 1.8,
                      }}
                    >
                      {validationMessage}
                    </Typography>
                  </DialogContent>

                  <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => setValidationDialogOpen(false)}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 800,
                        background:
                          "linear-gradient(135deg,#021C54,#0A2F88)",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg,#021C54,#0A2F88)",
                        },
                      }}
                    >
                      Back to Form
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={selectedAddedVisitorIndex !== null}
                  onClose={() => setSelectedAddedVisitorIndex(null)}
                  maxWidth="lg"
                  fullWidth
                  PaperProps={{
                    sx: {
                      borderRadius: "24px",
                    },
                  }}
                >
                  <DialogTitle
                    sx={{
                      fontWeight: 900,
                      color: "#071B52",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Box>
                      Visitor Full Details

                      {selectedAddedVisitorIndex !== null && (
                        <Chip
                          label={`Visitor ${
                            selectedAddedVisitorIndex + 1
                          }`}
                          size="small"
                          sx={{
                            ml: 1.5,
                            fontWeight: 800,
                            color: "#0A2F88",
                            background: "#E8F0FF",
                          }}
                        />
                      )}
                    </Box>

                    {selectedAddedVisitorIndex !== null && (
                      <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleRemoveAddedVisitor(
                            formik,
                            selectedAddedVisitorIndex
                          )
                        }
                        sx={{
                          borderRadius: "12px",
                          textTransform: "none",
                          fontWeight: 800,
                        }}
                      >
                        Remove Visitor
                      </Button>
                    )}
                  </DialogTitle>

                  <DialogContent
                    sx={{
                      pt: 1,
                    }}
                  >
                    {selectedAddedVisitorFormik && (
                      <>
                        <VisitDetailsSection
                          formik={selectedAddedVisitorFormik}
                          title="Editable Visitor Details"
                        />

                        <SupportingDocumentsSection
                          values={selectedAddedVisitorFormik.values}
                          setFieldValue={
                            selectedAddedVisitorFormik.setFieldValue
                          }
                        />
                      </>
                    )}
                  </DialogContent>

                  <DialogActions
                    sx={{
                      px: 3,
                      pb: 3,
                    }}
                  >
                    <Button
                      type="button"
                      onClick={() => setSelectedAddedVisitorIndex(null)}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 700,
                      }}
                    >
                      Close
                    </Button>

                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => setSelectedAddedVisitorIndex(null)}
                      sx={{
                        borderRadius: "12px",
                        px: 3,
                        textTransform: "none",
                        fontWeight: 800,
                        background:
                          "linear-gradient(135deg,#021C54,#0A2F88)",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg,#021C54,#0A2F88)",
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Box>
  );
}

export default CreateRequestForm;