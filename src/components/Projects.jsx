import React from "react";

const Projects = React.forwardRef((props, ref) => {
    const projects = [
        {
        title: "FitQuest",
        description: "A reward-based fitness app that utilizes motion tracking technology to gamify workouts.",
        githubUrl: "https://github.com/lexmarvin/FitQuestAlpha3.git",
        },
        {
        title: "K.K.K (KasKas Keyboard)",
        description: "A speed typing test with Tagalog words.",
        githubUrl: "https://github.com/lexmarvin/KasKasKeyboard.git",
        },
    ];

    return (
        <section
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
        >
        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Projects</h3>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:bg-white/20">
            {projects.map((project, index) => (
            <div 
                key={project.title}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
                <h4 className="text-xl font-semibold mb-3 text-gray-800">{project.title}</h4>
                <p className="text-gray-600 mb-5 leading-relaxed">{project.description}</p>
                <button
                onClick={() => window.open(project.githubUrl, "_blank")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    alt="GitHub"
                    className="w-5 h-5"
                />
                View on GitHub
                </button>
            </div>
            ))}
        </div>
        </section>
    );
    });

export default Projects;