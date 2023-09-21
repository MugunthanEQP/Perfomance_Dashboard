// import React, { useState } from 'react';
// import { Button } from '@mui/material';

// const LoginPage = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     // Perform your authentication logic here

//     // Assuming authentication is successful, set isLoggedIn to true
//     setIsLoggedIn(true);
//   };

//   // Render the content conditionally based on isLoggedIn state
//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <h2>Welcome to the Home Page!</h2>
//           {/* Your home page content */}
//         </div>
//       ) : (
//         <div>
//           <h2>Please sign in</h2>
//           <Button variant="contained" color="primary" onClick={handleLogin}>
//             Sign in
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginPage;

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
