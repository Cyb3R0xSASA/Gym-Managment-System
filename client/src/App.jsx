import Footer from "./layouts/Footer"
import Header from "./layouts/Header"
import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Partners from "./pages/Partners"
import Home from "./pages/Home"
function App() {
  return (
    <div dir="rtl" className="relative">
      <div className="pattern"/>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App


{/* <Hero 
title={'إختر الخطة المناسبة لبرنامج إدارة صالتك الرياضية'} 
subtitle={'لدينا العديد من الخطط القوية المصممة خصيصاً لتناسب متطلباتك وتحقق أقصى استفادة ممكنة من البرنامج'}
content={
  <div>
    <button className="px-[15px] py-[10px] border rounded-[10px] normal-text hover-zoom">أنشئ برنامج مخصص  ←</button>
    <div className="w-[500px] h-[500px] bg-amber-200"/>
  </div>
}
/> */}