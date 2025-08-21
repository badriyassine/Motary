import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/Logo (2).png";
import { FaUserCircle } from "react-icons/fa";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const Header: React.FC = () => {
  const [active, setActive] = useState<string>("Home");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Example: Get user from localStorage after login/register
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const navItems: { name: string; path: string }[] = [
    { name: "Home", path: "/" },
    { name: "Exclusive", path: "/exclusive" },
    { name: "Cars", path: "/cars" },
    { name: "Support", path: "/support" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-[#f6f7f9] h-16 flex items-center justify-between px-10 md:px-20 lg:px-52">
      {/* Logo */}
      <div className="flex items-center">
        <img src={Logo} alt="Motary Logo" className="h-14 w-auto" />
      </div>

      {/* Navigation */}
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

      {/* Buttons / Profile */}
      <div className="flex items-center gap-2">
        {user ? (
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-1 text-[#e35b25] hover:text-[#c64a1e] transition-colors"
          >
            <FaUserCircle className="text-2xl" />
            <span className="hidden md:inline">{user.firstName}</span>
          </button>
        ) : (
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
        )}
      </div>
    </header>
  );
};

export default Header;



