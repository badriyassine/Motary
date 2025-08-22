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
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/pages/Profile"; 

// Map route paths to document titles
const titles: Record<string, string> = {
  "/": "Home - Motary Cars",
  "/cars": "Cars - Motary Cars",
  "/exclusive": "Exclusive - Motary Cars",
  "/support": "Support - Motary Cars",
  "/contact": "Contact - Motary Cars",
  "/login": "Login - Motary Cars",
  "/register": "Register - Motary Cars",
  "/profile": "Profile - Motary Cars", 
};

// Component to update document title
const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const title = titles[location.pathname] || "Motary Cars";
    document.title = title;
  }, [location]);

  return null;
};

// Component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <TitleUpdater />
      <ScrollToTop />
      <div className="bg-[#f6f7f9] min-h-screen flex flex-col">
        <TopHeader />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exclusive" element={<Exclusive />} /> 
            <Route path="/cars" element={<Cars />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} /> {/* <- Add Profile route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;




