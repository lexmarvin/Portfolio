import React, { useEffect, useRef, useState } from "react";
import { ReactTyped } from "react-typed";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import profilePic from "./assets/images/grad pic.JPG";

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const topBar = useRef(null);
  const midBar = useRef(null);
  const botBar = useRef(null);
  const menuRef = useRef(null);

  let currentIndex = useRef(0);

  // 🎨 Pastel background colors
  const sectionBgColors = [
  "#ffffff", // Hero (white)
  "#ffe4e6", // About (soft pink)
  "#dbeafe", // Skills (soft blue)
  "#dcfce7", // Projects (soft green)
  "#111827", // Footer (dark gray)
];


  const [bgColor, setBgColor] = useState(sectionBgColors[0]);

  // Scroll to section
  const scrollToSection = (index) => {
    if (!sectionsRef.current[index]) return;

    currentIndex.current = index;

    gsap.to(containerRef.current, {
      scrollTo: { y: sectionsRef.current[index], autoKill: true },
      duration: 1,
      ease: "power4.out",
    });

    gsap.to(containerRef.current, {
      backgroundColor: sectionBgColors[index],
      duration: 1,
      ease: "power2.out",
    });

    setBgColor(sectionBgColors[index]);
  };

  // Scroll snap w/ mouse wheel
  useEffect(() => {
    const container = containerRef.current;
    let isAnimating = false;

    const onWheel = (e) => {
      e.preventDefault();
      if (isAnimating) return;

      if (e.deltaY > 0) {
        if (currentIndex.current < sectionsRef.current.length - 1) {
          isAnimating = true;
          currentIndex.current++;
          scrollToSection(currentIndex.current);
          setTimeout(() => (isAnimating = false), 1000);
        }
      } else {
        if (currentIndex.current > 0) {
          isAnimating = true;
          currentIndex.current--;
          scrollToSection(currentIndex.current);
          setTimeout(() => (isAnimating = false), 1000);
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

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

  // 🔥 Slideshow
  const images = [
    "/images/profile.jpg",
    "/images/image 1.jpg",
    "/images/image 2.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll no-scrollbar text-gray-900 transition-colors duration-700 animated-bg"
      style={{ backgroundColor: bgColor }}
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 ">
        <h1 className="text-xl font-semibold tracking-tight">
          <span className="text-blue-600">&lt;L/&gt;</span>ex
        </h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1 cursor-pointer bg-transparent"
        >
          <span ref={topBar} className="block h-0.5 w-6 bg-gray-800 rounded"></span>
          <span ref={midBar} className="block h-0.5 w-6 bg-gray-800 rounded"></span>
          <span ref={botBar} className="block h-0.5 w-6 bg-gray-800 rounded"></span>
        </button>
      </nav>

      {/* Side Menu */}
      <div
        ref={menuRef}
        className="fixed top-8 right-0 w-50 bg-transparent flex flex-col items-start p-6 z-40 translate-x-full h-30"
      >
        <ul className="space-y-6 text-lg font-medium">
          <li onClick={() => scrollToSection(1)} className="hover:text-blue-600 cursor-pointer">
            About
          </li>
          <li onClick={() => scrollToSection(2)} className="hover:text-blue-600 cursor-pointer">
            Skills
          </li>
          <li onClick={() => scrollToSection(3)} className="hover:text-blue-600 cursor-pointer">
            Projects
          </li>
          <li onClick={() => scrollToSection(4)} className="hover:text-blue-600 cursor-pointer">
            Contact
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
          className="h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6 md:px-60 pt-20"
      >
        <div className="text-center md:text-left md:w-2/5 lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hello! I’m{" "}
            <span className="text-blue-600">
              <ReactTyped
                strings={[
                  "<span class='text-blue-600'>&lt;L/&gt;ex</span>",
                  "<span class='text-gray-500'>Marvin();</span>",
                ]}
                typeSpeed={100}
                backSpeed={50}
                backDelay={1500}
                loop
              />
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-md mb-6">
            I like building stuff.
          </p>

          <button
            onClick={() => scrollToSection(3)}
            className="hero-btn hover:translate-y-1 transition transform"
          >
            View My Projects
          </button>
        </div>

        <div className="mb-10 md:mb-0 md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src={profilePic}
              alt="Lex portrait"
              className="rounded-full shadow-lg object-cover w-72 h-72 md:w-80 md:h-100"
            />
            <div className="absolute inset-0 rounded-full border border-gray-200 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20"
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-80 h-96 border-2 border-black relative overflow-hidden rounded-lg">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`slideshow-${idx}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  idx === currentImage ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">About Me</h3>
          <p className="text-lg mb-4">
            I'm <span className="font-semibold text-blue-600">&lt;L/&gt;ex</span>, a passionate software developer who loves creating interactive web experiences.
          </p>
          <p className="text-lg mb-4">
            From building innovative apps like <span className="text-blue-600 font-medium">FitQuest</span> to exploring creative side projects, I thrive on turning ideas into reality.
          </p>
          <p className="text-lg">
            I enjoy learning new technologies, experimenting with design, and finding elegant solutions to challenging problems.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl w-full text-center">
          {/* Languages */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Languages</h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-6 h-6" alt="JavaScript" />
                JavaScript
              </li>
              <li className="flex items-center justify-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" className="w-6 h-6" alt="Kotlin" />
                Kotlin
              </li>
              <li className="flex items-center justify-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-6 h-6" alt="Python" />
                Python
              </li>
              <li className="flex items-center justify-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="w-6 h-6" alt="SQL" />
                SQL
              </li>
            </ul>
          </div>

          {/* Frontend */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Front End</h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-6 h-6" alt="React" />
                React
              </li>
              <li className="flex items-center justify-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className="w-6 h-6" alt="Next.js" />
                Next.js
              </li>
              <li className="flex items-center justify-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" className="w-6 h-6" alt="Tailwind" />
                Tailwind
              </li>
            </ul>
          </div>

          {/* Other Tech */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Other Technologies</h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 bg-green-600 text-white flex items-center justify-center font-bold rounded">G</div>
                GSAP
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="h-screen flex flex-col items-center justify-center px-6"
      >
        <h3 className="text-2xl font-semibold text-center mb-10">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FitQuest */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">FitQuest</h4>
            <p className="text-gray-600 text-sm mb-4">
              A reward-based fitness app that utilizes motion tracking technology to gamify workouts.
            </p>
            <div
              onClick={() => window.open("https://github.com/lexmarvin/FitQuestAlpha3.git", "_blank")}
              className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub"
                className="w-5 h-5"
              />
              GitHub
            </div>
          </div>

          {/* K.K.K */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">K.K.K (KasKas Keyboard)</h4>
            <p className="text-gray-600 text-sm mb-4">
              A speed typing test with Tagalog words.
            </p>
            <div
              onClick={() => window.open("https://github.com/lexmarvin/KasKasKeyboard.git", "_blank")}
              className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub"
                className="w-5 h-5"
              />
              GitHub
            </div>
          </div>
        </div>
         {/* Footer (inline, not a section) */}
        <footer className="mt-20 text-gray-400 text-sm text-center">
          © {new Date().getFullYear()} Lex Gustilo. All rights reserved.
        </footer>
      </section>
    </div>
  );
}
