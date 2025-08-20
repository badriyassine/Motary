import React from "react";
import Brand1 from "../../../assets/brand1.png"; // replace with your brand logos
import Brand2 from "../../../assets/brand2.png";
import Brand3 from "../../../assets/brand3.png";
import Brand4 from "../../../assets/brand4.png";
import Brand5 from "../../../assets/brand5.png";

export default function Brands() {
  const brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand1, Brand2]; // repeated for smooth loop

  return (
    <section className="w-full bg-[#f6f7f9] py-20 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#171b25]">Our Trusted Brands</h2>
        <p className="text-gray-600 mt-2">We work with the most renowned car brands in the industry</p>
      </div>

      {/* Scrolling logos */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee gap-16">
          {brands.map((brand, idx) => (
            <div key={idx} className="flex-shrink-0">
              <img src={brand} alt={`Brand ${idx + 1}`} className="h-20 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
