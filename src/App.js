import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, MsalAuthenticationTemplate } from "@azure/msal-react";
import LoginPage from './LoginPage'; // import the login page

// Initialize the MSAL application object
const msalConfig = {
    auth: {
        clientId: "d333c252-a918-4966-ad83-fa404ff48461",
        authority: "https://login.microsoftonline.com/5d50ba92-7198-49d1-9929-193731a9688d",
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    },
};
const msalInstance = new PublicClientApplication(msalConfig);

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <MsalProvider instance={msalInstance}>
        <ThemeCustomization>
            <ScrollTop>
                <MsalAuthenticationTemplate
                    interactionType="popup"
                    authenticationRequest={{
                        scopes: ["User.Read"]
                    }}
                    errorComponent={({ error }) => <div>An error occurred: {error.errorCode}</div>}
                    loadingComponent={({ loading }) => <div>Loading...</div>}
                    unauthenticatedComponent={LoginPage} // use the login page when the user is not authenticated
                >
                    <Routes />
                </MsalAuthenticationTemplate>
            </ScrollTop>
        </ThemeCustomization>
    </MsalProvider>
);

export default App;

