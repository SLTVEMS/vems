import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import styled from "styled-components";
import { loginRequested } from "./auth.actions.js";

const Page = styled.main`
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    linear-gradient(135deg, rgba(5, 26, 60, 0.98), rgba(5, 44, 96, 0.96)),
    #071f45;
`;

const Card = styled(Paper)`
  width: min(440px, 100%);
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const validationSchema = Yup.object({
  email: Yup.string().email("Use a valid email").required("Email is required"),
  code: Yup.string()
    .matches(/^[0-9]{6}$/, "Use the 6 digit code")
    .required("Code is required"),
});

function LoginPage() {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth);

  return (
    <Page>
      <Card elevation={8}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              VEMS Sign In
            </Typography>
            <Typography color="text.secondary">
              Azure-ready login form with local demo fallback.
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Formik
            initialValues={{ email: "engineer@example.com", code: "123456" }}
            validationSchema={validationSchema}
            onSubmit={(values) => dispatch(loginRequested(values))}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form noValidate>
                <Stack spacing={2}>
                  <TextField
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                  <TextField
                    label="2FA Code"
                    name="code"
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.code && errors.code)}
                    helperText={touched.code && errors.code}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={isLoading ? <CircularProgress size={18} /> : <LoginIcon />}
                    disabled={isLoading}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Card>
    </Page>
  );
}

export default LoginPage;
