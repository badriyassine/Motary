import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import TopHeader from "./components/layouts/TopHeader";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/pages/Home";
import Cars from "./components/pages/Cars";
import Exclusive from "./components/pages/Exclusive"; 
import Support from "./components/pages/Support";
import Contact from "./components/pages/Contact";
import Login from "./components/auth/Login"; // Add this
import Register from "./components/auth/Register"; // Add this

const titles: Record<string, string> = {
  "/": "Home - Motary Cars",
  "/cars": "Cars - Motary Cars",
  "/exclusive": "Exclusive - Motary Cars",
  "/support": "Support - Motary Cars",
  "/contact": "Contact - Motary Cars",
  "/login": "Login - Motary Cars", // Add title
  "/register": "Register - Motary Cars", // Add title
};

const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const title = titles[location.pathname] || "Motary Cars";
    document.title = title;
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <TitleUpdater />
      <div className="bg-[#f6f7f9] min-h-screen">
        <TopHeader />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exclusive" element={<Exclusive />} /> 
          <Route path="/cars" element={<Cars />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} /> {/* Add route */}
          <Route path="/register" element={<Register />} /> {/* Add route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;



