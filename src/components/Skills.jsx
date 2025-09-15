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
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-6 text-center border-b pb-2">{category.title}</h4>
            <ul className="space-y-4">
              {category.skills.map((skill) => (
                <li key={skill.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  {skill.customIcon ? (
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center font-bold rounded text-xs">
                      GSAP
                    </div>
                  ) : (
                    <img src={skill.icon} className="w-8 h-8" alt={skill.name} />
                  )}
                  <span className="text-gray-700">{skill.name}</span>
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