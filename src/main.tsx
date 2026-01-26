// Application entry point.
// Sets up React routing, authentication context, and internationalization.
// Analytics initialization is deferred until after user consent is given (see CookieConsent.tsx).

// Analytics initialization removed - now happens after user consent in CookieConsent.tsx
import "./styles/index.css";
import "./utils/i18n";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import { AuthProvider } from "./app/auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
