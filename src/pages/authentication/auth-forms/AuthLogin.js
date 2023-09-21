// import React from "react";

// material-ui
import { Button, Grid } from "@mui/material";

// third party
import { Formik } from "formik";

// project import
import AnimateButton from "./../../../components/@extended/AnimateButton";
import { useMsal } from "@azure/msal-react";

const msalConfig = {
  auth: {
    clientId: "d333c252-a918-4966-ad83-fa404ff48461",
    authority:
      "https://login.microsoftonline.com/5d50ba92-7198-49d1-9929-193731a9688d",
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
};

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  // const handleLogin = () => {
  //     // Perform your authentication logic here

  //     // Assuming authentication is successful, set isLoggedIn to true
  //     setIsLoggedIn(true);
  //   };

  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginPopup(msalConfig);
      // Authentication successful, handle the redirect or navigate to the protected route
    } catch (error) {
      // Handle any errors that occurred during the authentication process
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
