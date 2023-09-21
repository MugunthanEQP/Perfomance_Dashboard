import Routes from "./routes";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, MsalAuthenticationTemplate } from "@azure/msal-react";
// import LoginPage from './LoginPage';
import { CircularProgress } from "@mui/material";

const msalConfig = {
  auth: {
    clientId: "d333c252-a918-4966-ad83-fa404ff48461",
    authority:
      "https://login.microsoftonline.com/5d50ba92-7198-49d1-9929-193731a9688d",
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
};
const msalInstance = new PublicClientApplication(msalConfig);

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <ThemeCustomization>
        <ScrollTop>
          {/* {isLoginPageLoaded ? (
            <LoginPage />
          ) : ( */}
          <MsalAuthenticationTemplate
            unauthenticatedComponent={<LoadingSpinner />}
            interactionType="redirect"
            authenticationRequest={{
              scopes: ["User.Read"],
            }}
            errorComponent={({ error }) => (
              <div>An error occurred: {error.errorCode}</div>
            )}
            loadingComponent={({ loading }) => (
              <div>
                <LoadingSpinner />
              </div>
            )}
          >
            <Routes />
          </MsalAuthenticationTemplate>
          {/* )} */}
        </ScrollTop>
      </ThemeCustomization>
    </MsalProvider>
  );
}
