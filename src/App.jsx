import React, { useEffect, useRef, useState } from "react";
import { ReactTyped } from "react-typed";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import profilePic from "./assets/images/profile.jpg";

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const topBar = useRef(null);
  const midBar = useRef(null);
  const botBar = useRef(null);
  const menuRef = useRef(null);

  let currentIndex = useRef(0); // track current section

  // scroll function accessible anywhere
  const scrollToSection = (index) => {
    if (!sectionsRef.current[index]) return;

    currentIndex.current = index; // update current index
    gsap.to(containerRef.current, {
      scrollTo: { y: sectionsRef.current[index], autoKill: true },
      duration: 1,
      ease: "power4.out",
    });
  };

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

  // Animate burger -> X
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
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll no-scrollbar bg-gray-50 text-gray-900"
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white ">
        <h1 className="text-xl font-semibold tracking-tight">&lt;L/&gt;ex</h1>

        {/* Burger Icon */}
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
        className="fixed top-0 right-2 w-56 bg-white flex flex-col items-start p-6 pt-21 z-40 translate-x-full"
      >
        <ul className="space-y-6 text-lg font-medium">
          <li onClick={() => scrollToSection(1)} className="hover:text-blue-600 cursor-pointer">About</li>
          <li onClick={() => scrollToSection(2)} className="hover:text-blue-600 cursor-pointer">Projects</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* Hero Section */}
      <section ref={(el) => (sectionsRef.current[0] = el)} className="h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-50 bg-white pt-20">
        <div className="text-center md:text-left md:w-2/5 lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hello! I’m{" "}
            <span className="text-blue-600">
              <ReactTyped
                strings={[
                  "<span class='text-blue-600'>&lt;L/&gt;ex</span>",
                  "<span class='text-red-500'>Marvin();</span>",
                ]}
                typeSpeed={100}
                backSpeed={50}
                backDelay={1500}
                loop
              />
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-md mb-6">I like building stuff.</p>

          {/* Hero button */}
          <button
            onClick={() => scrollToSection(2)}
            className="hero-btn px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:translate-y-1 transition transform"
          >
            View My Projects
          </button>
        </div>

        <div className="mb-10 md:mb-0 md:w-1/2 flex justify-center">
          <div className="relative">
            <img src={profilePic} alt="Lex portrait" className="rounded-full shadow-lg object-cover w-72 h-72 md:w-80 md:h-80" />
            <div className="absolute inset-0 rounded-full border border-gray-200 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={(el) => (sectionsRef.current[1] = el)} className="h-screen flex flex-col items-center justify-center px-6 bg-gray-50 text-gray-900">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-6">About Me</h3>
        <div className="max-w-3xl text-center space-y-4">
          <p className="text-lg text-gray-600">
            I’m <span className="font-semibold text-blue-600">&lt;L/&gt;ex</span>, a passionate software developer who loves creating interactive web experiences.
          </p>
          <p className="text-lg text-gray-600">
            From building innovative apps like <span className="text-blue-600 font-medium">FitQuest</span> to exploring creative side projects, I thrive on turning ideas into reality.
          </p>
          <p className="text-lg text-gray-600">
            I enjoy learning new technologies, experimenting with design, and finding elegant solutions to challenging problems.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {["React", "Tailwind", "GSAP", "Kotlin", "PHP", "SQL"].map((skill, i) => (
            <span key={i} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium hover:scale-105 transform transition">
              {skill}
            </span>
          ))}
        </div>
        <button onClick={() => scrollToSection(2)} className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:translate-y-1 transition transform">
          View My Projects
        </button>
      </section>

      {/* Projects Section */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="h-screen flex flex-col items-center justify-center px-6 bg-white-100">
        <h3 className="text-2xl font-semibold text-center mb-10">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">FitQuest</h4>
                        <p className="text-gray-600 text-sm mb-4">
              A reward-based fitness app that utilizes motion tracking technology to gamify workouts.
            </p>
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
              See More →
            </span>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">K.K.K (KasKas Keyboard)</h4>
            <p className="text-gray-600 text-sm mb-4">
              A speed typing typing test with Tagalog words.
            </p>
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
              See More →
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section ref={(el) => (sectionsRef.current[3] = el)} className="flex items-center justify-center bg-gray-900 text-gray-300 h-12">
        <footer className="text-center">
          © {new Date().getFullYear()} Lex Gustilo. All rights reserved.
        </footer>
      </section>
    </div>
  );
}

