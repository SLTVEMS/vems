import { Formik, Form } from "formik";
import { useState, useRef } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import ArrowBackIcon              from "@mui/icons-material/ArrowBack";
import RefreshIcon                from "@mui/icons-material/Refresh";
import SendIcon                   from "@mui/icons-material/Send";
import EditOutlinedIcon           from "@mui/icons-material/EditOutlined";
import CloudUploadOutlinedIcon    from "@mui/icons-material/CloudUploadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PersonOutlinedIcon         from "@mui/icons-material/PersonOutlined";
import EngineeringOutlinedIcon    from "@mui/icons-material/EngineeringOutlined";
import RestaurantOutlinedIcon     from "@mui/icons-material/RestaurantOutlined";
import SchoolOutlinedIcon         from "@mui/icons-material/SchoolOutlined";
import ChildCareOutlinedIcon      from "@mui/icons-material/ChildCareOutlined";
import BadgeOutlinedIcon          from "@mui/icons-material/BadgeOutlined";

// ─── Validation Schema (identical to CreateRequestForm) ───────────────────────
const validationSchema = Yup.object({
  requestDate:          Yup.string().required(),
  requesterName:        Yup.string().required(),
  requesterEmail:       Yup.string().email("Invalid Email").required(),
  requesterServiceNo:   Yup.string().required(),
  requesterDesignation: Yup.string().required(),
  requesterContactNo:   Yup.string()
    .matches(/^(?:\+94|0)(70|71|72|74|75|76|77|78)\d{7}$/, "Enter a valid Sri Lankan mobile number")
    .required(),
  costCenterCode: Yup.string().required(),
  costCenterName: Yup.string().required(),
  visitorName:    Yup.string().required(),
  visitorEmail:   Yup.string().email("Invalid Email").required(),
  passType:       Yup.string().required(),
  entryStartDate: Yup.string().required(),
  entryEndDate:   Yup.string().required(),
  entryStartTime: Yup.string().when(["entryStartDate", "entryEndDate"], {
    is:        (s, e) => s && e && s === e,
    then:      (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),
  entryEndTime: Yup.string().when(["entryStartDate", "entryEndDate"], {
    is:        (s, e) => s && e && s === e,
    then:      (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),
  reason: Yup.string().required(),
  nightWorkRequired: Yup.string().when("visitorType", {
    is:        (v) => v !== "Emp. Child",
    then:      (s) => s.required(),
    otherwise: (s) => s.notRequired(),
  }),
  nightWorkStartTime: Yup.string().when("nightWorkRequired", {
    is: "Yes", then: (s) => s.required(), otherwise: (s) => s.notRequired(),
  }),
  nightWorkEndTime: Yup.string().when("nightWorkRequired", {
    is: "Yes", then: (s) => s.required(), otherwise: (s) => s.notRequired(),
  }),
  vehicleNumber: Yup.string().when("vehicleParking", {
    is: "Yes", then: (s) => s.required(), otherwise: (s) => s.notRequired(),
  }),
  telephoneNumber: Yup.string().matches(
    /^(?:\+94|0)(70|71|72|74|75|76|77|78)\d{7}$/,
    "Enter a valid Sri Lankan mobile number"
  ),
  laptopSerialNumber: Yup.string().when("visitorType", {
    is: "Trainee", then: (s) => s.required(), otherwise: (s) => s.notRequired(),
  }),
});

// ─── Initial Values (identical to CreateRequestForm) ─────────────────────────
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

// ─── Visitor type definitions ─────────────────────────────────────────────────
const VISITOR_TYPES = [
  { label: "Employee",   color: "#e7b900", icon: <BadgeOutlinedIcon    sx={{ fontSize: 52 }} /> },
  { label: "Guest",      color: "#2F80ED", icon: <PersonOutlinedIcon   sx={{ fontSize: 52 }} /> },
  { label: "Contractor", color: "#FF7F22", icon: <EngineeringOutlinedIcon sx={{ fontSize: 52 }} /> },
  { label: "Canteen",    color: "#30C28E", icon: <RestaurantOutlinedIcon  sx={{ fontSize: 52 }} /> },
  { label: "Trainee",    color: "#AF52DE", icon: <SchoolOutlinedIcon   sx={{ fontSize: 52 }} /> },
  { label: "Emp. Child", color: "#2DB7D9", icon: <ChildCareOutlinedIcon sx={{ fontSize: 52 }} /> },
];

const TYPE_COLORS = {
  Guest: "#2F80ED", Contractor: "#FF7F22", Canteen: "#30C28E",
  Trainee: "#AF52DE", "Emp. Child": "#2DB7D9", Employee: "#e7b900",
};

// ─── Shared MUI style helpers ─────────────────────────────────────────────────
const inputSx = {
  "& .MuiOutlinedInput-root": {
    height: "44px",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    "& fieldset":             { borderColor: "#d1d5db" },
    "&:hover fieldset":       { borderColor: "#94a3b8" },
    "&.Mui-focused fieldset": { borderColor: "#021C54", borderWidth: "2px" },
    "&.Mui-error fieldset":   { borderColor: "#ef4444 !important", borderWidth: "2px" },
  },
  "& .MuiInputBase-input": { fontSize: "13px", padding: "10px 12px" },
  "& .MuiSelect-icon": { color: "#64748b" },
  "& input[type='date']::-webkit-calendar-picker-indicator": { cursor: "pointer" },
  "& input[type='time']::-webkit-calendar-picker-indicator": { cursor: "pointer" },
};

const textareaSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    "& fieldset":             { borderColor: "#d1d5db" },
    "&:hover fieldset":       { borderColor: "#94a3b8" },
    "&.Mui-focused fieldset": { borderColor: "#021C54", borderWidth: "2px" },
    "&.Mui-error fieldset":   { borderColor: "#ef4444 !important", borderWidth: "2px" },
  },
  "& .MuiInputBase-input": { fontSize: "13px" },
};

const menuProps = {
  PaperProps: {
    sx: {
      borderRadius: "10px", mt: 1,
      border: "1px solid #E2E8F0",
      boxShadow: "0px 12px 28px rgba(15,23,42,0.12)",
      "& .MuiMenuItem-root": { fontSize: "13px", borderRadius: "7px", margin: "2px 6px", minHeight: "40px" },
      "& .MuiMenuItem-root:hover": { background: "#F1F5F9" },
      "& .Mui-selected": { background: "#E8F0FF !important", color: "#0A2F88", fontWeight: 600 },
    },
  },
};

// ─── Small reusable components ────────────────────────────────────────────────
const FieldLabel = ({ children, required }) => (
  <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#374151", mb: 0.6 }}>
    {children}
    {required && <span style={{ color: "#ef4444" }}> *</span>}
  </Typography>
);

const SectionDivider = ({ title }) => (
  <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 2.5 }}>
    <Box sx={{ width: 4, height: 22, borderRadius: 2, background: "#32d74b", flexShrink: 0 }} />
    <Typography sx={{
      fontSize: "12px", fontWeight: 700, color: "#071b52",
      letterSpacing: "0.08em", textTransform: "uppercase", ml: 1.5,
    }}>
      {title}
    </Typography>
    <Box sx={{ flex: 1, height: "1px", background: "#e5e7eb", ml: 2 }} />
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────
function VisitorCreateRequest() {
  const [showForm,             setShowForm]             = useState(false);
  const [requestSubmitted,     setRequestSubmitted]     = useState(false);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const fileInputRef = useRef(null);

  const duplicateVisitorData = {
    requestCode: "VE20260615-90",
    nic:         "200534009821",
    visitorName: "Kasun Perera",
  };

  const handleSubmit = (values) => {
    console.log(values);
    setRequestSubmitted(true);
  };

  const handleFormReset = (formik) =>
    formik.setValues({ ...initialValues, visitorType: formik.values.visitorType });

  return (
    <Box sx={{ minHeight: "100vh", background: "#f0f2f5" }}>

      {/* ── Page header bar ─────────────────────────────────────────────────── */}
      <Box sx={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        px: { xs: 2, md: 3 }, py: 1.4,
      }}>
        <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>
          Visitor Crate Requests
        </Typography>
      </Box>

      {/* ── Breadcrumb / sub-nav ─────────────────────────────────────────────── */}
      <Box sx={{ background: "#1e3a5f", px: { xs: 2, md: 3 }, py: 1.1 }}>
        <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>
          Create Request
        </Typography>
      </Box>

      {/* ── Instruction strip ─────────────────────────────────────────────────── */}
      <Box sx={{
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        px: { xs: 2, md: 3 }, py: 1,
      }}>
        <Typography sx={{ fontSize: "12.5px", color: "#374151" }}>
          Please Fill the below form carefully &amp; correctly
        </Typography>
      </Box>

      {/* ── Form card ──────────────────────────────────────────────────────────── */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 3, maxWidth: "1000px", mx: "auto" }}>
        <Paper elevation={0} sx={{
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid #dde3ec",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>

          {/* Card header — navy gradient + SLT Mobitel branding */}
          <Box sx={{
            background: "linear-gradient(135deg, #021C54 0%, #0A2F88 100%)",
            px: { xs: 2.5, md: 4 }, py: 2.8,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Box>
              <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "#fff", letterSpacing: "0.01em" }}>
                Visitor Entry Request Form
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", mt: 0.5, lineHeight: 1.5 }}>
                Fill in the details below to register a new visitor entry. Fields marked with * are required.
              </Typography>
            </Box>

            {/* SLT Mobitel brand mark */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <Box sx={{ width: 3, height: 10, background: "#60d669", borderRadius: 1 }} />
                <Box sx={{ width: 3, height: 10, background: "#60d669", borderRadius: 1 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "9px", color: "#60d669", fontWeight: 800, letterSpacing: "0.15em", lineHeight: 1 }}>
                  SLT
                </Typography>
                <Typography sx={{ fontSize: "15px", color: "#fff", fontWeight: 900, letterSpacing: "0.05em", lineHeight: 1.2 }}>
                  MOBITEL
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── Card body ─────────────────────────────────────────────────────── */}
          <Box sx={{ p: { xs: 2, md: 3.5 } }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                const accentColor = TYPE_COLORS[formik.values.visitorType] || "#021C54";

                return (
                  <Form>

                    {/* ══ STEP 1 — Visitor Type Selector ═══════════════════════ */}
                    {!showForm && !requestSubmitted && (
                      <>
                        <SectionDivider title="Visitor Type" />
                        <Typography sx={{ fontSize: "12.5px", color: "#6b7280", mb: 2.5 }}>
                          Select the category of visitor.
                        </Typography>

                        <Grid container spacing={2}>
                          {VISITOR_TYPES.map((type) => {
                            const active = formik.values.visitorType === type.label;
                            return (
                              <Grid item xs={6} sm={4} key={type.label}>
                                <Box
                                  onClick={() => formik.setFieldValue("visitorType", type.label)}
                                  sx={{
                                    height: { xs: 120, sm: 160 },
                                    borderRadius: "14px",
                                    background: type.color,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1.5,
                                    cursor: "pointer",
                                    color: "#fff",
                                    border: active
                                      ? "3px solid rgba(255,255,255,0.92)"
                                      : "3px solid transparent",
                                    boxShadow: active
                                      ? "0 10px 28px rgba(0,0,0,0.22)"
                                      : "0 4px 12px rgba(0,0,0,0.12)",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      transform: "translateY(-3px)",
                                      boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
                                    },
                                  }}
                                >
                                  {type.icon}
                                  <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
                                    {type.label}
                                  </Typography>
                                </Box>
                              </Grid>
                            );
                          })}
                        </Grid>

                        {formik.values.visitorType && (
                          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3.5 }}>
                            <Button
                              variant="contained"
                              onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setTimeout(() => setShowForm(true), 200);
                              }}
                              sx={{
                                px: 5, py: 1.3,
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: "14px",
                                background: "linear-gradient(135deg,#021C54,#0A2F88)",
                                boxShadow: "0 6px 20px rgba(2,28,84,0.3)",
                                "&:hover": {
                                  background: "linear-gradient(135deg,#021C54,#0A2F88)",
                                  boxShadow: "0 10px 26px rgba(2,28,84,0.38)",
                                  transform: "translateY(-1px)",
                                },
                              }}
                            >
                              Next
                            </Button>
                          </Box>
                        )}
                      </>
                    )}

                    {/* ══ STEP 2 — Full Form ════════════════════════════════════ */}
                    {showForm && !requestSubmitted && (
                      <>
                        {/* Visitor category pill */}
                        <Box sx={{
                          background: accentColor,
                          borderRadius: "10px",
                          px: 2.5, py: 1.4, mb: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}>
                          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
                            Visitor category : {formik.values.visitorType} &nbsp;
                            <Box component="span" sx={{ fontSize: "18px" }}>
                              {VISITOR_TYPES.find(t => t.label === formik.values.visitorType)?.label === "Trainee" ? "🎓" : ""}
                            </Box>
                          </Typography>
                          <Button
                            size="small"
                            startIcon={<EditOutlinedIcon sx={{ fontSize: "14px !important" }} />}
                            onClick={() => setShowForm(false)}
                            sx={{
                              color: "#fff",
                              textTransform: "none",
                              fontWeight: 600,
                              fontSize: "12px",
                              background: "rgba(255,255,255,0.18)",
                              borderRadius: "7px",
                              px: 1.5, py: 0.5,
                              "&:hover": { background: "rgba(255,255,255,0.3)" },
                            }}
                          >
                            Change
                          </Button>
                        </Box>

                        {/* ── VISIT DETAILS ──────────────────────────────────── */}
                        <SectionDivider title="Visit Details" />

                        <Grid container spacing={1.5}>

                          {/* Entry Start Date */}
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel required>Entry Start Date</FieldLabel>
                            <TextField fullWidth type="date" name="entryStartDate"
                              value={formik.values.entryStartDate}
                              onChange={formik.handleChange}
                              InputLabelProps={{ shrink: true }}
                              sx={inputSx}
                              error={formik.submitCount > 0 && !formik.values.entryStartDate}
                            />
                          </Grid>

                          {/* Entry End Date */}
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel required>Entry End Date</FieldLabel>
                            <TextField fullWidth type="date" name="entryEndDate"
                              value={formik.values.entryEndDate}
                              onChange={formik.handleChange}
                              InputLabelProps={{ shrink: true }}
                              sx={inputSx}
                              error={formik.submitCount > 0 && !formik.values.entryEndDate}
                            />
                          </Grid>

                          {/* Night Work Required */}
                          {formik.values.visitorType !== "Emp. Child" && (
                            <Grid item xs={12} sm={6} md={3}>
                              <FieldLabel required>Night Work Required</FieldLabel>
                              <TextField select fullWidth name="nightWorkRequired"
                                value={formik.values.nightWorkRequired}
                                onChange={formik.handleChange}
                                sx={inputSx}
                                SelectProps={{ MenuProps: menuProps }}
                                error={formik.submitCount > 0 && Boolean(formik.errors.nightWorkRequired)}
                              >
                                <MenuItem value="">Select option</MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                              </TextField>
                            </Grid>
                          )}

                          {/* Night Work Start Time */}
                          {formik.values.nightWorkRequired === "Yes" && (
                            <Grid item xs={12} sm={6} md={3}>
                              <FieldLabel required>Night Work Start Time</FieldLabel>
                              <TextField fullWidth type="time" name="nightWorkStartTime"
                                value={formik.values.nightWorkStartTime}
                                onChange={formik.handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={inputSx}
                                error={formik.submitCount > 0 && Boolean(formik.errors.nightWorkStartTime)}
                              />
                            </Grid>
                          )}

                          {/* Night Work End Time */}
                          {formik.values.nightWorkRequired === "Yes" && (
                            <Grid item xs={12} sm={6} md={3}>
                              <FieldLabel required>Night Work End Time</FieldLabel>
                              <TextField fullWidth type="time" name="nightWorkEndTime"
                                value={formik.values.nightWorkEndTime}
                                onChange={formik.handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={inputSx}
                                error={formik.submitCount > 0 && Boolean(formik.errors.nightWorkEndTime)}
                              />
                            </Grid>
                          )}

                          {/* Same-day time fields */}
                          {formik.values.entryStartDate &&
                           formik.values.entryEndDate &&
                           formik.values.entryStartDate === formik.values.entryEndDate && (
                            <>
                              <Grid item xs={12} sm={6} md={3}>
                                <FieldLabel required>Entry Start Time</FieldLabel>
                                <TextField fullWidth type="time" name="entryStartTime"
                                  value={formik.values.entryStartTime}
                                  onChange={formik.handleChange}
                                  InputLabelProps={{ shrink: true }}
                                  sx={inputSx}
                                  error={formik.submitCount > 0 && Boolean(formik.errors.entryStartTime)}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={3}>
                                <FieldLabel required>Entry End Time</FieldLabel>
                                <TextField fullWidth type="time" name="entryEndTime"
                                  value={formik.values.entryEndTime}
                                  onChange={formik.handleChange}
                                  InputLabelProps={{ shrink: true }}
                                  sx={inputSx}
                                  error={formik.submitCount > 0 && Boolean(formik.errors.entryEndTime)}
                                />
                              </Grid>
                            </>
                          )}

                          {/* Visiting Building / Pass Type */}
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel>Visiting Building / Pass Type</FieldLabel>
                            <TextField fullWidth placeholder="e.g. Head Office / contractor"
                              name="visitingBuilding"
                              value={formik.values.visitingBuilding}
                              onChange={formik.handleChange}
                              sx={inputSx}
                            />
                          </Grid>

                          {/* Visiting Section */}
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel>Visiting Section</FieldLabel>
                            <TextField select fullWidth name="visitingSection"
                              value={formik.values.visitingSection}
                              onChange={formik.handleChange}
                              sx={inputSx}
                              SelectProps={{ MenuProps: menuProps }}
                            >
                              <MenuItem value="">Select section</MenuItem>
                              <MenuItem value="IT">IT</MenuItem>
                              <MenuItem value="HR">HR</MenuItem>
                              <MenuItem value="Finance">Finance</MenuItem>
                              <MenuItem value="Operations">Operations</MenuItem>
                              <MenuItem value="Security">Security</MenuItem>
                            </TextField>
                          </Grid>

                          {/* Meeting With */}
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel required>Meeting With</FieldLabel>
                            <TextField fullWidth placeholder="Officer's name"
                              name="meetingWith"
                              value={formik.values.meetingWith}
                              onChange={formik.handleChange}
                              sx={inputSx}
                            />
                          </Grid>

                          {/* Company Name */}
                          {formik.values.visitorType !== "Trainee" &&
                           formik.values.visitorType !== "Emp. Child" && (
                            <Grid item xs={12} sm={6} md={3}>
                              <FieldLabel>Company Name</FieldLabel>
                              <TextField fullWidth placeholder="Type here"
                                name="companyName"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                sx={inputSx}
                              />
                            </Grid>
                          )}

                          {/* Vehicle Parking */}
                          {formik.values.visitorType !== "Emp. Child" &&
                           formik.values.visitorType !== "Trainee" && (
                            <Grid item xs={12} sm={6} md={3}>
                              <FieldLabel>Vehicle parking</FieldLabel>
                              <TextField select fullWidth name="vehicleParking"
                                value={formik.values.vehicleParking}
                                onChange={formik.handleChange}
                                sx={inputSx}
                                SelectProps={{ MenuProps: menuProps }}
                              >
                                <MenuItem value="">Select status</MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                              </TextField>
                            </Grid>
                          )}

                          {/* Vehicle Number */}
                          {formik.values.vehicleParking === "Yes" && (
                            <Grid item xs={12} sm={6} md={3}>
                              <FieldLabel required>Vehicle Number</FieldLabel>
                              <TextField fullWidth placeholder="Type here"
                                name="vehicleNumber"
                                value={formik.values.vehicleNumber}
                                onChange={formik.handleChange}
                                sx={inputSx}
                                error={formik.submitCount > 0 && Boolean(formik.errors.vehicleNumber)}
                              />
                            </Grid>
                          )}

                          {/* Telephone Number */}
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel required>Telephone Number</FieldLabel>
                            <TextField fullWidth placeholder="+94 7X XXX XXXX"
                              name="telephoneNumber"
                              value={formik.values.telephoneNumber}
                              onChange={formik.handleChange}
                              sx={inputSx}
                              error={formik.submitCount > 0 && Boolean(formik.errors.telephoneNumber)}
                            />
                          </Grid>

                          {/* Email Address */}
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel required>Email Address</FieldLabel>
                            <TextField fullWidth placeholder="example@gmail.com"
                              name="visitorEmail"
                              value={formik.values.visitorEmail}
                              onChange={formik.handleChange}
                              sx={inputSx}
                              error={formik.submitCount > 0 && Boolean(formik.errors.visitorEmail)}
                            />
                          </Grid>

                          {/* Visitor Name */}
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel required>Visitor's Name</FieldLabel>
                            <TextField fullWidth placeholder="Type here"
                              name="visitorName"
                              value={formik.values.visitorName}
                              onChange={formik.handleChange}
                              sx={inputSx}
                              error={formik.submitCount > 0 && Boolean(formik.errors.visitorName)}
                            />
                          </Grid>

                          {/* Laptop Serial — Trainee only */}
                          {formik.values.visitorType === "Trainee" && (
                            <Grid item xs={12} sm={6} md={3}>
                              <FieldLabel required>Laptop Serial Number</FieldLabel>
                              <TextField fullWidth placeholder="Enter serial number"
                                name="laptopSerialNumber"
                                value={formik.values.laptopSerialNumber}
                                onChange={formik.handleChange}
                                sx={inputSx}
                                error={formik.submitCount > 0 && Boolean(formik.errors.laptopSerialNumber)}
                              />
                            </Grid>
                          )}

                          {/* Reason */}
                          <Grid item xs={12}>
                            <FieldLabel required>Reason</FieldLabel>
                            <TextField fullWidth multiline rows={2}
                              placeholder="Briefly describe the purpose of the visit..."
                              name="reason"
                              value={formik.values.reason}
                              onChange={formik.handleChange}
                              sx={textareaSx}
                              error={formik.submitCount > 0 && Boolean(formik.errors.reason)}
                            />
                          </Grid>
                        </Grid>

                        {/* ── SUPPORTING DOCUMENTS ───────────────────────────── */}
                        <SectionDivider title="Supporting Documents" />
                        <Typography sx={{ fontSize: "12px", color: "#6b7280", mb: 1.5 }}>
                          Attach NIC copies, authorization letters, or related documents.
                        </Typography>

                        <Box
                          onClick={() => fileInputRef.current?.click()}
                          sx={{
                            border: "2px dashed #d1d5db",
                            borderRadius: "10px",
                            p: { xs: 2, md: 2.5 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "#fafbfc",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: "#021C54",
                              background: "#fff",
                              boxShadow: "0 4px 16px rgba(2,28,84,0.08)",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{
                              width: 44, height: 44, borderRadius: "9px",
                              background: "linear-gradient(135deg,#021C54,#0A2F88)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0,
                            }}>
                              <CloudUploadOutlinedIcon sx={{ fontSize: 22, color: "#fff" }} />
                            </Box>
                            <Box>
                              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
                                Click to upload documents
                              </Typography>
                              <Typography sx={{ fontSize: "11px", color: "#9ca3af" }}>
                                PDF, JPG, PNG up to 10 MB
                              </Typography>
                            </Box>
                          </Box>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                            sx={{
                              borderRadius: "7px", textTransform: "none",
                              fontSize: "12px", fontWeight: 600,
                              borderColor: "#d1d5db", color: "#374151",
                              flexShrink: 0,
                              "&:hover": { borderColor: "#021C54", color: "#021C54", background: "transparent" },
                            }}
                          >
                            Browse files
                          </Button>
                          <input
                            ref={fileInputRef}
                            hidden multiple type="file"
                            onChange={(e) =>
                              formik.setFieldValue("attachments", Array.from(e.target.files))
                            }
                          />
                        </Box>

                        {formik.values.attachments?.length > 0 && (
                          <Box sx={{ mt: 1.5 }}>
                            {formik.values.attachments.map((file, i) => (
                              <Box key={i} sx={{
                                display: "flex", alignItems: "center", gap: 1.2,
                                px: 1.5, py: 0.8, borderRadius: "8px",
                                background: "#f1f5f9", mb: 0.8,
                              }}>
                                <InsertDriveFileOutlinedIcon sx={{ fontSize: 15, color: "#021C54" }} />
                                <Typography sx={{ fontSize: "12px", color: "#374151" }}>
                                  {file.name}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )}

                        {/* ── Action Buttons ──────────────────────────────────── */}
                        <Box sx={{
                          mt: 4, pt: 2.5,
                          borderTop: "1px solid #e5e7eb",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}>
                          <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => setShowForm(false)}
                            sx={{
                              textTransform: "none", fontWeight: 600,
                              fontSize: "13px", color: "#374151",
                              borderRadius: "8px", px: 2.5, py: 1,
                              "&:hover": { background: "#f1f5f9" },
                            }}
                          >
                            Back
                          </Button>

                          <Box sx={{ display: "flex", gap: 1.5 }}>
                            <Button
                              startIcon={<RefreshIcon />}
                              onClick={() => handleFormReset(formik)}
                              sx={{
                                textTransform: "none", fontWeight: 600,
                                fontSize: "13px", color: "#374151",
                                borderRadius: "8px", px: 2.5, py: 1,
                                border: "1px solid #d1d5db",
                                "&:hover": { background: "#f8fafc" },
                              }}
                            >
                              Clear
                            </Button>

                            <Button
                              type="submit"
                              variant="contained"
                              endIcon={<SendIcon sx={{ fontSize: "14px !important" }} />}
                              sx={{
                                textTransform: "none", fontWeight: 700,
                                fontSize: "13px",
                                borderRadius: "8px", px: 3, py: 1,
                                background: "#22c55e",
                                boxShadow: "0 4px 14px rgba(34,197,94,0.32)",
                                "&:hover": {
                                  background: "#16a34a",
                                  boxShadow: "0 6px 18px rgba(34,197,94,0.4)",
                                  transform: "translateY(-1px)",
                                },
                              }}
                            >
                              Submit Application
                            </Button>
                          </Box>
                        </Box>
                      </>
                    )}

                    {/* ══ STEP 3 — Success ══════════════════════════════════════ */}
                    {requestSubmitted && (
                      <Box sx={{ textAlign: "center", py: 8 }}>
                        <Box sx={{
                          width: 84, height: 84, borderRadius: "50%",
                          background: "#22c55e",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          margin: "0 auto 24px",
                          boxShadow: "0 8px 28px rgba(34,197,94,0.3)",
                        }}>
                          <Typography sx={{ fontSize: "38px", color: "#fff", lineHeight: 1 }}>✓</Typography>
                        </Box>

                        <Typography sx={{ fontSize: "24px", fontWeight: 700, color: "#021C54", mb: 1 }}>
                          Request Submitted Successfully!
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#6b7280", mb: 4 }}>
                          Your visitor request has been sent for supervisor approval.
                        </Typography>

                        <Box sx={{
                          display: "inline-block",
                          background: "#f0fdf4",
                          border: "1px dashed #86efac",
                          borderRadius: "12px",
                          py: 2.5, px: 6, mb: 4,
                        }}>
                          <Typography sx={{ fontSize: "11px", color: "#64748b", letterSpacing: "0.08em", mb: 0.5 }}>
                            ENTRY CODE
                          </Typography>
                          <Typography sx={{ fontSize: "24px", fontWeight: 700, color: "#166534" }}>
                            VE20260615-001
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                          <Button
                            variant="outlined"
                            sx={{ borderRadius: "9px", textTransform: "none", fontWeight: 600, px: 3, py: 1.1 }}
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
                              borderRadius: "9px", textTransform: "none",
                              fontWeight: 600, px: 3, py: 1.1,
                              background: "linear-gradient(135deg,#021C54,#0A2F88)",
                              "&:hover": { background: "linear-gradient(135deg,#021C54,#0A2F88)" },
                            }}
                          >
                            Create Another Request
                          </Button>
                        </Box>
                      </Box>
                    )}

                    {/* ── Duplicate Warning Dialog ─────────────────────────────── */}
                    <Dialog
                      open={showDuplicateWarning}
                      onClose={() => setShowDuplicateWarning(false)}
                      maxWidth="sm" fullWidth
                      PaperProps={{ sx: { borderRadius: "14px" } }}
                    >
                      <DialogContent sx={{ p: 4, textAlign: "center" }}>
                        <Box sx={{
                          width: 80, height: 80, borderRadius: "50%",
                          background: "#FFF5E6", border: "2px solid #F5C26B",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          margin: "0 auto 20px", fontSize: "36px",
                        }}>
                          ⚠️
                        </Box>
                        <Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#E89B17", mb: 2 }}>
                          Duplicate Visitor Request Detected
                        </Typography>
                        <Typography sx={{ fontSize: "13px", color: "#6b7280", mb: 0.7 }}>
                          Previous Request Code: <strong>{duplicateVisitorData.requestCode}</strong>
                        </Typography>
                        <Typography sx={{ fontSize: "13px", color: "#6b7280", mb: 0.7 }}>
                          NIC: {duplicateVisitorData.nic}
                        </Typography>
                        <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#374151", mb: 2.5 }}>
                          Visitor: {duplicateVisitorData.visitorName}
                        </Typography>
                        <Box sx={{
                          background: "#FFF9EE", border: "1px solid #F3C15A",
                          borderRadius: "10px", p: 2, mb: 3,
                        }}>
                          <Typography sx={{ fontSize: "13px", color: "#5B6470", lineHeight: 1.7 }}>
                            An approved visitor request already exists for this visitor on the selected date.
                            Multiple visitor requests for the same visitor on the same date are not permitted.
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                          <Button
                            variant="outlined"
                            onClick={() => setShowDuplicateWarning(false)}
                            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
                          >
                            Return to Form
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              borderRadius: "8px", textTransform: "none", fontWeight: 600,
                              background: "linear-gradient(135deg,#021C54,#0A2F88)",
                              "&:hover": { background: "linear-gradient(135deg,#021C54,#0A2F88)" },
                            }}
                          >
                            View Existing Request
                          </Button>
                        </Box>
                      </DialogContent>
                    </Dialog>

                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default VisitorCreateRequest;
