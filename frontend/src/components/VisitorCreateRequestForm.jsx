import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {
  Box,
  Button,
  Paper,
  Typography,
  MenuItem,
  TextField,
} from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";

import SupportingDocumentsSection from "./SupportingDocumentsSection";

// ─────────────────────────────────────────────────────────────
// Visitor type → color / icon (kept in sync with VisitorTypeSection)
// ─────────────────────────────────────────────────────────────
const visitorTypeMeta = {
  Guest: { color: "#2F80ED", icon: <PersonOutlinedIcon /> },
  Contractor: { color: "#FF7F22", icon: <EngineeringOutlinedIcon /> },
  Canteen: { color: "#30C28E", icon: <RestaurantOutlinedIcon /> },
  Trainee: { color: "#AF52DE", icon: <SchoolOutlinedIcon /> },
  "Emp. Child": { color: "#2DB7D9", icon: <ChildCareOutlinedIcon /> },
};

// ─────────────────────────────────────────────────────────────
// Shared styled bits (matches VisitDetailsSection look & feel)
// ─────────────────────────────────────────────────────────────
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
};

const menuProps = {
  PaperProps: {
    sx: {
      borderRadius: "20px",
      mt: 1,
      overflow: "hidden",
      border: "1px solid #E2E8F0",
      boxShadow: "0px 20px 40px rgba(15,23,42,0.12)",

      "& .MuiMenuItem-root": {
        minHeight: "50px",
        fontSize: "14px",
        fontWeight: 500,
        borderRadius: "12px",
        margin: "4px 8px",
        transition: "all 0.2s ease",
      },

      "& .MuiMenuItem-root:hover": {
        background: "#F1F5F9",
      },

      "& .Mui-selected": {
        background: "#E8F0FF !important",
        color: "#0A2F88",
        fontWeight: 600,
      },
    },
  },
};

const validationSchema = Yup.object({
  visitorName: Yup.string().required(),
  visitorEmail: Yup.string().email("Invalid Email").required(),
  entryStartDate: Yup.string().required(),
  entryEndDate: Yup.string().required(),
  reason: Yup.string().required(),
  vehicleParking: Yup.string().required(),

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

// ─────────────────────────────────────────────────────────────
// VisitorCreateRequestForm
//
// The lighter, visitor-facing version of the entry request form.
// Opened by clicking "Share Form" on the main CreateRequestForm —
// pre-filled with the visitor type and any matching values already
// entered there. Submitting shows the visitor success screen.
//
// Props:
//   sharedValues  — object   — values carried over from the main form
//   onBack        — function — return to the main form
//   onSubmitted   — function — called with the final values on submit
// ─────────────────────────────────────────────────────────────
function VisitorCreateRequestForm({ sharedValues = {}, onBack, onSubmitted }) {
  const visitorType = sharedValues.visitorType || "";
  const meta = visitorTypeMeta[visitorType] || {
    color: "#071B52",
    icon: <PersonOutlinedIcon />,
  };

  const initialValues = {
    visitorType,
    visitorName: sharedValues.visitorName || "",
    visitorEmail: sharedValues.visitorEmail || "",
    entryStartDate: sharedValues.entryStartDate || "",
    entryEndDate: sharedValues.entryEndDate || "",
    nightWorkRequired: sharedValues.nightWorkRequired || "",
    nightWorkStartTime: sharedValues.nightWorkStartTime || "",
    nightWorkEndTime: sharedValues.nightWorkEndTime || "",
    visitingBuilding: sharedValues.visitingBuilding || "",
    visitingSection: sharedValues.visitingSection || "",
    meetingWith: sharedValues.meetingWith || "",
    vehicleParking: sharedValues.vehicleParking || "",
    vehicleNumber: sharedValues.vehicleNumber || "",
    telephoneNumber: sharedValues.telephoneNumber || "",
    companyName: sharedValues.companyName || "",
    laptopSerialNumber: sharedValues.laptopSerialNumber || "",
    reason: sharedValues.reason || "",
    attachments: [],
  };

  const handleSubmit = (values) => {
    if (onSubmitted) {
      onSubmitted(values);
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
            Fill in the details below to register a new visitor entry.
            Fields marked with * are required.
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
                  p: 3,
                  width: "100%",
                  maxWidth: "1600px",
                  margin: "0 auto",
                  boxSizing: "border-box",
                }}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "#071b52",
                    }}
                  >
                    Visitor Type
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#6B7280",
                      mt: 0.5,
                      mb: 2,
                    }}
                  >
                    Select the category of visitor.
                  </Typography>

                  <Box
                    sx={{
                      p: 3,
                      width: "100%",
                      boxSizing: "border-box",
                      borderRadius: "16px",
                      background: meta.color,
                      color: "#fff",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      Visitor category : {visitorType || "—"} {meta.icon}
                    </Typography>

                    <Button
                      disabled
                      sx={{
                        borderRadius: "14px",
                        px: 2.5,
                        py: 1,
                        color: "rgba(255,255,255,0.7)",
                        background: "rgba(255,255,255,0.15)",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Change Visitor Type
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: "5px",
                        height: "30px",
                        background: "#32d74b",
                        borderRadius: "3px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#071b52",
                        ml: 1.5,
                        textTransform: "uppercase",
                      }}
                    >
                      Visit Details
                    </Typography>
                    <Box
                      sx={{
                        flex: 1,
                        height: "1px",
                        background: "#d9dde3",
                        ml: 2,
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "1fr 1fr 1fr 1fr",
                      },
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Label>
                        Visitor's Name <Required>*</Required>
                      </Label>
                      <TextField
                        fullWidth
                        placeholder="Type here"
                        name="visitorName"
                        value={formik.values.visitorName}
                        onChange={formik.handleChange}
                        error={
                          formik.submitCount > 0 &&
                          Boolean(formik.errors.visitorName)
                        }
                        sx={inputStyle}
                      />
                    </Box>

                    <Box>
                      <Label>
                        Email Address <Required>*</Required>
                      </Label>
                      <TextField
                        fullWidth
                        placeholder="abc@gmail.com"
                        name="visitorEmail"
                        value={formik.values.visitorEmail}
                        onChange={formik.handleChange}
                        error={
                          formik.submitCount > 0 &&
                          Boolean(formik.errors.visitorEmail)
                        }
                        sx={inputStyle}
                      />
                    </Box>

                    <Box>
                      <Label>
                        Entry Start Date <Required>*</Required>
                      </Label>
                      <TextField
                        fullWidth
                        type="date"
                        name="entryStartDate"
                        value={formik.values.entryStartDate}
                        onChange={formik.handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={
                          formik.submitCount > 0 &&
                          Boolean(formik.errors.entryStartDate)
                        }
                        sx={inputStyle}
                      />
                    </Box>

                    <Box>
                      <Label>
                        Entry End Date <Required>*</Required>
                      </Label>
                      <TextField
                        fullWidth
                        type="date"
                        name="entryEndDate"
                        value={formik.values.entryEndDate}
                        onChange={formik.handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={
                          formik.submitCount > 0 &&
                          Boolean(formik.errors.entryEndDate)
                        }
                        sx={inputStyle}
                      />
                    </Box>

                    {formik.values.visitorType !== "Emp. Child" && (
                      <Box>
                        <Label>
                          Night Work Required <Required>*</Required>
                        </Label>
                        <TextField
                          select
                          fullWidth
                          name="nightWorkRequired"
                          value={formik.values.nightWorkRequired}
                          onChange={formik.handleChange}
                          error={
                            formik.submitCount > 0 &&
                            Boolean(formik.errors.nightWorkRequired)
                          }
                          sx={inputStyle}
                          SelectProps={{ MenuProps: menuProps }}
                        >
                          <MenuItem value="">Select option</MenuItem>
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </TextField>
                      </Box>
                    )}

                    {formik.values.nightWorkRequired === "Yes" && (
                      <>
                        <Box>
                          <Label>
                            Night Work Start Time <Required>*</Required>
                          </Label>
                          <TextField
                            fullWidth
                            type="time"
                            name="nightWorkStartTime"
                            value={formik.values.nightWorkStartTime}
                            onChange={formik.handleChange}
                            error={
                              formik.submitCount > 0 &&
                              Boolean(formik.errors.nightWorkStartTime)
                            }
                            sx={inputStyle}
                          />
                        </Box>

                        <Box>
                          <Label>
                            Night Work End Time <Required>*</Required>
                          </Label>
                          <TextField
                            fullWidth
                            type="time"
                            name="nightWorkEndTime"
                            value={formik.values.nightWorkEndTime}
                            onChange={formik.handleChange}
                            error={
                              formik.submitCount > 0 &&
                              Boolean(formik.errors.nightWorkEndTime)
                            }
                            sx={inputStyle}
                          />
                        </Box>
                      </>
                    )}

                    <Box>
                      <Label>Visiting Building / Pass Type</Label>
                      <TextField
                        fullWidth
                        placeholder="e.g. Head Office / contractor"
                        name="visitingBuilding"
                        value={formik.values.visitingBuilding}
                        onChange={formik.handleChange}
                        sx={inputStyle}
                      />
                    </Box>

                    <Box>
                      <Label>Visiting Section</Label>
                      <TextField
                        select
                        fullWidth
                        name="visitingSection"
                        value={formik.values.visitingSection}
                        onChange={formik.handleChange}
                        sx={inputStyle}
                        SelectProps={{ MenuProps: menuProps }}
                        displayEmpty
                      >
                        <MenuItem value="">Select section</MenuItem>
                        <MenuItem value="IT">IT</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="Finance">Finance</MenuItem>
                        <MenuItem value="Operations">Operations</MenuItem>
                      </TextField>
                    </Box>

                    <Box>
                      <Label>Meeting With</Label>
                      <TextField
                        fullWidth
                        placeholder="Officer's name"
                        name="meetingWith"
                        value={formik.values.meetingWith}
                        onChange={formik.handleChange}
                        sx={inputStyle}
                      />
                    </Box>

                    <Box>
                      <Label>
                        Vehicle Parking <Required>*</Required>
                      </Label>
                      <TextField
                        select
                        fullWidth
                        name="vehicleParking"
                        value={formik.values.vehicleParking}
                        onChange={formik.handleChange}
                        error={
                          formik.submitCount > 0 &&
                          Boolean(formik.errors.vehicleParking)
                        }
                        sx={inputStyle}
                        SelectProps={{ MenuProps: menuProps }}
                        displayEmpty
                      >
                        <MenuItem value="">Select status</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Box>

                    <Box>
                      <Label>Vehicle Number</Label>
                      <TextField
                        fullWidth
                        placeholder="Type here"
                        name="vehicleNumber"
                        value={formik.values.vehicleNumber}
                        onChange={formik.handleChange}
                        error={
                          formik.submitCount > 0 &&
                          Boolean(formik.errors.vehicleNumber)
                        }
                        sx={inputStyle}
                      />
                    </Box>

                    <Box>
                      <Label>Telephone Number</Label>
                      <TextField
                        fullWidth
                        placeholder="Type here"
                        name="telephoneNumber"
                        value={formik.values.telephoneNumber}
                        onChange={formik.handleChange}
                        error={
                          formik.submitCount > 0 &&
                          Boolean(formik.errors.telephoneNumber)
                        }
                        sx={inputStyle}
                      />
                    </Box>

                    <Box>
                      <Label>Company Name</Label>
                      <TextField
                        fullWidth
                        placeholder="Type here"
                        name="companyName"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        sx={inputStyle}
                      />
                    </Box>

                    {formik.values.visitorType === "Trainee" && (
                      <Box>
                        <Label>Serial Number</Label>
                        <TextField
                          fullWidth
                          placeholder="Type here"
                          name="laptopSerialNumber"
                          value={formik.values.laptopSerialNumber}
                          onChange={formik.handleChange}
                          error={
                            formik.submitCount > 0 &&
                            Boolean(formik.errors.laptopSerialNumber)
                          }
                          sx={inputStyle}
                        />
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Label>
                      Reason <Required>*</Required>
                    </Label>
                    <TextField
                      fullWidth
                      multiline
                      rows={1}
                      placeholder="Briefly describe the purpose of the visit..."
                      name="reason"
                      value={formik.values.reason}
                      onChange={formik.handleChange}
                      error={
                        formik.submitCount > 0 &&
                        Boolean(formik.errors.reason)
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          backgroundColor: "#f8fafc",

                          "& fieldset": {
                            borderColor: "#d1d5db",
                          },
                          "&.Mui-error fieldset": {
                            borderColor: "#ef4444 !important",
                            borderWidth: "2px",
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
                </Box>

                <SupportingDocumentsSection
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
                />

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
                      if (onBack) {
                        onBack();
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

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="text"
                      onClick={() => formik.resetForm()}
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
                        background: "#22C55E",
                        boxShadow: "0px 10px 25px rgba(34,197,94,0.25)",
                        transition: "all 0.25s ease",

                        "&:hover": {
                          transform: "translateY(-2px)",
                          background: "#1EA94F",
                          boxShadow: "0px 15px 30px rgba(34,197,94,0.35)",
                        },
                      }}
                    >
                      Submit Application
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}

export default VisitorCreateRequestForm;
