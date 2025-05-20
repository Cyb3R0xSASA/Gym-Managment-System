import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Partners from "./pages/Partners";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Testemonials from "./pages/Testemonials";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import UnderConst from "./pages/UnderConstruction";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import VerifyEmail from "./pages/auth/VerifyEmail";
import { Toaster } from "sonner";
import Gyms from "./pages/Gyms";
import AdminRegister from "./pages/auth/AdminRegister";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  const location = useLocation();
  const hideLayout = [
    "/login",
    "/register",
    "/admin",
    "/verify-email",
    "/admin_register",
    "/reset-password",
    "/forgot-password",
  ].includes(location.pathname);

  return (
    <div dir="rtl" className="relative">
      <div className="pattern" />
      <Toaster richColors position="top-center" dir="rtl" closeButton />
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<UnderConst />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/admin_register" element={<AdminRegister />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gyms" element={<Gyms />} />
        <Route path="/testemonials" element={<Testemonials />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
