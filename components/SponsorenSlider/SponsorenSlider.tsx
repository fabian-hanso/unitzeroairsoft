"use client";
import { motion } from "framer-motion";

const logos = ["/Logo.svg", "/Begadi.webp", "/Revice.png"];

const LogoSlider = () => {
  return (
    <div className="overflow-hidden w-full bg-white py-4 border-b border-stone-400">
      <motion.div
        className="flex lg:gap-36 gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...logos, ...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-auto min-w-40 h-8 flex items-center justify-center"
          >
            <img
              src={logo}
              alt={`logo-${idx}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoSlider;
