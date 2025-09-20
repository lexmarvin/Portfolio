import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollToPlugin);

// Custom hook for scroll snapping
const useScrollSnap = (sectionsRef, currentIndex, scrollToSection) => {
  useEffect(() => {
    const container = document.querySelector(".scroll-container");
    if (!container) return;

    let isAnimating = false;
    let touchStartY = 0;

    const onWheel = (e) => {
      e.preventDefault();
      if (isAnimating) return;

      if (e.deltaY > 50) {
        // Scroll down
        if (currentIndex.current < sectionsRef.current.length - 1) {
          isAnimating = true;
          currentIndex.current++;
          scrollToSection(currentIndex.current);
          setTimeout(() => (isAnimating = false), 1000);
        }
      } else if (e.deltaY < -50) {
        // Scroll up
        if (currentIndex.current > 0) {
          isAnimating = true;
          currentIndex.current--;
          scrollToSection(currentIndex.current);
          setTimeout(() => (isAnimating = false), 1000);
        }
      }
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (isAnimating) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchEndY - touchStartY;

      if (diff > 50) {
        // Swipe down
        if (currentIndex.current > 0) {
          isAnimating = true;
          currentIndex.current--;
          scrollToSection(currentIndex.current);
          setTimeout(() => (isAnimating = false), 1000);
        }
      } else if (diff < -50) {
        // Swipe up
        if (currentIndex.current < sectionsRef.current.length - 1) {
          isAnimating = true;
          currentIndex.current++;
          scrollToSection(currentIndex.current);
          setTimeout(() => (isAnimating = false), 1000);
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [sectionsRef, currentIndex, scrollToSection]);
};

export default function App() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const bgGradientRef = useRef(null);

  let currentIndex = useRef(0);

  // Gradient background colors for each section
  const sectionGradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Hero
    "linear-gradient(135deg, #ffe4e6 0%, #bbdefb 100%)", // About
    "linear-gradient(135deg, #dbeafe 0%, #c8e6c9 100%)", // Skills
    "linear-gradient(135deg, #dcfce7 0%, #ffecb3 100%)", // Projects
    "linear-gradient(135deg, #111827 0%, #1e3a8a 100%)", // Footer
  ];

  // Scroll to section
  const scrollToSection = (index) => {
    if (!sectionsRef.current[index]) return;

    currentIndex.current = index;
    setActiveSection(index);

    gsap.to(containerRef.current, {
      scrollTo: { y: sectionsRef.current[index], autoKill: true },
      duration: 1,
      ease: "power4.out",
    });

    // Animate gradient background change
    if (bgGradientRef.current) {
      gsap.to(bgGradientRef.current, {
        background: sectionGradients[index],
        duration: 1.5,
        ease: "power2.out",
      });
    }

    setMenuOpen(false);
  };

  // Use custom scroll snap hook
  useScrollSnap(sectionsRef, currentIndex, scrollToSection);

  // Handle scroll events for updating active section and background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = containerRef.current.scrollTop;
      const sectionPositions = sectionsRef.current.map(section => 
        section ? section.offsetTop : 0
      );
      
      let currentSection = 0;
      for (let i = 0; i < sectionPositions.length; i++) {
        if (scrollPosition >= sectionPositions[i] - 100) {
          currentSection = i;
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        currentIndex.current = currentSection;
        
        // Update background gradient
        if (bgGradientRef.current) {
          gsap.to(bgGradientRef.current, {
            background: sectionGradients[currentSection],
            duration: 1.5,
            ease: "power2.out",
          });
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [activeSection, sectionGradients]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        ref={bgGradientRef}
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{ background: sectionGradients[0] }}
      />
      
      {/* Main Content */}
      <div
        ref={containerRef}
        className="scroll-container relative z-10 h-screen w-screen overflow-y-scroll no-scrollbar text-gray-900"
      >
        <Navbar 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen} 
          scrollToSection={scrollToSection}
          activeSection={activeSection}
        />
        
        <Hero 
          ref={(el) => (sectionsRef.current[0] = el)}
          scrollToSection={scrollToSection}
        />
        
        <About 
          ref={(el) => (sectionsRef.current[1] = el)}
        />
        
        <Skills 
          ref={(el) => (sectionsRef.current[2] = el)}
        />
        
        <Projects 
          ref={(el) => (sectionsRef.current[3] = el)}
        />
        
        <Footer 
          ref={(el) => (sectionsRef.current[4] = el)}
        />
      </div>
    </div>
  );
}