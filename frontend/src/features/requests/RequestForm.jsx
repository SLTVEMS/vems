import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import styled from "styled-components";
import {
  createRequestRequested,
  updateRequestRequested,
} from "./requests.actions.js";

const Panel = styled(Paper)`
  padding: 24px;
`;

const validationSchema = Yup.object({
  visitorName: Yup.string()
    .min(2, "Visitor name is too short")
    .required("Visitor name is required"),
  purpose: Yup.string().required("Purpose is required"),
  department: Yup.string().required("Department is required"),
  assignedTo: Yup.string().required("Assigned desk is required"),
  visitDate: Yup.date()
    .min(dayjs().startOf("day").toDate(), "Visit date cannot be in the past")
    .required("Visit date is required"),
  notes: Yup.string().max(250, "Use 250 characters or less"),
});

function RequestForm({
  request = null,
  mode = "create",
  open = false,
  onClose,
}) {
  const dispatch = useDispatch();
  const isSaving = useSelector((state) => state.requests.isSaving);
  const title = mode === "edit" ? "Edit Request" : "Create Request";

  const initialValues = {
    visitorName: request?.visitorName ?? "",
    purpose: request?.purpose ?? "Meeting",
    department: request?.department ?? "IT Division",
    assignedTo: request?.assignedTo ?? "Reception",
    visitDate: request?.visitDate
      ? dayjs(request.visitDate).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
    notes: request?.notes ?? "",
  };

  const content = (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, helpers) => {
        const payload = {
          ...values,
          visitDate: dayjs(values.visitDate).toISOString(),
        };

        if (mode === "edit" && request?.id) {
          dispatch(updateRequestRequested(request.id, payload));
        } else {
          dispatch(createRequestRequested(payload));
        }

        helpers.setSubmitting(false);
        onClose?.();
      }}
    >
      {({ values, errors, touched, handleBlur, handleChange }) => (
        <Form noValidate>
          <Stack spacing={2.2}>
            <TextField
              label="Visitor name"
              name="visitorName"
              value={values.visitorName}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.visitorName && errors.visitorName)}
              helperText={touched.visitorName && errors.visitorName}
              fullWidth
            />
            <TextField
              select
              label="Purpose"
              name="purpose"
              value={values.purpose}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.purpose && errors.purpose)}
              helperText={touched.purpose && errors.purpose}
            >
              <MenuItem value="Meeting">Meeting</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Delivery">Delivery</MenuItem>
              <MenuItem value="Interview">Interview</MenuItem>
            </TextField>
            <TextField
              select
              label="Department"
              name="department"
              value={values.department}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.department && errors.department)}
              helperText={touched.department && errors.department}
            >
              <MenuItem value="IT Division">IT Division</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Administration">Administration</MenuItem>
              <MenuItem value="Security">Security</MenuItem>
            </TextField>
            <TextField
              select
              label="Assigned desk"
              name="assignedTo"
              value={values.assignedTo}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.assignedTo && errors.assignedTo)}
              helperText={touched.assignedTo && errors.assignedTo}
            >
              <MenuItem value="Reception">Reception</MenuItem>
              <MenuItem value="Gate 1">Gate 1</MenuItem>
              <MenuItem value="Security Desk">Security Desk</MenuItem>
            </TextField>
            <TextField
              label="Visit date"
              name="visitDate"
              type="date"
              value={values.visitDate}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.visitDate && errors.visitDate)}
              helperText={touched.visitDate && errors.visitDate}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Notes"
              name="notes"
              multiline
              minRows={3}
              value={values.notes}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.notes && errors.notes)}
              helperText={touched.notes && errors.notes}
            />
            <Stack direction="row" spacing={1.5} justifyContent="flex-end">
              <Button onClick={onClose} variant="text" color="inherit">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={isSaving}
              >
                {mode === "edit" ? "Save Changes" : "Create Request"}
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );

  if (open) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>{content}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Panel elevation={0}>
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={800}>
          {title}
        </Typography>
        <Typography color="text.secondary">
          Use Day.js for all date handling in the request form.
        </Typography>
      </Stack>
      {content}
    </Panel>
  );
}

export default RequestForm;
