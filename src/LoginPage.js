import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform your authentication logic here

    // Assuming authentication is successful, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  // Render the content conditionally based on isLoggedIn state
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome to the Home Page!</h2>
          {/* Your home page content */}
        </div>
      ) : (
        <div>
          <h2>Please sign in</h2>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;