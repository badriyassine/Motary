import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function TopHeader() {
  return (
    <div className="w-full bg-[#171b25] h-10 flex items-center justify-between px-52 text-sm">
      {/* Left: Email */}
      <a
        href="mailto:info@motary.com"
        className="ml-4 text-gray-300 hover:text-[#e35b25] transition-colors duration-300"
      >
        info@motary.com
      </a>

      {/* Right: Social Media Icons */}
      <div className="flex items-center gap-6 text-gray-300 mr-4">
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
}
