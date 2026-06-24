import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styled from "styled-components";
import {
  Box, Button, Typography, Grid, TextField, MenuItem, Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const VISITOR_TYPES = ["Trainee", "Guest", "Employee", "Contractor", "Canteen", "Emp. Child"];
const TYPE_COLOR = {
  Trainee: "#9400D3", Guest: "#2F80ED", Employee: "#e7b900",
  Contractor: "#FF7F22", Canteen: "#30C28E", "Emp. Child": "#2DB7D9",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    height: "40px", borderRadius: "8px", backgroundColor: "#fff", fontSize: "13px",
    "& fieldset": { borderColor: "#d1d5db" },
    "&:hover fieldset": { borderColor: "#94a3b8" },
    "&.Mui-focused fieldset": { borderColor: "#7C3AED", borderWidth: "2px" },
    "&.Mui-error fieldset": { borderColor: "#ef4444 !important" },
  },
  "& .MuiInputBase-input": {
    fontSize: "13px", padding: "8px 12px",
    "&::placeholder": { color: "#9ca3af", opacity: 1 },
  },
  "& input[type='date']::-webkit-calendar-picker-indicator": { cursor: "pointer", opacity: 0.7 },
  "& input[type='time']::-webkit-calendar-picker-indicator": { cursor: "pointer", opacity: 0.7 },
};

const menuProps = {
  PaperProps: {
    sx: {
      borderRadius: "10px", mt: 0.5, border: "1px solid #e5e7eb",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      "& .MuiMenuItem-root": { fontSize: "13px", minHeight: "38px" },
      "& .Mui-selected": { background: "#ede9fe !important", color: "#7C3AED" },
    },
  },
};

const FieldLabel = styled(Typography)`
  font-size: 12px !important; font-weight: 600 !important;
  color: #374151 !important; margin-bottom: 4px !important;
`;
const Req = styled.span`color: #ef4444; margin-left: 2px;`;

function FlipButton({ label, backText, onClick }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Box onClick={() => { setFlipped(f => !f); onClick?.(); }}
      sx={{ perspective: "800px", width: "100%", maxWidth: 360, height: 48, cursor: "pointer" }}>
      <Box sx={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)",
      }}>
        <Box sx={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          bgcolor: "#0d1b35", borderRadius: "24px",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 700, fontSize: "14px",
        }}>{label}</Box>
        <Box sx={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateX(180deg)", bgcolor: "#166534", borderRadius: "24px",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 600, fontSize: "13px", px: 2, textAlign: "center",
        }}>{backText}</Box>
      </Box>
    </Box>
  );
}

function VisitorSuccessScreen({ onCreateAnother }) {
  return (
    <Box sx={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "calc(100vh - 72px)", bgcolor: "#f0f4f8", py: 4,
    }}>
      <Paper elevation={0} sx={{
        width: "100%", maxWidth: 600, borderRadius: "16px",
        border: "1px solid #e5e7eb", bgcolor: "#fff",
        p: { xs: "32px 20px", sm: "48px 52px" }, textAlign: "center",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      }}>
        <Box sx={{
          width: 72, height: 72, borderRadius: "50%", bgcolor: "#dcfce7",
          display: "flex", alignItems: "center", justifyContent: "center",
          mx: "auto", mb: "14px", boxShadow: "0 0 0 10px #f0fdf4",
        }}>
          <CheckCircleIcon sx={{ fontSize: 40, color: "#22C55E" }} />
        </Box>

        <Typography sx={{ fontWeight: 800, fontSize: "20px", color: "#0f172a", mb: "8px" }}>
          Your Application Submitted Successfully!
        </Typography>
        <Typography sx={{ color: "#94a3b8", fontSize: "13px", mb: "20px", lineHeight: 1.6 }}>
          Your visitor application has been sent for approval.
        </Typography>

        <Box sx={{
          display: "flex", alignItems: "center", justifyContent: "center",
          bgcolor: "#f0fdf4", border: "1px dashed #86efac",
          borderRadius: "12px", px: "24px", py: "16px", mb: "24px", gap: "16px",
        }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "10px", fontWeight: 700, color: "#64748b", letterSpacing: "0.1em", textTransform: "uppercase", mb: "3px" }}>
              We will contact you soon
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "20px", color: "#166534" }}>
              Thank You
            </Typography>
          </Box>
          <Box component="img" src="/sltmobitel-logo.svg" alt="SLT Mobitel"
            onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            sx={{ height: "40px", objectFit: "contain", flexShrink: 0 }} />
          <Box sx={{ display: "none", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", width: 22, height: 22 }}>
              {["#e63946","#2176ae","#57cc99","#ffd166"].map((c, i) => (
                <Box key={i} sx={{ width: 9, height: 9, borderRadius: "1px", bgcolor: c }} />
              ))}
            </Box>
            <Box>
              <Typography sx={{ fontSize: "13px", fontWeight: 900, color: "#1e293b", lineHeight: 1, letterSpacing: "0.06em" }}>
                <Box component="span" sx={{ color: "#2176ae" }}>SLT</Box>MOBITEL
              </Typography>
              <Typography sx={{ fontSize: "9px", color: "#64748b", letterSpacing: "0.08em" }}>The Connection</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FlipButton label="Create Another Request" backText="Starting new request..." onClick={onCreateAnother} />
        </Box>
        <Typography sx={{ mt: "10px", fontSize: "11px", color: "#cbd5e1" }}>
          Click to create a new request
        </Typography>
      </Paper>
    </Box>
  );
}

const validationSchema = Yup.object({
  visitorName: Yup.string().required("Required"),
  emailAddress: Yup.string().email("Invalid email").required("Required"),
  entryStartDate: Yup.string().required("Required"),
  entryEndDate: Yup.string().required("Required"),
  reason: Yup.string().required("Required"),
  nightWorkRequired: Yup.string().when("visitorType", {
    is: (v) => v !== "Emp. Child",
    then: (s) => s.required("Required"),
    otherwise: (s) => s.notRequired(),
  }),
  nightWorkStartTime: Yup.string().when("nightWorkRequired", {
    is: "Yes", then: (s) => s.required("Required"), otherwise: (s) => s.notRequired(),
  }),
  nightWorkEndTime: Yup.string().when("nightWorkRequired", {
    is: "Yes", then: (s) => s.required("Required"), otherwise: (s) => s.notRequired(),
  }),
  vehicleNumber: Yup.string().when("vehicleParking", {
    is: "Yes", then: (s) => s.required("Required"), otherwise: (s) => s.notRequired(),
  }),
  telephoneNumber: Yup.string().matches(
    /^(?:\+94|0)(70|71|72|74|75|76|77|78)\d{7}$/,
    "Enter a valid Sri Lankan mobile number"
  ),
});

// ── Pre-fill from CreateRequestForm values ──
const makeInitialValues = (prefillData = {}) => ({
  visitorType:        prefillData.visitorType        || "Trainee",
  visitorName:        prefillData.visitorName        || "",
  // CreateRequestForm uses visitorEmail; this form uses emailAddress
  emailAddress:       prefillData.visitorEmail       || "",
  entryStartDate:     prefillData.entryStartDate     || "",
  entryEndDate:       prefillData.entryEndDate        || "",
  nightWorkRequired:  prefillData.nightWorkRequired  || "",
  nightWorkStartTime: prefillData.nightWorkStartTime || "",
  nightWorkEndTime:   prefillData.nightWorkEndTime   || "",
  visitingBuilding:   prefillData.visitingBuilding   || "",
  visitingSection:    prefillData.visitingSection    || "",
  meetingWith:        prefillData.meetingWith        || "",
  companyName:        prefillData.companyName        || "",
  vehicleParking:     prefillData.vehicleParking     || "",
  vehicleNumber:      prefillData.vehicleNumber      || "",
  telephoneNumber:    prefillData.telephoneNumber    || "",
  reason:             prefillData.reason             || "",
  attachments:        [],
});

// ── Main component ──
function VisitorCreateRequest({ onBack, prefillData = {} }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <VisitorSuccessScreen onCreateAnother={() => setSubmitted(false)} />;
  }

  return (
    <Box sx={{ minHeight: "calc(100vh - 72px)", bgcolor: "#f0f4f8" }}>
      <Box sx={{ p: { xs: "16px", md: "24px 32px" } }}>
        <Typography sx={{ fontSize: "11px", color: "#94a3b8", mb: "8px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Please Fill the below form carefully &amp; correctly
        </Typography>

        <Paper elevation={0} sx={{
          borderRadius: "12px", border: "1px solid #e2e8f0",
          bgcolor: "#fff", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          <Box sx={{
            background: "linear-gradient(135deg, #0d1b35 0%, #0a2151 60%, #0f2a5e 100%)",
            px: { xs: "20px", sm: "32px" }, py: "20px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: "16px", sm: "20px" }, color: "#fff", mb: "2px" }}>
                Visitor Entry Request Form
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                Fill in the details below to register a new visitor entry. Fields marked with{" "}
                <Box component="span" sx={{ color: "#ef4444" }}>*</Box> are required.
              </Typography>
            </Box>
            <Box component="img" src="/sltmobitel-logo.svg" alt="SLT Mobitel"
              onError={(e) => { e.target.style.display = "none"; }}
              sx={{ height: "48px", objectFit: "contain", flexShrink: 0, ml: 2 }} />
          </Box>

          <Formik
            initialValues={makeInitialValues(prefillData)}
            validationSchema={validationSchema}
            onSubmit={(values) => { console.log(values); setSubmitted(true); }}
          >
            {(formik) => {
              const typeColor = TYPE_COLOR[formik.values.visitorType] || "#7C3AED";
              return (
                <Form>
                  <Box sx={{ p: { xs: "16px", sm: "24px 28px" } }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#374151", mb: "10px" }}>
                      Visitor Type
                    </Typography>
                    <Box sx={{
                      borderRadius: "10px", background: typeColor,
                      px: "20px", py: "14px", display: "flex", alignItems: "center", mb: "24px",
                    }}>
                      <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>
                        Visitor category : {formik.values.visitorType}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: "16px" }}>
                      <Box sx={{ width: 4, height: 22, borderRadius: "2px", bgcolor: "#22c55e" }} />
                      <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        Visit Details
                      </Typography>
                    </Box>

                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={6} md={3}>
                        <FieldLabel>Entry Start Date <Req>*</Req></FieldLabel>
                        <TextField fullWidth type="date" name="entryStartDate"
                          value={formik.values.entryStartDate} onChange={formik.handleChange}
                          error={formik.submitCount > 0 && !formik.values.entryStartDate}
                          InputLabelProps={{ shrink: true }} sx={inputSx} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FieldLabel>Entry End Date <Req>*</Req></FieldLabel>
                        <TextField fullWidth type="date" name="entryEndDate"
                          value={formik.values.entryEndDate} onChange={formik.handleChange}
                          error={formik.submitCount > 0 && !formik.values.entryEndDate}
                          InputLabelProps={{ shrink: true }} sx={inputSx} />
                      </Grid>
                      {formik.values.visitorType !== "Emp. Child" && (
                        <Grid item xs={12} sm={6} md={3}>
                          <FieldLabel>Night Work Required</FieldLabel>
                          <TextField select fullWidth name="nightWorkRequired"
                            value={formik.values.nightWorkRequired} onChange={formik.handleChange}
                            error={formik.submitCount > 0 && Boolean(formik.errors.nightWorkRequired)}
                            sx={inputSx} SelectProps={{ MenuProps: menuProps, displayEmpty: true }}>
                            <MenuItem value="" disabled><span style={{ color: "#9ca3af" }}>Select option</span></MenuItem>
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </TextField>
                        </Grid>
                      )}
                      {formik.values.nightWorkRequired === "Yes" && (
                        <>
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel>Night Work Start Time</FieldLabel>
                            <TextField fullWidth type="time" name="nightWorkStartTime"
                              value={formik.values.nightWorkStartTime} onChange={formik.handleChange}
                              InputLabelProps={{ shrink: true }} sx={inputSx} />
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <FieldLabel>Night Work End Time</FieldLabel>
                            <TextField fullWidth type="time" name="nightWorkEndTime"
                              value={formik.values.nightWorkEndTime} onChange={formik.handleChange}
                              InputLabelProps={{ shrink: true }} sx={inputSx} />
                          </Grid>
                        </>
                      )}
                      <Grid item xs={12} sm={6} md={3}>
                        <FieldLabel>Visiting Building / Pass Type</FieldLabel>
                        <TextField fullWidth placeholder="e.g. Head Office / contractor"
                          name="visitingBuilding" value={formik.values.visitingBuilding}
                          onChange={formik.handleChange} sx={inputSx} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FieldLabel>Visiting Section</FieldLabel>
                        <TextField select fullWidth name="visitingSection"
                          value={formik.values.visitingSection} onChange={formik.handleChange}
                          sx={inputSx} SelectProps={{ MenuProps: menuProps, displayEmpty: true }}>
                          <MenuItem value="" disabled><span style={{ color: "#9ca3af" }}>Select section</span></MenuItem>
                          <MenuItem value="IT">IT Division</MenuItem>
                          <MenuItem value="HR">HR Division</MenuItem>
                          <MenuItem value="Finance">Finance</MenuItem>
                          <MenuItem value="Engineering">Engineering</MenuItem>
                          <MenuItem value="Security">Security</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FieldLabel>Meeting With <Req>*</Req></FieldLabel>
                        <TextField fullWidth placeholder="Officer's name"
                          name="meetingWith" value={formik.values.meetingWith}
                          onChange={formik.handleChange} sx={inputSx} />
                      </Grid>
                      {formik.values.visitorType !== "Trainee" && formik.values.visitorType !== "Emp. Child" && (
                        <Grid item xs={12} sm={6} md={3}>
                          <FieldLabel>Company Name</FieldLabel>
                          <TextField fullWidth placeholder="Type here"
                            name="companyName" value={formik.values.companyName}
                            onChange={formik.handleChange} sx={inputSx} />
                        </Grid>
                      )}
                      <Grid item xs={12} sm={6} md={3}>
                        <FieldLabel>Vehicle parking <Req>*</Req></FieldLabel>
                        <TextField select fullWidth name="vehicleParking"
                          value={formik.values.vehicleParking} onChange={formik.handleChange}
                          sx={inputSx} SelectProps={{ MenuProps: menuProps, displayEmpty: true }}>
                          <MenuItem value="" disabled><span style={{ color: "#9ca3af" }}>Select status</span></MenuItem>
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </TextField>
                      </Grid>
                      {formik.values.vehicleParking === "Yes" && (
                        <Grid item xs={12} sm={6} md={3}>
                          <FieldLabel>Vehicle Number</FieldLabel>
                          <TextField fullWidth placeholder="Type here"
                            name="vehicleNumber" value={formik.values.vehicleNumber}
                            onChange={formik.handleChange}
                            error={formik.submitCount > 0 && Boolean(formik.errors.vehicleNumber)}
                            sx={inputSx} />
                        </Grid>
                      )}
                      <Grid item xs={12} sm={6} md={3}>
                        <FieldLabel>Telephone Number <Req>*</Req></FieldLabel>
                        <TextField fullWidth placeholder="+94 7X XXX XXXX"
                          name="telephoneNumber" value={formik.values.telephoneNumber}
                          onChange={formik.handleChange}
                          error={formik.submitCount > 0 && Boolean(formik.errors.telephoneNumber)}
                          sx={inputSx} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FieldLabel>Email Address <Req>*</Req></FieldLabel>
                        <TextField fullWidth placeholder="ex:abc@gmail.com"
                          name="emailAddress" value={formik.values.emailAddress}
                          onChange={formik.handleChange}
                          error={formik.submitCount > 0 && Boolean(formik.errors.emailAddress)}
                          sx={inputSx} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FieldLabel>Visitor's Name <Req>*</Req></FieldLabel>
                        <TextField fullWidth placeholder="Type here"
                          name="visitorName" value={formik.values.visitorName}
                          onChange={formik.handleChange}
                          error={formik.submitCount > 0 && Boolean(formik.errors.visitorName)}
                          sx={inputSx} />
                      </Grid>
                      <Grid item xs={12}>
                        <FieldLabel>Reason <Req>*</Req></FieldLabel>
                        <TextField fullWidth multiline rows={2}
                          placeholder="Briefly describe the purpose of the visit..."
                          name="reason" value={formik.values.reason}
                          onChange={formik.handleChange}
                          error={formik.submitCount > 0 && Boolean(formik.errors.reason)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px", backgroundColor: "#fff", fontSize: "13px",
                              "& fieldset": { borderColor: "#d1d5db" },
                              "&:hover fieldset": { borderColor: "#94a3b8" },
                              "&.Mui-focused fieldset": { borderColor: "#7C3AED", borderWidth: "2px" },
                              "&.Mui-error fieldset": { borderColor: "#ef4444 !important" },
                            },
                            "& .MuiInputBase-input": { fontSize: "13px", padding: "8px 12px", "&::placeholder": { color: "#9ca3af", opacity: 1 } },
                          }} />
                      </Grid>
                    </Grid>

                    {/* Supporting Documents */}
                    <Box sx={{ mt: "24px", mb: "8px" }}>
                      <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#374151", mb: "2px" }}>
                        Supporting Documents
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#94a3b8", mb: "12px" }}>
                        Attach NIC copies, authorization letters, or related documents.
                      </Typography>
                      <Box sx={{
                        border: "1px solid #e2e8f0", borderRadius: "10px",
                        p: "16px 20px", display: "flex", alignItems: "center",
                        justifyContent: "center", bgcolor: "#fafafa", gap: "12px",
                      }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <Box sx={{ width: 36, height: 36, borderRadius: "8px", bgcolor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CloudUploadOutlinedIcon sx={{ fontSize: 20, color: "#64748b" }} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Click to upload documents</Typography>
                            <Typography sx={{ fontSize: "11px", color: "#94a3b8" }}>PDF, JPG, PNG up to 10 MB</Typography>
                          </Box>
                        </Box>
                        <Button component="label" variant="outlined" size="small"
                          sx={{ borderRadius: "8px", textTransform: "none", fontSize: "12px", fontWeight: 600, borderColor: "#d1d5db", color: "#374151", px: "14px", "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" } }}>
                          Browse files
                          <input hidden multiple type="file" onChange={(e) => formik.setFieldValue("attachments", Array.from(e.target.files))} />
                        </Button>
                      </Box>
                      {formik.values.attachments?.length > 0 && (
                        <Box sx={{ mt: "10px" }}>
                          {formik.values.attachments.map((file, i) => (
                            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: "8px", p: "8px 12px", bgcolor: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: "8px", mb: "6px" }}>
                              <InsertDriveFileOutlinedIcon sx={{ fontSize: 16, color: "#64748b" }} />
                              <Typography sx={{ fontSize: "12px", color: "#374151" }}>{file.name}</Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>

                    {/* Bottom action bar */}
                    <Box sx={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      mt: "28px", pt: "16px", borderTop: "1px solid #f1f5f9",
                    }}>
                      <Button startIcon={<ArrowBackIcon sx={{ fontSize: 15 }} />} onClick={onBack}
                        sx={{ textTransform: "none", fontWeight: 600, fontSize: "13px", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "8px", px: "16px", py: "7px", bgcolor: "#fff", "&:hover": { bgcolor: "#f8fafc" } }}>
                        Back
                      </Button>
                      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Button startIcon={<RefreshIcon sx={{ fontSize: 15 }} />} onClick={() => formik.resetForm()}
                          sx={{ textTransform: "none", fontWeight: 600, fontSize: "13px", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "8px", px: "16px", py: "7px", bgcolor: "#fff", "&:hover": { bgcolor: "#f8fafc" } }}>
                          Clear
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<SendIcon sx={{ fontSize: 14 }} />}
                          sx={{ textTransform: "none", fontWeight: 700, fontSize: "13px", borderRadius: "8px", px: "20px", py: "7px", bgcolor: "#16a34a", boxShadow: "0 4px 14px rgba(22,163,74,0.3)", "&:hover": { bgcolor: "#15803d", boxShadow: "0 6px 18px rgba(22,163,74,0.35)" } }}>
                          Submit Application
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </Box>
    </Box>
  );
}

export default VisitorCreateRequest;
