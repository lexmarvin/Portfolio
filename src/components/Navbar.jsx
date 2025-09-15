import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Navbar = ({ menuOpen, setMenuOpen, scrollToSection, activeSection }) => {
  const topBar = useRef(null);
  const midBar = useRef(null);
  const botBar = useRef(null);
  const menuRef = useRef(null);
  const navItems = ["About", "Skills", "Projects", "Contact"];

  // Animate burger menu
  useEffect(() => {
    if (menuOpen) {
      gsap.to(topBar.current, { rotation: 45, y: 8, duration: 0.3 });
      gsap.to(midBar.current, { opacity: 0, duration: 0.3 });
      gsap.to(botBar.current, { rotation: -45, y: -8, duration: 0.3 });

      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power4.out" }
      );
    } else {
      gsap.to(topBar.current, { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(midBar.current, { opacity: 1, duration: 0.3 });
      gsap.to(botBar.current, { rotation: 0, y: 0, duration: 0.3 });

      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power4.in",
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight">
          <span className="text-blue-600">&lt;L/&gt;</span>ex
        </h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1 cursor-pointer bg-transparent z-50"
          aria-label="Toggle menu"
        >
          <span ref={topBar} className="block h-0.5 w-6 bg-gray-800 rounded transition-all"></span>
          <span ref={midBar} className="block h-0.5 w-6 bg-gray-800 rounded transition-all"></span>
          <span ref={botBar} className="block h-0.5 w-6 bg-gray-800 rounded transition-all"></span>
        </button>
      </nav>

      {/* Side Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-64 h-full bg-white/95 backdrop-blur-md flex flex-col items-start p-6 z-40 translate-x-full shadow-xl pt-20"
      >
        <ul className="space-y-6 text-lg font-medium w-full">
          {navItems.map((item, index) => (
            <li 
              key={item}
              onClick={() => scrollToSection(index + 1)} 
              className={`py-2 px-4 rounded-lg cursor-pointer transition-all ${
                activeSection === index + 1 
                  ? "bg-blue-100 text-blue-600" 
                  : "hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;