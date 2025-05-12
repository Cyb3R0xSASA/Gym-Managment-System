import Footer from "./layouts/Footer"
import Header from "./layouts/Header"
import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Partners from "./pages/Partners"
import Home from "./pages/Home"
import Faq from "./pages/Faq"
import Testemonials from "./pages/Testemonials"
import Contact from "./pages/Contact"
import Pricing from "./pages/Pricing"

function App() {
  return (
    <div dir="rtl" className="relative">
      <div className="pattern"/>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testemonials" element={<Testemonials />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App