import React from "react";
import { ReactTyped } from "react-typed";
import profilePic from "../assets/images/grad pic.JPG";

const Hero = React.forwardRef(({ scrollToSection }, ref) => {
    return (
        <section
        ref={ref}
        className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-20 px-6 md:px-12 lg:px-60 pt-20"
        >
        <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 whitespace-nowrap">
                Hello! I'm{" "}
                <span className="text-blue-600 inline-block min-w-[200px] md:min-w-[250px] lg:min-w-[300px]">
                    <ReactTyped
                        strings={[
                            "<span class='typed-blue'>&lt;L/&gt;ex</span>",
                            "<span class='typed-gray'>Marvin();</span>"
                        ]}
                        typeSpeed={100}
                        backSpeed={50}
                        backDelay={1500}
                        loop
                        contentType="html"
                    />
                </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
            I like building stuff.
            </p>

            <button
            onClick={() => scrollToSection(3)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
            View My Projects
            </button>
        </div>

        <div className="mb-10 md:mb-0 md:w-1/2 flex justify-center">
            <div className="relative">
            {/* Increased container size */}
            <div className="relative rounded-full overflow-hidden shadow-2xl w-80 h-80 md:w-96 md:h-96">
                <img
                src={profilePic}
                alt="Lex portrait"
                className="object-cover w-full h-full"
                style={{ 
                    objectPosition: "50% 10%", // Adjust this to position your face properly
                    transform: "scale(1.1)" // Zoom in slightly if needed
                }}
                />
            </div>
            {/* Adjusted border position to match new size */}
            <div className="absolute inset-0 rounded-full border-4 border-white/30 pointer-events-none" />
            {/* Adjusted glow effect position */}
            <div className="absolute -inset-6 bg-blue-600/10 rounded-full -z-10 animate-pulse" />
            </div>
        </div>
        </section>
    );
    });

export default Hero;