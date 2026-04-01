import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import TermsPage from "./pages/TermsPage";
import OnboardingPage from "./pages/OnboardingPage";
import TradingPage from "./pages/TradingPage";
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/trade" element={<TradingPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
