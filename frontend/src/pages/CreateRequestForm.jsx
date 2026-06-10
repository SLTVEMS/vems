import { Formik, Form } from "formik";
import { useState } from "react";
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
import SupportingDocumentsSection from "../components/SupportingDocumentsSection";

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
    Employee: "#0EA5E9",
  };
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = (values) => {
    console.log(values);
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

            return (
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
               {!showForm && (
              <>
                <Box sx={{ mb: 6 }}>
                  <VisitorTypeSection formik={formik} />
                </Box>

                {formik.values.visitorType && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 4,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => {
                        window.scrollTo({
                          top: 250,
                          behavior: "smooth",
                        });

                        setTimeout(() => {
                          setShowForm(true);
                        }, 250);
                      }}
                      sx={{
                        px: 7,
                        py: 1.6,

                        borderRadius: "18px",

                        textTransform: "none",

                        fontWeight: 700,
                        fontSize: "15px",

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
                      Next
                    </Button>
                  </Box>
                )}
              </>
            )}

              {showForm && (
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
                    p: 3.5,
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
              </Box>
            </Form>
            )
          }}
        </Formik>
      </Paper>
    </Box>
  );
}

export default CreateRequestForm;