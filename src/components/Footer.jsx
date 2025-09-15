import React from "react";

const Footer = React.forwardRef((props, ref) => {
  return (
    <footer
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gray-900 text-white"
    >
      <div className="text-center max-w-2xl">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h3>
        <p className="text-lg text-gray-300 mb-10">
          I'm always interested in new opportunities and collaborations. Feel free to reach out!
        </p>
        
        <div className="flex justify-center gap-6 mb-12">
          <a href="mailto:your-email@example.com" className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-6 h-6" alt="GitHub" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" className="w-6 h-6" alt="LinkedIn" />
          </a>
        </div>
        
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Lex Gustilo. All rights reserved.
        </p>
      </div>
    </footer>
  );
});

export default Footer;