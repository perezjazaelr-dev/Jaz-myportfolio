import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import Chatbot from './components/Chatbot';
import './index.css';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
    <line x1="14" y1="4" x2="10" y2="20"></line>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

const NextJsIcon = () => (
  <svg viewBox="0 0 128 128" width="16" height="16"><path fill="#fff" d="M64 0a64 64 0 1064 64A64.07 64.07 0 0064 0zm0 122a58 58 0 1158-58 58.07 58.07 0 01-58 58z"/><path fill="#fff" d="M84.7 92.5L42.2 38.6v53.2h5.5V47.5l38 49.3 5.4-6.4V38.6h-5.5v48z"/></svg>
);
const ReactJsIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" width="16" height="16"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
);
const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#38bdf8" d="M12 4.25c-3 0-5.25 1.5-6 4.5 1.5-1.5 3-1.875 4.5-1.125 1.05.525 1.8 1.425 2.775 2.625C14.7 12 16.5 14.25 19.5 14.25c3 0 5.25-1.5 6-4.5-1.5 1.5-3 1.875-4.5 1.125-1.05-.525-1.8-1.425-2.775-2.625C16.8 6.75 15 4.25 12 4.25zM6 9.875c-3 0-5.25 1.5-6 4.5 1.5-1.5 3-1.875 4.5-1.125 1.05.525 1.8 1.425 2.775 2.625C8.7 17.625 10.5 19.875 13.5 19.875c3 0 5.25-1.5 6-4.5-1.5 1.5-3 1.875-4.5 1.125-1.05-.525-1.8-1.425-2.775-2.625C10.8 12.375 9 9.875 6 9.875z"/></svg>
);
const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#3178C6" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c3.125 0 5.513 2.388 5.513 5.513 0 3.125-2.388 5.512-5.513 5.512-3.125 0-5.512-2.387-5.512-5.512 0-3.125 2.387-5.513 5.512-5.513zM2.25 12.188h7.688v1.687H6.094v7.875H4.406v-7.875H2.25zm16.238.187c-1.625 0-3.063 1.063-3.625 2.625h1.75c.375-.75 1.125-1.125 1.875-1.125.875 0 1.5.625 1.5 1.5v.375c0 .375-.25.625-.625.75l-2.125.625c-1.25.375-2.125 1.375-2.125 2.75 0 1.5 1.125 2.625 2.625 2.625 1.5 0 2.875-1.063 3.5-2.625h-1.75c-.375.75-1.125 1.125-1.75 1.125-.875 0-1.5-.625-1.5-1.5v-.375c0-.5.375-.875.875-1l2.125-.625c1.125-.375 2-1.375 2-2.75 0-1.625-1.25-3-2.75-3z"/></svg>
);
const PythonIcon = () => (
  <svg viewBox="0 0 128 128" width="16" height="16"><path fill="#3776ab" d="M64 6.7c-29.3 0-28 12.8-28 12.8l.1 13.5h28.6v4H35.3S20 35.7 20 62.7s12.5 27.5 12.5 27.5h8.9V75.6s0-13 13.3-13h27s12.4 0 12.4-12.2V19.7s1.3-13-30.1-13z"/><path fill="#ffd343" d="M64 121.3c29.3 0 28-12.8 28-12.8l-.1-13.5H63.3v-4h29.4s15.3 1.3 15.3-25.7-12.5-27.5-12.5-27.5h-8.9v14.6s0 13-13.3 13h-27s-12.4 0-12.4 12.2v30.7s-1.3 13 30.1 13z"/><circle fill="#fff" cx="44.9" cy="24.4" r="3.7"/><circle fill="#fff" cx="83.1" cy="103.6" r="3.7"/></svg>
);
const DjangoIcon = () => (
  <svg viewBox="0 0 128 128" width="16" height="16"><path fill="#092e20" d="M52.3 87.2c-5.7 0-9.8-1.5-12.1-4.7s-3.5-8-3.5-14.7v-38h11.2v37c0 4.1.6 7 1.9 8.6 1.3 1.6 3.1 2.3 5.3 2.3 2.2 0 3.9-.8 5.3-2.3 1.3-1.6 2-4.4 2-8.6v-37h11.1v38.1c0 6.6-1.2 11.5-3.6 14.6-2.4 3.1-6.6 4.7-12.5 4.7-2.3.1-3.6.1-5.1 0zM77.4 30.2h12V87h-12V30.2z"/></svg>
);
const PhpIcon = () => (
  <svg viewBox="0 0 128 128" width="16" height="16"><path fill="#777bb3" d="M64 21C28.7 21 0 40.2 0 64s28.7 43 64 43 64-19.2 64-43S99.3 21 64 21zm-18.4 61.4h-6L44 51.5h11.8c4.2 0 7.3.7 9.2 2.1 1.9 1.4 2.9 3.6 2.9 6.7 0 2.9-.9 5.2-2.7 6.8-1.8 1.5-4.8 2.3-8.8 2.3H48l-2.4 13zM85.4 82.4h-5.8l6.8-37.4h6l-3.3 17.8c3.2-1 6.5-1.5 9.7-1.5 3.3 0 5.6.8 6.9 2.3 1.3 1.5 2 3.6 2 6.3 0 1.2-.1 2.6-.4 4L101.9 82h-6l5-26c0-1.8-.4-3.1-1.1-3.8-.8-.8-2-1.1-3.8-1.1-2.9 0-5.8.6-8.8 1.9l-1.8-1.9-5.1 28.3h5.1z"/><path fill="#fff" d="M51.8 56.4c-1.3 0-2.3.4-2.8 1.2-.6.8-.9 2-.9 3.6 0 1.6.3 2.9.9 3.7.6.8 1.6 1.2 2.8 1.2h6.1l2.5-13.8h-4.3c-.7.1-2.2.1-4.3.1z"/></svg>
);
const LaravelIcon = () => (
  <svg viewBox="0 0 128 128" width="16" height="16"><path fill="#ff2d20" d="M110.1 35.8L66.7 10.7a5.5 5.5 0 00-5.4 0L17.9 35.8a5.5 5.5 0 00-2.7 4.7v50c0 2 1 3.8 2.7 4.7l43.4 25.1a5.5 5.5 0 005.4 0l43.4-25.1a5.5 5.5 0 002.7-4.7v-50c0-1.9-1-3.8-2.7-4.7z"/><path fill="#fff" d="M83.6 47.9H37.3l26.6 26.6h19.7L83.6 47.9zM64 104.7v-54l-26.7-24v64.6a5.5 5.5 0 002.7 4.7L64 104.7zM90.7 76.6V39.9L69.3 61.2h21.4z"/></svg>
);
const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#E34F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l1.5 13 6.5 3 6.5-3 1.5-13z" /><path d="M7.5 8h9l-1 8-3.5 1-3.5-1-.25-2.5" /></svg>
);
const CssIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#1572B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l1.5 13 6.5 3 6.5-3 1.5-13z" /><path d="M7.5 8h9l-1 8-3.5 1-3.5-1-.25-2.5" /></svg>
);
const JavaScriptIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#F7DF1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 8v8M15 16c-2 0-3-1-3-3" /></svg>
);
const FigmaIcon = () => (
  <svg viewBox="0 0 128 128" width="16" height="16"><path fill="#f24e1e" d="M38.8 63.9h25v33.4a12.5 12.5 0 01-25 0V63.9z"/><path fill="#ff7262" d="M38.8 30.5h25v33.4h-25z"/><path fill="#1abcfe" d="M63.8 63.9h25.1a16.7 16.7 0 01-16.7 16.7 16.7 16.7 0 01-8.4-33.4z"/><path fill="#0acf83" d="M63.8 30.5v33.4h25.1a16.7 16.7 0 000-33.4H63.8z"/><path fill="#a259ff" d="M38.8 30.5A16.7 16.7 0 0163.8 30.5v33.4A16.7 16.7 0 0138.8 30.5z"/></svg>
);

function App() {
  const [activeSection, setActiveSection] = useState('about');

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--card-x', `${x}px`);
    e.currentTarget.style.setProperty('--card-y', `${y}px`);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = document.querySelectorAll('.section-wrapper');
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  const experiences = [
    {
      role: "Web Developer Intern",
      company: "Mgenesis",
      link: "https://www.mgenesis.com/",
      date: "Sep 2025 — Dec 2025",
      desc: "Developed Mgen Central Hub from scratch using Next.js and Tailwind CSS. Integrated APIs with a Django backend using TypeScript for 100% type safety. Built interactive features, including a real-time dashboard and drag-and-drop widget."
    },
    {
      role: "IT Staff Intern",
      company: "HousingInteractive (Polaris)",
      link: "https://housinginteractive.com.ph/",
      date: "Mar 2025 — May 2025",
      desc: "Designed brand-aligned marketing posters to promote residential and commercial properties. Collaborated with sales and marketing to create visuals that supported property listings and inquiries. Scraped real estate platforms for up-to-date data to improve the accuracy of company listings."
    }
  ];

  const projects = [
    {
      title: "SK Next App",
      desc: "The official web portal and management system for the Sangguniang Kabataan of Brgy. Namayan.",
      tags: ["React", "Laravel"],
      link: "https://sknamayan.com/",
      image: "/sk-next-app.png"
    },
    {
      title: "Feast 'n Delight",
      desc: "An authentic Filipino Bilao package ordering website offering fresh and customizable food packages.",
      tags: ["React", "Tailwind CSS", "Vite"],
      link: "https://feastndelightsbilaopackages.netlify.app/",
      image: "/feast-delight.png"
    }
  ];

  const techStack = [
    { name: "Next.js", icon: <NextJsIcon /> },
    { name: "React", icon: <ReactJsIcon /> },
    { name: "Tailwind CSS", icon: <TailwindIcon /> },
    { name: "TypeScript", icon: <TypeScriptIcon /> },
    { name: "Python", icon: <PythonIcon /> },
    { name: "Django", icon: <DjangoIcon /> },
    { name: "PHP", icon: <PhpIcon /> },
    { name: "Laravel", icon: <LaravelIcon /> },
    { name: "HTML", icon: <HtmlIcon /> },
    { name: "CSS", icon: <CssIcon /> },
    { name: "JavaScript", icon: <JavaScriptIcon /> },
    { name: "Figma", icon: <FigmaIcon /> }
  ];

  return (
    <>
      <div className="mouse-spotlight"></div>
      
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-content">
          <div className="nav-logo">
            Jazael <span>Perez</span>
          </div>
          <div className="nav-menu">
            <div 
              className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </div>
            <div 
              className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => scrollToSection('skills')}
            >
              Skills
            </div>
            <div 
              className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </div>
            <div 
              className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </div>
          </div>
        </div>
      </nav>

      <div className="layout-container">
        <main>
          {/* Hero Section */}
          <motion.section className="hero-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
            <h1 className="hero-title">Jazael Perez</h1>
            <h2 className="hero-subtitle">
              <Typewriter
                options={{
                  strings: ['Front-End Developer', 'Web Developer', 'Creative Coder'],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </h2>
            <p className="hero-desc">
              I build high-performance trading systems, ninja-fast bots, and premium web applications. I bridge the gap between algorithmic logic and seamless user experiences.
            </p>
            <a href="/Jazael_Perez_Resume.pdf" download="Jazael_Perez_Resume.pdf" className="hero-btn">
              DOWNLOAD RESUME
            </a>
          </motion.section>

          {/* About Split Section */}
          <motion.section id="about" className="section-wrapper" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
            <h2 className="section-title"><UserIcon /> ABOUT</h2>
            <div className="about-split">
              <div className="about-left">
                <div className="profile-circle">
                  JP
                </div>
                <div className="social-links">
                  <a href="mailto:perezjazaelr@gmail.com" aria-label="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </a>
                  <a href="https://github.com/perezjazaelr-dev" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <GithubIcon />
                  </a>
                  <a href="https://www.linkedin.com/in/jazael-remuel-perez-7b3b4b27a/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
              
              <div className="about-right">
                <p className="about-text">
                  I am a fresh graduate with a <span>Bachelor of Science in Information Technology</span> from <span>Rizal Technological University</span>.
                </p>
                <p className="about-text">
                  As a passionate Front-End Developer, I thrive on turning complex problems into elegant, intuitive interfaces. I specialize in modern web technologies, creating responsive, high-performance applications that users love to interact with.
                </p>
                <p className="about-text">
                  My ultimate goal is to craft pixel-perfect, highly interactive user interfaces and build <span>seamless web experiences</span> that leave a lasting impact.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section id="skills" className="section-wrapper" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
            <h2 className="section-title"><CodeIcon /> SKILLS</h2>
            <div className="tech-marquee-container">
              <div className="tech-marquee-row left">
                {[...techStack.slice(0, Math.ceil(techStack.length / 2)), ...techStack.slice(0, Math.ceil(techStack.length / 2))].map((tech, i) => (
                  <div className="tech-badge" key={`left-${i}`}>
                    {tech.icon}
                    {tech.name}
                  </div>
                ))}
              </div>
              <div className="tech-marquee-row right">
                {[...techStack.slice(Math.ceil(techStack.length / 2)), ...techStack.slice(Math.ceil(techStack.length / 2))].map((tech, i) => (
                  <div className="tech-badge" key={`right-${i}`}>
                    {tech.icon}
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section id="experience" className="section-wrapper" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
            <h2 className="section-title"><BriefcaseIcon /> EXPERIENCE</h2>
            <div className="timeline">
              {experiences.map((exp, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-date">{exp.date}</div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <a href={exp.link} target="_blank" rel="noreferrer" className="timeline-company">
                    {exp.company} <ExternalLinkIcon />
                  </a>
                  <p className="timeline-desc">{exp.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section id="projects" className="section-wrapper" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
            <h2 className="section-title"><TerminalIcon /> PROJECTS</h2>
            <div className="projects-grid">
              {projects.map((proj, i) => (
                <a href={proj.link} target="_blank" rel="noreferrer" className="project-card glow-card" key={i} onMouseMove={handleCardMouseMove}>
                  {proj.image && (
                    <div className="project-image">
                      <img src={proj.image} alt={proj.title} />
                    </div>
                  )}
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.desc}</p>
                  <div className="project-tags">
                    {proj.tags.map((tag, j) => (
                      <span key={j}>{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </motion.section>

        </main>
        
        <footer className="footer">
          <p>© {new Date().getFullYear()} Jazael Perez.</p>
        </footer>
      </div>
      
      <Chatbot />
    </>
  );
}

export default App;
