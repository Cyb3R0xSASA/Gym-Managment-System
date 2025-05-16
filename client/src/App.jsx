import Footer from "./layouts/Footer"
import Header from "./layouts/Header"
import { Route, Routes, useLocation } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Partners from "./pages/Partners"
import Home from "./pages/Home"
import Faq from "./pages/Faq"
import Testemonials from "./pages/Testemonials"
import Contact from "./pages/Contact"
import Pricing from "./pages/Pricing"
import UnderConst from "./pages/UnderConstruction"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import VerifyEmail from "./pages/auth/VerifyEmail"
import { Toaster } from "sonner"

function App() {
  const location = useLocation();
  const hideLayout = ["/login", "/register", "/admin", "/verify-email"].includes(location.pathname);

  return (
    <div dir="rtl" className="relative">
      <div className="pattern" />
      <Toaster richColors position="top-center" dir="rtl"/>
      {!hideLayout && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<UnderConst />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testemonials" element={<Testemonials />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  )
}

export default App
