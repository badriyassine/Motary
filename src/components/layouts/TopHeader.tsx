import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const TopHeader: React.FC = () => {
  return (
    <div className="w-full bg-[#171b25] h-10 flex items-center justify-between px-4 sm:px-6 md:px-20 lg:px-52 text-xs sm:text-sm">
      {/* Left: Email */}
      <a
        href="mailto:info@motary.com"
        className="text-gray-300 hover:text-[#e35b25] transition-colors duration-300 truncate"
      >
        <span className="hidden sm:inline">info@motary.com</span>
        <span className="sm:hidden">info@motary.com</span>
      </a>

      {/* Right: Social Media Icons */}
      <div className="flex items-center gap-3 sm:gap-6 text-gray-300">
        <a
          href="#"
          className="hover:text-[#e35b25] transition-colors duration-300"
        >
          <FaXTwitter />
        </a>
        <a
          href="#"
          className="hover:text-[#e35b25] transition-colors duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          className="hover:text-[#e35b25] transition-colors duration-300"
        >
          <FaFacebookF />
        </a>
        <a
          href="#"
          className="hover:text-[#e35b25] transition-colors duration-300"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
};

export default TopHeader;
