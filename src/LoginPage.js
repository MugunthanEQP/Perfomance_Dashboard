// material-ui
import { Grid, Stack, Typography } from "@mui/material";

// project import
import AuthLogin from "./pages/authentication/auth-forms/AuthLogin";
import AuthWrapper from "./pages/authentication/AuthWrapper";

// ================================|| LOGIN ||================================ //

const LoginPage = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography variant="h4" alignItems="center">
            Login with Anthology SSO
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default LoginPage;
