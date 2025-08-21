import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt 
} from "react-icons/fa";
import Logo from "../../assets/logo/FooterLogo.png";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#171b25] text-gray-300 py-12">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={Logo} alt="Motary Logo" className="h-20 w-auto mb-4" />
          <p className="text-sm max-w-[250px]">
            Motary is a modern car marketplace built for speed, trust, and simplicity — 
            where buying or listing your car is effortless.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-[#e35b25] transition-colors">Home</a></li>
            <li><a href="#cars" className="hover:text-[#e35b25] transition-colors">Cars</a></li>
            <li><a href="#exclusive" className="hover:text-[#e35b25] transition-colors">Exclusive</a></li>
            <li><a href="#support" className="hover:text-[#e35b25] transition-colors">Support</a></li>
            <li><a href="#contact" className="hover:text-[#e35b25] transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <div className="flex items-center gap-2 mb-2">
            <FaEnvelope /> 
            <a href="mailto:info@motary.com" className="hover:text-[#e35b25] transition-colors">
              info@motary.com
            </a>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FaPhone /> 
            <a href="tel:+212600000000" className="hover:text-[#e35b25] transition-colors">
              +212 600 000 000
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt /> 
            <span>Casablanca, Morocco</span>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#e35b25] transition-colors"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-[#e35b25] transition-colors"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-[#e35b25] transition-colors"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-[#e35b25] transition-colors"><FaLinkedinIn size={20} /></a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-[#e35b25] mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Motary. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
