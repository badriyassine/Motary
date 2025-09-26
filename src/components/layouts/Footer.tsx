import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/FooterLogo.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#171b25] text-gray-300 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/" className="mb-4">
              <img
                src={Logo}
                alt="Motary Logo"
                className="h-16 sm:h-20 w-auto hover:opacity-80 transition-opacity cursor-pointer"
              />
            </Link>
            <p className="text-xs sm:text-sm max-w-[250px] leading-relaxed">
              Motary is a modern car marketplace built for speed, trust, and
              simplicity — where buying or listing your car is effortless.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#e35b25] transition-colors text-xs sm:text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cars"
                  className="hover:text-[#e35b25] transition-colors text-xs sm:text-sm"
                >
                  Cars
                </Link>
              </li>
              <li>
                <Link
                  to="/exclusive"
                  className="hover:text-[#e35b25] transition-colors text-xs sm:text-sm"
                >
                  Exclusive
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-[#e35b25] transition-colors text-xs sm:text-sm"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#e35b25] transition-colors text-xs sm:text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">
              Contact
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <FaEnvelope className="text-xs sm:text-sm" />
              <a
                href="mailto:info@motary.com"
                className="hover:text-[#e35b25] transition-colors text-xs sm:text-sm"
              >
                info@motary.com
              </a>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <FaPhone className="text-xs sm:text-sm" />
              <a
                href="tel:+212600000000"
                className="hover:text-[#e35b25] transition-colors text-xs sm:text-sm"
              >
                +212 600 000 000
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-xs sm:text-sm" />
              <span className="text-xs sm:text-sm">Casablanca, Morocco</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">
              Follow Us
            </h3>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="hover:text-[#e35b25] transition-colors">
                <FaTwitter size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-[#e35b25] transition-colors">
                <FaInstagram size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-[#e35b25] transition-colors">
                <FaFacebookF size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-[#e35b25] transition-colors">
                <FaLinkedinIn size={16} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-[#e35b25] mt-6 sm:mt-10 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Motary. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
