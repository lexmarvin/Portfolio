import React from "react";

const Skills = React.forwardRef((props, ref) => {
    const skillCategories = [
        {
        title: "Languages",
        skills: [
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        ]
        },
        {
        title: "Front End",
        skills: [
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        ]
        },
        {
        title: "Other Technologies",
        skills: [
            { name: "GSAP", icon: "GSAP", customIcon: true },
        ]
        }
    ];

    return (
        <section
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
        >
        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills & Technologies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl w-full">
            {skillCategories.map((category, index) => (
                <div 
                    key={category.title}
                    className="glass-card rounded-3xl p-8 hover-glow group"
                >
                    <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
                        {category.title}
                    </h4>
                    <ul className="space-y-4">
                        {category.skills.map((skill) => (
                            <li key={skill.name} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group-hover:scale-105">
                                <div className="relative">
                                    {skill.customIcon ? (
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 text-white flex items-center justify-center font-bold rounded-lg text-xs shadow-lg">
                                            GSAP
                                        </div>
                                    ) : (
                                        <img src={skill.icon} className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" alt={skill.name} />
                                    )}
                                </div>
                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">{skill.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        </section>
    );
    });

export default Skills;