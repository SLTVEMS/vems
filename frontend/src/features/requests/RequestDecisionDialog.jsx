import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object({
  decision: Yup.string().oneOf(["approved", "rejected"]).required("Pick a decision"),
  comment: Yup.string().when("decision", {
    is: "rejected",
    then: (schema) => schema.required("Add a rejection note"),
    otherwise: (schema) => schema.optional(),
  }),
});

function RequestDecisionDialog({ open, request, onClose, onSubmit }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Review {request?.referenceNo}</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Formik
          enableReinitialize
          initialValues={{ decision: request?.decision ?? "approved", comment: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, helpers) => {
            onSubmit?.(values);
            helpers.setSubmitting(false);
            onClose?.();
          }}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form noValidate>
              <Stack spacing={2.2}>
                <TextField
                  select
                  label="Decision"
                  name="decision"
                  value={values.decision}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.decision && errors.decision)}
                  helperText={touched.decision && errors.decision}
                >
                  <MenuItem value="approved">Approve</MenuItem>
                  <MenuItem value="rejected">Reject</MenuItem>
                </TextField>
                <TextField
                  label="Comment"
                  name="comment"
                  value={values.comment}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.comment && errors.comment)}
                  helperText={touched.comment && errors.comment}
                  multiline
                  minRows={3}
                />
                <DialogActions sx={{ px: 0 }}>
                  <Button onClick={onClose} startIcon={<CloseIcon />}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" startIcon={<CheckCircleIcon />}>
                    Save Decision
                  </Button>
                </DialogActions>
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default RequestDecisionDialog;
