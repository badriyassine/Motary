import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo/Logo (2).png";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

interface User {
  firstName: string;
  role?: string;
}

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("Home");
  const [user, setUser] = useState<User | null>(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Exclusive", path: "/exclusive" },
    { name: "Cars", path: "/cars" },
    { name: "Support", path: "/support" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const current = navItems.find((item) => item.path === location.pathname);
    if (current) setActive(current.name);
  }, [location.pathname]);

  // Load user from localStorage first for instant UI update
  const loadUser = () => {
    const token = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");
    if (localUser) {
      try {
        setUser(JSON.parse(localUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    if (!token) return;

    // Always fetch latest user from backend
    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      });
  };

  useEffect(() => {
    loadUser();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        loadUser();
        navigate("/");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [navigate]);

  // Refresh user state on route changes (handles post-login navigation in same tab)
  useEffect(() => {
    loadUser();
  }, [location.pathname]);

  const handleProfileClick = () => navigate("/profile");
  const handleDashboardClick = () => navigate("/dashboard");
  const handleOrdersClick = () => navigate("/orders");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#f6f7f9] h-16 flex items-center justify-between px-10 md:px-20 lg:px-52">
      <div className="flex items-center">
        <img src={Logo} alt="Motary Logo" className="h-14 w-auto" />
      </div>

      {/* Show nav only if not admin and logged in */}
      {(!user || user.role !== "admin") && (
        <nav className="flex items-center ml-12 gap-8 text-[#171b25] font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setActive(item.name)}
              className={`relative transition-colors duration-300 ${
                active === item.name ? "text-[#e35b25]" : "hover:text-[#e35b25]"
              }`}
            >
              {item.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#e35b25] transition-all duration-300 ${
                  active === item.name
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
                style={{ transformOrigin: "left" }}
              ></span>
            </Link>
          ))}
        </nav>
      )}

      <div className="flex items-center gap-4">
        {!user ? (
          // Not logged in
          <>
            <Link
              to="/login"
              className="px-4 py-1 border border-[#e35b25] text-[#e35b25] rounded-md hover:bg-[#e35b25] hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1 bg-[#e35b25] text-white border-[#e35b25] rounded-md hover:bg-[#c64a1e] transition-colors"
            >
              Register
            </Link>
          </>
        ) : user.role === "admin" ? (
          // Admin: show only Dashboard and Orders; hide nav and profile
          <>
            <button
              onClick={handleDashboardClick}
              className="flex items-center gap-1 px-3 py-1 border border-[#e35b25] text-[#e35b25] rounded-md hover:bg-[#e35b25] hover:text-white transition-colors"
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </button>
            <button
              onClick={handleOrdersClick}
              className="flex items-center gap-1 px-3 py-1 border border-[#e35b25] text-[#e35b25] rounded-md hover:bg-[#e35b25] hover:text-white transition-colors"
            >
              <FaClipboardList />
              <span>Orders</span>
            </button>
          </>
        ) : (
          // Logged in, not admin: show profile
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-1 text-[#e35b25] hover:text-[#c64a1e] transition-colors"
          >
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:inline">{user.firstName}</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
