import { Toaster } from "sonner";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { Login } from "@/app/pages/Login";
import { Signup } from "@/app/pages/Signup";
import { Onboarding } from "@/app/pages/Onboarding";
import { Checkout } from "@/app/pages/Checkout";
import { CheckoutSuccess } from "@/app/pages/CheckoutSuccess";
import { Dashboard } from "@/app/pages/Dashboard";
import CheatSheet from "@/app/pages/CheatSheet";
import { RequireAuth } from "@/app/auth/RequireAuth";

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cheat-sheet" element={<CheatSheet />} />
        <Route
          path="/onboarding"
          element={
            <RequireAuth>
              <Onboarding />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout-success"
          element={
            <RequireAuth>
              <CheckoutSuccess />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
