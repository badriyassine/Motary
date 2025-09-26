import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo/Logo (2).png";
import NotificationCenter from "../NotificationCenter";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaClipboardList,
  FaBars,
  FaTimes,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  // Load user from localStorage
  const loadUser = () => {
    const token = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    if (token && localUser) {
      try {
        const userData = JSON.parse(localUser);
        setUser(userData);
      } catch (err) {
        console.error("Failed to parse user data:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        loadUser();
        if (e.key === "token" && e.newValue) {
          navigate("/");
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [navigate]);

  // Refresh user state on route changes (handles post-login navigation in same tab)
  useEffect(() => {
    loadUser();
  }, [location.pathname]);

  // Listen for custom login event
  useEffect(() => {
    const handleLogin = () => {
      loadUser();
    };

    window.addEventListener("userLogin", handleLogin);
    return () => window.removeEventListener("userLogin", handleLogin);
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
    setIsMobileMenuOpen(false);
  };
  const handleDashboardClick = () => {
    navigate("/dashboard");
    setIsMobileMenuOpen(false);
  };
  const handleOrdersClick = () => {
    navigate("/dashboard/orders");
    setIsMobileMenuOpen(false);
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-[#f6f7f9] h-16 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 xl:px-52">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={Logo}
              alt="Motary Logo"
              className="h-10 sm:h-12 lg:h-14 w-auto hover:opacity-80 transition-opacity cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Navigation - Show nav only if not admin and logged in */}
        {(!user || user.role !== "admin") && (
          <nav className="hidden md:flex items-center ml-4 lg:ml-12 gap-4 lg:gap-8 text-[#171b25] font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setActive(item.name)}
                className={`relative transition-colors duration-300 text-sm lg:text-base ${
                  active === item.name
                    ? "text-[#e35b25]"
                    : "hover:text-[#e35b25]"
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

        <div className="flex items-center gap-2 sm:gap-4">
          {user && <NotificationCenter />}

          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-4">
            {!user ? (
              // Not logged in
              <>
                <Link
                  to="/login"
                  className="px-2 sm:px-4 py-1 border border-[#e35b25] text-[#e35b25] rounded-md hover:bg-[#e35b25] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-2 sm:px-4 py-1 bg-[#e35b25] text-white border-[#e35b25] rounded-md hover:bg-[#c64a1e] transition-colors text-xs sm:text-sm"
                >
                  Register
                </Link>
              </>
            ) : user.role === "admin" ? (
              // Admin: show only Dashboard and Orders; hide nav and profile
              <>
                <button
                  onClick={handleDashboardClick}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1 border border-[#e35b25] text-[#e35b25] rounded-md hover:bg-[#e35b25] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  <FaTachometerAlt className="text-sm sm:text-base" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button
                  onClick={handleOrdersClick}
                  className="flex items-center gap-1 px-2 sm:px-3 py-1 border border-[#e35b25] text-[#e35b25] rounded-md hover:bg-[#e35b25] hover:text-white transition-colors text-xs sm:text-sm"
                >
                  <FaClipboardList className="text-sm sm:text-base" />
                  <span className="hidden sm:inline">Orders</span>
                </button>
              </>
            ) : (
              // Logged in, not admin: show profile
              <>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-1 text-[#e35b25] hover:text-[#c64a1e] transition-colors"
                >
                  <FaUserCircle className="text-xl sm:text-2xl" />
                  <span className="hidden lg:inline">{user.firstName}</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[#171b25] hover:text-[#e35b25] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        >
          <div
            className="fixed top-16 left-0 right-0 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {(!user || user.role !== "admin") && (
                <nav className="space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setActive(item.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        active === item.name
                          ? "bg-[#e35b25] text-white"
                          : "text-[#171b25] hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              )}

              {/* Mobile Auth Section */}
              <div className="border-t pt-4">
                {!user ? (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center border border-[#e35b25] text-[#e35b25] rounded-lg hover:bg-[#e35b25] hover:text-white transition-colors font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center bg-[#e35b25] text-white rounded-lg hover:bg-[#c64a1e] transition-colors font-medium"
                    >
                      Register
                    </Link>
                  </div>
                ) : user.role === "admin" ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleDashboardClick}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-[#e35b25] text-[#e35b25] rounded-lg hover:bg-[#e35b25] hover:text-white transition-colors font-medium"
                    >
                      <FaTachometerAlt />
                      Dashboard
                    </button>
                    <button
                      onClick={handleOrdersClick}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-[#e35b25] text-[#e35b25] rounded-lg hover:bg-[#e35b25] hover:text-white transition-colors font-medium"
                    >
                      <FaClipboardList />
                      Orders
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[#e35b25] hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    <FaUserCircle size={20} />
                    Profile ({user.firstName})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
