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
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-none">
            Hello! I'm{" "}
            <span className="relative">
                <ReactTyped
                className="typed-white"
                strings={["<L/>ex", "Marvin();"]}
                typeSpeed={100}
                backSpeed={50}
                backDelay={1500}
                loop
                contentType="text"
                />
            </span>
            </h2>

            <p className="text-xl text-white/90 max-w-md mb-8 leading-relaxed font-medium">
            I like building stuff.
            </p>

            <button
            onClick={() => scrollToSection(3)}
            className="group relative px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl"
            >
            <span className="relative z-10">View My Projects</span>
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
            </button>
        </div>

        <div className="mb-10 md:mb-0 md:w-1/2 flex justify-center">
            <div className="relative">
            <div className="relative rounded-full overflow-hidden shadow-2xl w-80 h-80 md:w-96 md:h-96">
                <img
                src={profilePic}
                alt="Lex portrait"
                className="object-cover w-full h-full"
                style={{
                    objectPosition: "50% 10%",
                    transform: "scale(1.1)",
                }}
                />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-white/30 pointer-events-none" />
            <div className="absolute -inset-6 bg-blue-600/10 rounded-full -z-10 animate-pulse" />
            </div>
        </div>
        </section>
    );
    });

export default Hero;
