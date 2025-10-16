import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Helper component for star icons, now inline
const StarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);


const SkillsPage = () => {
  // --- STATE MANAGEMENT ---
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  // --- REFS ---
  const containerRef = useRef(null);
  const motionRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const singleSetWidth = useRef(0);

  // --- DATA ---
  const skills = [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" }
  ];

  const frameworks = [
    { name: "LangChain", icon: "data:image/png;base64,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" },
    { name: "OpenAI SDK", icon: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
    { name: "Google AI SDK", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
  ];

  const tools = [
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
    { name: "Copilot", icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" }
  ];
  
  const allSkills = [...skills, ...frameworks, ...tools];
  const activeSkills = 
      activeTab === 'all' ? allSkills :
      activeTab === 'languages' ? skills :
      activeTab === 'frameworks' ? frameworks :
      tools;

  const testimonials = [
      { id: 1, name: "Sarah Johnson", role: "Product Manager", avatar: `https://placehold.co/150x150/E2E8F0/4A5568?text=SJ`, rating: 5, text: "Delivered exceptional AI solutions that increased our conversion rates by 40%. Highly professional." },
      { id: 2, name: "Ahmed Hassan", role: "CEO, Digital Innovations", avatar: `https://placehold.co/150x150/E2E8F0/4A5568?text=AH`, rating: 5, text: "Understood our vision perfectly and created intelligent AI-powered features. Feedback has been amazing." },
      { id: 3, name: "Emily Chen", role: "Marketing Director", avatar: `https://placehold.co/150x150/E2E8F0/4A5568?text=EC`, rating: 4, text: "Built a chatbot that transformed our customer service, leading to a 60% increase in lead generation." },
      { id: 4, name: "Omar Al-Rashid", role: "Founder, FinanceFirst", avatar: `https://placehold.co/150x150/E2E8F0/4A5568?text=OA`, rating: 5, text: "Created powerful predictive models for our financial analytics system. Exceptional work." },
      { id: 5, name: "Lisa Rodriguez", role: "CTO, MedTech Solutions", avatar: `https://placehold.co/150x150/E2E8F0/4A5568?text=LR`, rating: 5, text: "The AI implementation for our healthcare app was outstanding. Balanced complexity with simplicity." }
  ];

  // --- EFFECTS ---
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);
  
  // Calculate width for infinite scroll
  useEffect(() => {
      if (containerRef.current) {
        // Card width (320px) + gap (24px)
        singleSetWidth.current = testimonials.length * (320 + 24);
      }
  }, [testimonials.length]);


  // --- ANIMATION & EVENT HANDLERS ---
  const scrollVariants = {
    animate: {
      x: [currentPosition, currentPosition - singleSetWidth.current],
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" },
      },
    },
  };
  
  const normalizePosition = (position) => {
    if (singleSetWidth.current === 0) return position;
    return position % -singleSetWidth.current;
  };

  const handleInteractionStart = () => {
    setIsHovered(true);
    setAnimationEnabled(false);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };
  
  const handleInteractionEnd = () => {
    setIsHovered(false);
    setIsDragging(false);
    if (motionRef.current) {
      const transform = motionRef.current.style.transform;
      const match = transform.match(/translateX\(([^)]+)\)/);
      if (match) {
        setCurrentPosition(normalizePosition(parseFloat(match[1])));
      }
    }
    resumeTimeoutRef.current = setTimeout(() => setAnimationEnabled(true), 3000);
  };

  return (
    <>
      {/* This style tag injects the CSS for the hexagons into the document head */}
      <style>{`
        .skill-hexagon-wrapper {
          width: 120px;
          height: 140px;
        }
        .skill-hexagon {
          position: relative;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .hexagon-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 115px;
          background-color: rgba(255, 255, 255, 0.15);
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          transition: all 0.3s ease;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0px 4px 16px rgba(255, 255, 255, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        /* Add subtle highlight overlay */
        .hexagon-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          background: linear-gradient(145deg, rgba(255,255,255,0.1), transparent 70%);
          pointer-events: none;
        }
        
        /* Inner texture (frosted glass pattern) */
        .hexagon-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.02) 0,
            rgba(255,255,255,0.02) 1px,
            transparent 1px,
            transparent 2px
          );
          opacity: 0.15;
          pointer-events: none;
        }
        
        /* Purple theme color on hover */
        .skill-hexagon:hover .hexagon-bg {
          background: linear-gradient(135deg, #8b5cf6, #a78bfa);
          border-color: rgba(139, 92, 246, 0.9);
          box-shadow: 0 8px 30px rgba(139, 92, 246, 0.6);
          transform: translate(-50%, -50%) scale(1.05);
        }
        
        .hexagon-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        .hexagon-content img {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
          transition: transform 0.3s ease;
        }
        .skill-hexagon:hover .hexagon-content img {
          transform: scale(1.15);
        }
        
        /* Tooltip styles */
        .skill-tooltip {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%) scale(0.8);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s ease;
          z-index: 20;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .skill-tooltip::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid rgba(0, 0, 0, 0.9);
        }
        
        .skill-hexagon:hover .skill-tooltip {
          opacity: 1;
          transform: translateX(-50%) scale(1);
          bottom: -45px;
        }
        
        /* First row - tooltip on top */
        .skill-hexagon-wrapper:nth-child(-n+8) .skill-tooltip {
          bottom: auto;
          top: -40px;
        }
        
        .skill-hexagon-wrapper:nth-child(-n+8) .skill-tooltip::before {
          top: auto;
          bottom: -4px;
          border-bottom: none;
          border-top: 5px solid rgba(0, 0, 0, 0.9);
        }
        
        .skill-hexagon-wrapper:nth-child(-n+8) .skill-hexagon:hover .skill-tooltip {
          top: -45px;
          bottom: auto;
        }
        
        .shadow-glow {
          box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
        }
        .glass-container {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
        }
        .glass-container:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);
        }
        @media (max-width: 640px) {
          .skill-hexagon-wrapper {
            width: 100px;
            height: 115px;
          }
          .hexagon-bg {
            width: 80px;
            height: 92px;
          }
        }
      `}</style>

      <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 bg-transparent font-sans">
        <div className="container mx-auto max-w-7xl">
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 sm:mb-20"
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                My Technical Skills
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl sm:max-w-2xl mx-auto">
                Technologies and tools I use to build intelligent AI solutions and scalable applications.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 flex-wrap">
              {['all', 'languages', 'frameworks', 'tools'].map(tab => (
                  <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base capitalize ${
                      activeTab === tab
                          ? 'bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] text-white shadow-glow'
                          : 'bg-[rgba(255,255,255,0.05)] text-slate-400 hover:text-white border border-[rgba(255,255,255,0.2)] hover:border-[#8b5cf6]'
                      }`}
                  >
                      {tab}
                  </button>
              ))}
            </div>

            {/* Hexagonal Grid */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-5xl mx-auto">
              {activeSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05, type: "spring", stiffness: 200 }}
                  className="skill-hexagon-wrapper"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="skill-hexagon group"
                  >
                    <div className="hexagon-bg"></div>
                    <div className="hexagon-content">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300"
                      />
                      <div className="skill-tooltip">{skill.name}</div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                My Client's Stories
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl sm:max-w-2xl mx-auto">
                Empowering people in a new digital journey with my super services.
              </p>
            </div>

            <div className="overflow-hidden touch-pan-x" ref={containerRef}>
              <motion.div
                ref={motionRef}
                className="flex gap-6"
                drag="x"
                dragConstraints={{ left: -singleSetWidth.current * 4, right: 0 }}
                dragElastic={0.1}
                dragMomentum={false}
                animate={animationEnabled && !isHovered && !isDragging ? scrollVariants.animate : undefined}
                onMouseEnter={handleInteractionStart}
                onMouseLeave={handleInteractionEnd}
                onTouchStart={handleInteractionStart}
                onTouchEnd={handleInteractionEnd}
                onDragStart={() => {
                  setIsDragging(true);
                  handleInteractionStart();
                }}
                onDragEnd={handleInteractionEnd}
                style={{ width: `${singleSetWidth.current * 5}px`, cursor: isHovered || isDragging ? 'grab' : 'default' }}
                whileTap={{ cursor: 'grabbing' }}
              >
                {[...Array(5)].flatMap((_, i) =>
                  testimonials.map((testimonial) => (
                    <div
                      key={`${i}-${testimonial.id}`}
                      className="glass-container rounded-lg p-6 sm:p-8 h-[350px] sm:h-[400px] flex flex-col w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0"
                    >
                      <div className="flex gap-1 mb-3 sm:mb-4">
                        {[...Array(testimonial.rating)].map((_, starIndex) => (
                          <StarIcon key={starIndex} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-slate-300 leading-relaxed flex-grow text-sm sm:text-base">
                        "{testimonial.text}"
                      </blockquote>
                      <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 mt-auto border-t border-[rgba(255,255,255,0.1)]">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0 bg-slate-300" />
                        <div className="min-w-0">
                          <h4 className="text-white font-semibold truncate text-sm sm:text-base">{testimonial.name}</h4>
                          <p className="text-slate-400 text-xs sm:text-sm truncate">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SkillsPage;

