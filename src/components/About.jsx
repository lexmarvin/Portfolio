import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = React.forwardRef((props, ref) => {
  const images = [
    "/images/profile.jpg",
    "/images/image 1.jpg",
    "/images/image 2.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(
    Array(images.length).fill(false)
  );

  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageLoad = (index) => {
    setImagesLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // === GSAP Scroll Animation ===
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".fade-up"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      className="min-h-screen grid md:grid-cols-2 items-center gap-12 px-6 md:px-20 py-20"
    >
      {/* ==== LEFT SIDE - IMAGE SLIDESHOW ==== */}
      <motion.div
        className="flex justify-center fade-up"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="relative w-80 h-96">
          {/* background glow */}
          <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-2xl animate-pulse" />

          {/* slideshow */}
          <div className="relative w-full h-full border-4 border-white shadow-2xl overflow-hidden rounded-2xl">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  idx === currentImage ? "opacity-100" : "opacity-0"
                }`}
              >
                {!imagesLoaded[idx] && (
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl"></div>
                )}

                <img
                  src={img}
                  alt={`About me ${idx + 1}`}
                  className={`w-full h-full object-cover rounded-2xl ${
                    imagesLoaded[idx] ? "block" : "hidden"
                  }`}
                  onLoad={() => handleImageLoad(idx)}
                />
              </div>
            ))}
            {/* dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === currentImage
                      ? "bg-blue-600 scale-110"
                      : "bg-white/70"
                  }`}
                  onClick={() => setCurrentImage(idx)}
                  aria-label={`View slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==== RIGHT SIDE - TEXT ==== */}
      <motion.div
        className="w-full fade-up"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Me
        </h3>

        <ul className="space-y-6 text-lg leading-relaxed">
          <li className="flex items-start gap-3">
            <i className="devicon-react-original colored text-2xl mt-1"></i>
            <p>
              I'm{" "}
              <span className="font-semibold text-blue-600">&lt;L/&gt;ex</span>,
              a passionate software developer who loves building interactive web
              experiences.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <i className="devicon-kotlin-plain colored text-2xl mt-1"></i>
            <p>
              From building apps like{" "}
              <span className="text-blue-600 font-medium">FitQuest</span> to
              exploring creative side projects, I thrive on turning ideas into
              reality.
            </p>
          </li>

          <li className="flex items-start gap-3">
            <i className="devicon-tailwindcss-original colored text-2xl mt-1"></i>
            <p>
              I enjoy learning new technologies, experimenting with design, and
              finding elegant solutions to challenging problems.
            </p>
          </li>
        </ul>
      </motion.div>
    </section>
  );
});

export default About;
