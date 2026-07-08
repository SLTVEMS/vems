import { Formik, Form, getIn } from "formik";
import { useMemo, useState } from "react";
import * as Yup from "yup";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import VisitorTypeSection from "../components/VisitorTypeSection";
import RequesterDetailsSection from "../components/RequesterDetailsSection";
import VisitDetailsSection from "../components/VisitDetailsSection";
import FormProgressTracker from "../components/FormProgressTracker";
import AddedVisitorsPreview from "../components/AddedVisitorsPreview";
import VisitorSuccessScreen from "../components/VisitorSuccessScreen";
import AnimatedStatusDialog from "../components/AnimatedStatusDialog";

const sriLankanMobileNumber =
  /^(?:\+94|0)(70|71|72|74|75|76|77|78)\d{7}$/;

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
  telephoneNumber: Yup.string().matches(sriLankanMobileNumber, {
    message: "Enter a valid Sri Lankan mobile number",
    excludeEmptyString: true,
  }),
  laptopSerialNumber: Yup.string(),
  attachments: Yup.array().notRequired(),
});

const validationSchema = Yup.object({
  visitorType: Yup.string().required(),

  requestDate: Yup.string().required(),

  requesterName: Yup.string().required(),

  requesterEmail: Yup.string().email("Invalid Email").required(),

  requesterServiceNo: Yup.string().required(),

  requesterDesignation: Yup.string().required(),

  requesterContactNo: Yup.string()
    .matches(
      sriLankanMobileNumber,
      "Enter a valid Sri Lankan mobile number"
    )
    .required(),

  costCenterCode: Yup.string().required(),

  costCenterName: Yup.string().required(),

  currentVisitor: visitorValidationSchema.notRequired(),

  addedVisitors: Yup.array().of(visitorValidationSchema).notRequired(),

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

const visitorTypeColors = {
  Guest: "#2F80ED",
  Contractor: "#FF7F22",
  Canteen: "#30C28E",
  Trainee: "#AF52DE",
  "Emp. Child": "#2DB7D9",
};

const requesterRequiredFields = [
  { field: "requestDate", label: "Request Date" },
  { field: "requesterName", label: "Requester Name" },
  { field: "requesterEmail", label: "Requester Email" },
  { field: "requesterServiceNo", label: "Requester Service No" },
  { field: "requesterDesignation", label: "Requester Designation" },
  { field: "requesterContactNo", label: "Requester Contact No" },
  { field: "costCenterCode", label: "Cost Center Code" },
  { field: "costCenterName", label: "Cost Center Name" },
];

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
      formik.setFieldValue(`${path}.${field}`, value, shouldValidate),

    setFieldTouched: (field, touched, shouldValidate) =>
      formik.setFieldTouched(`${path}.${field}`, touched, shouldValidate),

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

const buildSharedRequesterValues = (values = {}) => ({
  visitorType: values.visitorType || "",
  requestDate: values.requestDate || "",
  requesterName: values.requesterName || "",
  requesterEmail: values.requesterEmail || "",
  requesterServiceNo: values.requesterServiceNo || "",
  requesterDesignation: values.requesterDesignation || "",
  requesterContactNo: values.requesterContactNo || "",
  costCenterCode: values.costCenterCode || "",
  costCenterName: values.costCenterName || "",
});

const encodeBase64Url = (value) => {
  const utf8Bytes = encodeURIComponent(value).replace(
    /%([0-9A-F]{2})/g,
    (_, hex) => String.fromCharCode(Number.parseInt(hex, 16))
  );

  return btoa(utf8Bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const decodeBase64Url = (value) => {
  const normalizedValue = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedValue =
    normalizedValue +
    "=".repeat((4 - (normalizedValue.length % 4)) % 4);

  const binaryValue = atob(paddedValue);
  const percentEncodedValue = Array.from(binaryValue)
    .map((character) =>
      `%${character.charCodeAt(0).toString(16).padStart(2, "0")}`
    )
    .join("");

  return decodeURIComponent(percentEncodedValue);
};

const decodeLegacySharedFormValue = (value) => {
  return decodeURIComponent(escape(atob(value)));
};

const encodeSharedFormData = (values) => {
  const safeValues = {
    ...initialValues,
    ...buildSharedRequesterValues(values),
    currentVisitor: sanitizeVisitorForShare(
      values.currentVisitor || buildVisitorDetailValues()
    ),
    addedVisitors: [],
    sharedFormMode: true,
  };

  const json = JSON.stringify(safeValues);
  return encodeBase64Url(json);
};

const decodeSharedFormData = () => {
  try {
    if (typeof window === "undefined") return null;

    const params = new URLSearchParams(window.location.search);
    const sharedForm = params.get("sharedForm");

    if (!sharedForm) return null;

    let json = "";

    try {
      json = decodeBase64Url(sharedForm);
    } catch {
      json = decodeLegacySharedFormValue(sharedForm);
    }

    const parsedValues = JSON.parse(json);

    return {
      ...initialValues,
      ...buildSharedRequesterValues(parsedValues),
      currentVisitor: buildVisitorDetailValues(
        parsedValues.currentVisitor || {}
      ),
      addedVisitors: [],
    };
  } catch (error) {
    console.error("Invalid shared form link", error);
    return null;
  }
};

const scrollToFormTop = () => {
  window.setTimeout(() => {
    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  }, 80);
};

function CreateRequestForm({ onClose, onRequestCreated } = {}) {
  const sharedInitialValues = useMemo(() => decodeSharedFormData(), []);
  const isSharedFormView = Boolean(sharedInitialValues);

  const [showForm, setShowForm] = useState(isSharedFormView);
  const [showVisitorDetails, setShowVisitorDetails] =
    useState(isSharedFormView);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareEmailError, setShareEmailError] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  const [statusDialog, setStatusDialog] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [validationDialogOpen, setValidationDialogOpen] =
    useState(false);

  const [validationMessage, setValidationMessage] = useState("");

  const [selectedAddedVisitorIndex, setSelectedAddedVisitorIndex] =
    useState(null);

  const showToast = (message, severity = "success") => {
    setToast({
      open: true,
      severity,
      message,
    });
  };

  const markRequesterTouched = (formik, fields) => {
    fields.forEach(({ field }) => {
      formik.setFieldTouched(field, true, false);
    });
  };

  const markCurrentVisitorTouched = (formik, fields) => {
    fields.forEach(({ field }) => {
      formik.setFieldTouched(`currentVisitor.${field}`, true, false);
    });
  };

  const getRequesterMissingFields = (values, errors = {}) => {
    const missingFields = [];

    requesterRequiredFields.forEach(({ field, label }) => {
      if (
        values[field] === "" ||
        values[field] === null ||
        values[field] === undefined
      ) {
        missingFields.push({ field, label });
      }
    });

    if (values.requesterEmail && errors.requesterEmail) {
      missingFields.push({
        field: "requesterEmail",
        label: "Valid Requester Email",
      });
    }

    if (values.requesterContactNo && errors.requesterContactNo) {
      missingFields.push({
        field: "requesterContactNo",
        label: "Valid Requester Contact No",
      });
    }

    return missingFields;
  };

  const validateRequesterDetails = async (formik, actionName) => {
    const errors = await formik.validateForm();
    const missingFields = getRequesterMissingFields(
      formik.values,
      errors
    );

    if (missingFields.length > 0) {
      markRequesterTouched(formik, missingFields);

      setValidationMessage(
        `Please complete requester details before ${actionName}: ${missingFields
          .map((item) => item.label)
          .join(", ")}.`
      );

      setValidationDialogOpen(true);
      return false;
    }

    return true;
  };

  const validateCurrentVisitorDetails = (formik, actionName) => {
    const missingFields = getVisitorMissingFields(
      formik.values.currentVisitor,
      formik.values.visitorType
    );

    if (missingFields.length > 0) {
      markCurrentVisitorTouched(formik, missingFields);

      setValidationMessage(
        `Please complete visitor details before ${actionName}: ${missingFields
          .map((item) => item.label)
          .join(", ")}.`
      );

      setValidationDialogOpen(true);
      return false;
    }

    return true;
  };

  const resetCurrentVisitor = (formik) => {
    formik.setFieldValue(
      "currentVisitor",
      buildVisitorDetailValues(),
      false
    );

    const nextTouched = { ...formik.touched };
    delete nextTouched.currentVisitor;
    formik.setTouched(nextTouched, false);
  };

  const addCurrentVisitorToPreview = (formik) => {
    const currentVisitor = buildVisitorDetailValues(
      formik.values.currentVisitor
    );

    const updatedVisitors = [
      ...(formik.values.addedVisitors || []),
      currentVisitor,
    ];

    formik.setFieldValue("addedVisitors", updatedVisitors, false);

    return updatedVisitors;
  };

  const handleRevealVisitorDetails = async (formik) => {
    const requesterValid = await validateRequesterDetails(
      formik,
      "entering visitor details"
    );

    if (!requesterValid) return;

    setShowVisitorDetails(true);
    scrollToFormTop();
  };

  const handleSubmitAndAddVisitor = (formik) => {
    if (!validateCurrentVisitorDetails(formik, "adding the visitor")) {
      return;
    }

    addCurrentVisitorToPreview(formik);
    resetCurrentVisitor(formik);
    setShowVisitorDetails(true);

    showToast(
      "Visitor added successfully. You can enter the next visitor now."
    );
  };

  const handleSubmitCurrentVisitorAndReturn = (formik) => {
    if (!validateCurrentVisitorDetails(formik, "submitting the visitor")) {
      return;
    }

    addCurrentVisitorToPreview(formik);
    resetCurrentVisitor(formik);
    setShowVisitorDetails(false);

    showToast("Visitor details submitted to the preview table.");
    scrollToFormTop();
  };

  const handleRemoveAddedVisitor = (formik, index) => {
    const updatedVisitors = formik.values.addedVisitors.filter(
      (_, visitorIndex) => visitorIndex !== index
    );

    formik.setFieldValue("addedVisitors", updatedVisitors, false);
    setSelectedAddedVisitorIndex(null);

    showToast("Visitor removed from preview table.", "info");
  };

  const handleOpenShareDialog = async (formik) => {
    const requesterValid = await validateRequesterDetails(
      formik,
      "sending the form link"
    );

    if (!requesterValid) return;

    setShareEmail("");
    setShareEmailError("");
    setShareDialogOpen(true);
  };

  const handleCloseShareDialog = () => {
    if (isSendingEmail) return;

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

    setIsSendingEmail(true);

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

    window.setTimeout(() => {
      window.location.href = mailtoLink;

      setIsSendingEmail(false);
      setShareDialogOpen(false);
      setShareEmail("");
      setShareEmailError("");
      setShowVisitorDetails(false);

      setStatusDialog({
        open: true,
        type: "email",
        title: "Email Link Prepared Successfully",
        message:
          "The visitor invitation link has been prepared in your email application.",
      });
    }, 650);
  };

  const handleFormReset = (formik) => {
    formik.setValues({
      ...initialValues,
      visitorType: formik.values.visitorType,
      currentVisitor: buildVisitorDetailValues(),
      addedVisitors: [],
    });

    setShowVisitorDetails(false);

    showToast("Form cleared. Visitor type has been kept.", "info");
  };

  const buildPayload = (values, visitors) => {
    const {
      currentVisitor,
      addedVisitors,
      ...requesterAndFormValues
    } = values;

    return {
      ...requesterAndFormValues,
      visitors,
    };
  };

  const handleFinalSubmit = async (formik) => {
    const requesterValid = await validateRequesterDetails(
      formik,
      "submitting the request"
    );

    if (!requesterValid) return;

    let finalVisitors = [...(formik.values.addedVisitors || [])];

    if (isSharedFormView) {
      if (
        !validateCurrentVisitorDetails(
          formik,
          "submitting the shared form"
        )
      ) {
        return;
      }

      finalVisitors = [
        buildVisitorDetailValues(formik.values.currentVisitor),
      ];
    } else if (hasMeaningfulVisitorData(formik.values.currentVisitor)) {
      setValidationMessage(
        "Please press Submit or Add Visitor and Submit to move the current visitor details to the preview table before final submission."
      );

      setValidationDialogOpen(true);
      return;
    }

    if (finalVisitors.length === 0) {
      setValidationMessage(
        "Please add at least one visitor to the preview table before submitting the request."
      );

      setValidationDialogOpen(true);
      return;
    }

    const payload = buildPayload(formik.values, finalVisitors);

    setIsSubmittingRequest(true);

    window.setTimeout(() => {
      console.log(payload);

      setIsSubmittingRequest(false);
      setRequestSubmitted(true);

      setStatusDialog({
        open: true,
        type: "submit",
        title: "Request Submitted Successfully",
        message: "Your visitor request has been sent for approval.",
      });

      if (onRequestCreated) {
        onRequestCreated(payload);
      }
    }, 750);
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
              ? "Shared visitor form view. Complete the visitor details below."
              : "Fill in the details below to register a visitor entry request."}
          </Typography>
        </Box>

        <Formik
          initialValues={sharedInitialValues || initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {(formik) => {
            const selectedColor =
              visitorTypeColors[formik.values.visitorType] ||
              "#071B52";

            const activeStep = requestSubmitted ? 2 : showForm ? 1 : 0;

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

            const finalSubmitText =
              formik.values.addedVisitors?.length > 1
                ? "Submit Requests"
                : "Submit Request";

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
                  {!requestSubmitted && (
                    <FormProgressTracker
                      activeStep={activeStep}
                      activeColor={selectedColor}
                    />
                  )}

                  {!showForm && !requestSubmitted && (
                    <Box sx={{ mb: 6 }}>
                      <VisitorTypeSection
                        formik={formik}
                        onAutoNext={() => {
                          setShowForm(true);
                          setShowVisitorDetails(false);
                        }}
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
                            Requester details are automatically filled
                            from the original request. The visitor only
                            needs to complete the visit details, reason,
                            and supporting documents.
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
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#fff",
                          }}
                        >
                          Visitor Category: {formik.values.visitorType}
                        </Typography>

                        {!isSharedFormView && (
                          <Button
                            type="button"
                            onClick={() => {
                              setShowForm(false);
                              setShowVisitorDetails(false);
                            }}
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

                      <Box sx={{ mb: 0 }}>
                        <RequesterDetailsSection formik={formik} />
                      </Box>

                      {!isSharedFormView && !showVisitorDetails && (
                        <Paper
                          elevation={0}
                          sx={{
                            mt: 3,
                            mb: 4,
                            px: {
                              xs: 2,
                              md: 2.5,
                            },
                            py: {
                              xs: 2,
                              md: 2,
                            },
                            borderRadius: "18px",
                            border: "1px solid #DDE6F3",
                            background:
                              "linear-gradient(135deg,#F8FAFC 0%,#FFFFFF 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            flexWrap: {
                              xs: "wrap",
                              md: "nowrap",
                            },
                            textAlign: "left",
                            boxShadow:
                              "0 10px 26px rgba(15,23,42,0.05)",
                            animation:
                              "nextStepActionBarReveal 0.35s ease",

                            "@keyframes nextStepActionBarReveal": {
                              from: {
                                opacity: 0,
                                transform: "translateY(10px)",
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
                              flex: "1 1 auto",
                              minWidth: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              gap: 1.3,
                              textAlign: "left",
                            }}
                          >
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "#22C55E",
                                flexShrink: 0,
                                position: "relative",
                                boxShadow:
                                  "0 0 0 4px rgba(34,197,94,0.12)",
                                animation:
                                  "nextStepPointGlow 1.4s ease-in-out infinite",

                                "@keyframes nextStepPointGlow": {
                                  "0%": {
                                    boxShadow:
                                      "0 0 0 4px rgba(34,197,94,0.12)",
                                  },
                                  "50%": {
                                    boxShadow:
                                      "0 0 0 8px rgba(34,197,94,0.05)",
                                  },
                                  "100%": {
                                    boxShadow:
                                      "0 0 0 4px rgba(34,197,94,0.12)",
                                  },
                                },

                                "&::after": {
                                  content: '""',
                                  position: "absolute",
                                  inset: -5,
                                  borderRadius: "50%",
                                  border:
                                    "1px solid rgba(34,197,94,0.35)",
                                  animation:
                                    "nextStepPointPulse 1.4s ease-in-out infinite",
                                },

                                "@keyframes nextStepPointPulse": {
                                  "0%": {
                                    transform: "scale(0.8)",
                                    opacity: 0.8,
                                  },
                                  "70%": {
                                    transform: "scale(1.8)",
                                    opacity: 0,
                                  },
                                  "100%": {
                                    transform: "scale(0.8)",
                                    opacity: 0,
                                  },
                                },
                              }}
                            />

                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "#64748B",
                                lineHeight: 1.6,
                                textAlign: "left",
                                whiteSpace: {
                                  xs: "normal",
                                  md: "nowrap",
                                },
                                overflow: {
                                  xs: "visible",
                                  md: "hidden",
                                },
                                textOverflow: {
                                  xs: "clip",
                                  md: "ellipsis",
                                },
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 900,
                                  color: "#071B52",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.04em",
                                  mr: 1,
                                }}
                              >
                                Next Step
                              </Box>
                              Enter the visitor details yourself or send a
                              secure form link for the visitor to complete.
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: {
                                xs: "flex-start",
                                md: "flex-end",
                              },
                              gap: 1.4,
                              flexWrap: "wrap",
                              flexShrink: 0,
                            }}
                          >
                            <Button
                              type="button"
                              variant="contained"
                              startIcon={
                                <Box
                                  component="span"
                                  sx={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.18)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 900,
                                    fontSize: 16,
                                  }}
                                >
                                  +
                                </Box>
                              }
                              onClick={() =>
                                handleRevealVisitorDetails(formik)
                              }
                              sx={{
                                borderRadius: "14px",
                                px: 2.8,
                                py: 1.15,
                                textTransform: "none",
                                fontWeight: 800,
                                fontSize: "14px",
                                background:
                                  "linear-gradient(135deg,#16A34A,#22C55E)",
                                boxShadow:
                                  "0px 9px 20px rgba(34,197,94,0.20)",
                                transition: "all 0.25s ease",

                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  background:
                                    "linear-gradient(135deg,#15803D,#16A34A)",
                                  boxShadow:
                                    "0px 13px 26px rgba(34,197,94,0.28)",
                                },
                              }}
                            >
                              Enter Visitor Details
                            </Button>

                            <Button
                              type="button"
                              variant="outlined"
                              startIcon={
                                <Box
                                  component="span"
                                  sx={{
                                    fontSize: 16,
                                    lineHeight: 1,
                                  }}
                                >
                                  ✉
                                </Box>
                              }
                              onClick={() => handleOpenShareDialog(formik)}
                              sx={{
                                borderRadius: "14px",
                                px: 2.8,
                                py: 1.1,
                                textTransform: "none",
                                fontWeight: 800,
                                fontSize: "14px",
                                borderColor: "#BFD0EA",
                                color: "#071B52",
                                background: "#FFFFFF",
                                transition: "all 0.25s ease",

                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  borderColor: "#0A2F88",
                                  background: "#EFF6FF",
                                  boxShadow:
                                    "0px 10px 22px rgba(10,47,136,0.12)",
                                },
                              }}
                            >
                              Send Form Link
                            </Button>
                          </Box>
                        </Paper>
                      )}

                      {showVisitorDetails && (
                        <Paper
                          elevation={0}
                          sx={{
                            mt: 2,
                            mb: 4,
                            p: 3,
                            borderRadius: "24px",
                            border: "1px solid #E2E8F0",
                            background: "#FFFFFF",
                            animation:
                              "visitorSectionReveal 0.45s ease",

                            "@keyframes visitorSectionReveal": {
                              from: {
                                opacity: 0,
                                transform:
                                  "translateY(18px) scale(0.99)",
                              },
                              to: {
                                opacity: 1,
                                transform: "translateY(0) scale(1)",
                              },
                            },
                          }}
                        >
                          <VisitDetailsSection
                            formik={currentVisitorFormik}
                            title="Visit Details"
                          />

                          {!isSharedFormView ? (
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
                                  mr: "auto",
                                }}
                              >
                                Submit moves the visitor to the preview
                                table. Add Visitor and Submit keeps this
                                section open for the next visitor.
                              </Typography>

                              <Button
                                type="button"
                                variant="contained"
                                startIcon={
                                  <Box
                                    component="span"
                                    sx={{
                                      fontWeight: 900,
                                      fontSize: 18,
                                    }}
                                  >
                                    +
                                  </Box>
                                }
                                onClick={() =>
                                  handleSubmitAndAddVisitor(formik)
                                }
                                sx={{
                                  borderRadius: "14px",
                                  px: 3,
                                  py: 1.2,
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
                                Add Visitor and Submit
                              </Button>

                              <Button
                                type="button"
                                variant="outlined"
                                startIcon={<CheckCircleIcon />}
                                onClick={() =>
                                  handleSubmitCurrentVisitorAndReturn(
                                    formik
                                  )
                                }
                                sx={{
                                  borderRadius: "14px",
                                  px: 3,
                                  py: 1.2,
                                  textTransform: "none",
                                  fontWeight: 800,
                                  fontSize: "14px",
                                  borderColor: "#0A2F88",
                                  color: "#0A2F88",

                                  "&:hover": {
                                    borderColor: "#021C54",
                                    background: "#EFF6FF",
                                  },
                                }}
                              >
                                Submit
                              </Button>
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                mt: 3,
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Button
                                type="button"
                                variant="contained"
                                disabled={isSubmittingRequest}
                                startIcon={
                                  isSubmittingRequest ? (
                                    <CircularProgress
                                      size={18}
                                      color="inherit"
                                    />
                                  ) : (
                                    <Box
                                      component="span"
                                      sx={{ fontSize: 16 }}
                                    >
                                      ➤
                                    </Box>
                                  )
                                }
                                onClick={() => handleFinalSubmit(formik)}
                                sx={{
                                  borderRadius: "16px",
                                  px: 5,
                                  py: 1.4,
                                  textTransform: "none",
                                  fontWeight: 800,
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
                                {isSubmittingRequest
                                  ? "Submitting Form..."
                                  : "Submit Shared Form"}
                              </Button>
                            </Box>
                          )}
                        </Paper>
                      )}

                      {!isSharedFormView && (
                        <>
                          <AddedVisitorsPreview
                            visitors={formik.values.addedVisitors}
                            onViewMore={(index) =>
                              setSelectedAddedVisitorIndex(index)
                            }
                          />

                          {formik.values.addedVisitors?.length > 0 && (
                            <Paper
                              elevation={0}
                              sx={{
                                mt: 4,
                                p: 2.5,
                                borderRadius: "22px",
                                border: "1px solid #E2E8F0",
                                background:
                                  "linear-gradient(135deg,#F8FAFC 0%,#FFFFFF 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                                flexWrap: "wrap",
                              }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    color: "#071B52",
                                    fontWeight: 900,
                                    fontSize: "16px",
                                  }}
                                >
                                  Ready for Final Submission
                                </Typography>

                                <Typography
                                  sx={{
                                    color: "#64748B",
                                    fontSize: "13px",
                                    mt: 0.5,
                                  }}
                                >
                                  Review the preview table and submit the
                                  final visitor request for approval.
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                  flexWrap: "wrap",
                                  justifyContent: "flex-end",
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
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    color: "#64748B",
                                  }}
                                >
                                  Clear
                                </Button>

                                <Button
                                  type="button"
                                  variant="contained"
                                  disabled={isSubmittingRequest}
                                  startIcon={
                                    isSubmittingRequest ? (
                                      <CircularProgress
                                        size={18}
                                        color="inherit"
                                      />
                                    ) : (
                                      <Box
                                        component="span"
                                        sx={{ fontSize: 16 }}
                                      >
                                        ➤
                                      </Box>
                                    )
                                  }
                                  onClick={() => handleFinalSubmit(formik)}
                                  sx={{
                                    borderRadius: "16px",
                                    px: 5,
                                    py: 1.4,
                                    textTransform: "none",
                                    fontWeight: 800,
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
                                  {isSubmittingRequest
                                    ? "Submitting Form..."
                                    : finalSubmitText}
                                </Button>
                              </Box>
                            </Paper>
                          )}

                          <Box
                            sx={{
                              mt: 4,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 2,
                              flexWrap: "wrap",
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
                                  setShowVisitorDetails(false);
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
                          </Box>
                        </>
                      )}
                    </Box>
                  )}

                  {requestSubmitted && (
                    <VisitorSuccessScreen
                      onCreateAnother={() => {
                        window.history.replaceState(
                          null,
                          "",
                          window.location.pathname
                        );

                        formik.resetForm({
                          values: initialValues,
                        });

                        setRequestSubmitted(false);
                        setShowForm(false);
                        setShowVisitorDetails(false);
                      }}
                    />
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
                    Send Form Link
                  </DialogTitle>

                  <DialogContent>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#64748B",
                        mb: 2,
                      }}
                    >
                      Enter the visitor email address. The link will open
                      the selected visitor type form with requester
                      details included.
                    </Typography>

                    <TextField
                      autoFocus
                      fullWidth
                      label="Visitor Email"
                      placeholder="visitor@example.com"
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
                      disabled={isSendingEmail}
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
                      disabled={isSendingEmail}
                      startIcon={
                        isSendingEmail ? (
                          <CircularProgress
                            size={18}
                            color="inherit"
                          />
                        ) : (
                          <Box component="span" sx={{ fontSize: 16 }}>
                            ➤
                          </Box>
                        )
                      }
                      onClick={() => handleShareFormLinkToEmail(formik)}
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
                      {isSendingEmail ? "Preparing Email..." : "Send Link"}
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

                  <DialogContent sx={{ pt: 1 }}>
                    {selectedAddedVisitorFormik && (
                      <VisitDetailsSection
                        formik={selectedAddedVisitorFormik}
                        title="Editable Visitor Details"
                      />
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
                      startIcon={
                        <Box component="span" sx={{ fontSize: 16 }}>
                          👁
                        </Box>
                      }
                      onClick={() => {
                        setSelectedAddedVisitorIndex(null);
                        showToast("Visitor details updated successfully.");
                      }}
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

                <AnimatedStatusDialog
                  open={statusDialog.open}
                  type={statusDialog.type}
                  title={statusDialog.title}
                  message={statusDialog.message}
                  onClose={() =>
                    setStatusDialog((previous) => ({
                      ...previous,
                      open: false,
                    }))
                  }
                />

                <Snackbar
                  open={toast.open}
                  autoHideDuration={2600}
                  onClose={() =>
                    setToast((previous) => ({
                      ...previous,
                      open: false,
                    }))
                  }
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Alert
                    severity={toast.severity}
                    variant="filled"
                    onClose={() =>
                      setToast((previous) => ({
                        ...previous,
                        open: false,
                      }))
                    }
                    sx={{
                      borderRadius: "14px",
                      fontWeight: 700,
                      boxShadow:
                        "0 18px 35px rgba(15,23,42,0.18)",
                    }}
                  >
                    {toast.message}
                  </Alert>
                </Snackbar>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Box>
  );
}

export default CreateRequestForm;