import { useState } from "react";
import Logo from "../../assets/Logo (2).png"; // import the image

export default function Header() {
  const [active, setActive] = useState("Home");

  const navItems = ["Home", "Cars", "Exclusive", "Support", "Contact"];

  return (
    <header className="w-full bg-[#f6f7f9] h-16 flex items-center justify-between px-52">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src={Logo}
          alt="Motary Logo"
          className="h-16 w-auto"
        />
      </div>

      {/* Right: Navigation */}
      <nav className="flex items-center gap-8 text-[#171b25] font-medium">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setActive(item)}
            className={`relative transition-colors duration-300 ${
              active === item ? "text-[#e35b25]" : "hover:text-[#e35b25]"
            }`}
          >
            {item}
            <span
              className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#e35b25] transition-all duration-300 ${
                active === item ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
              style={{ transformOrigin: "left" }}
            ></span>
          </a>
        ))}
      </nav>
    </header>
  );
}

