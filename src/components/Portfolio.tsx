import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";



import NemoMockupImage from "@/assets/nemo_mockup.png";



import alalimMockupImage from "@/assets/alalim_mockup.png";
import alalimImage1 from "@/assets/alalim1.png";
import alalimImage2 from "@/assets/alalim2.png";
import alalimImage3 from "@/assets/alalim3.png";


import glsmMockupImage from "@/assets/glsm_mockup.png";


import primepassMockupImage from "@/assets/primepass_mockup.png";


import gorbitMockupImage from "@/assets/gorbit_mockup.png";



import gearsMockupImage from "@/assets/gears_mockup.png";






const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "NEMO – Autonomous AI-Powered Personal Assistant Robot.",
      category: "AI/IOT",
      description: `Built an autonomous AI assistant powered by LLMs (LLaMA 3, Mistral, Gemini) with real-time interaction, RAG-based memory, and multimodal capabilities. Integrated vision, translation, scheduling, and navigation features, optimized for edge deployment on Raspberry Pi 5 using Python (FastAPI/Flask).`,
      images: [NemoMockupImage], // Add more images when available
      tags: [
        "Python", "FastAPI", "Flask", "LLMs", "LLaMA 3", "Mistral", "Gemini", "LangChain", "RAG", "Vector DB", "Computer Vision", "Object Detection", "Face Recognition", "Edge AI", "Raspberry Pi 5", "Sensors", "Multimodal"
      ],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 2,
      title: "Al-Alim – AI Chatbot for Islamic Literature References",
      category: "Web Page",
      description: `Developed an intelligent NLP-powered chatbot using LLMs to deliver authenticated Quran and Hadith references. Built a context-aware query system with vector databases for semantic search and accurate citation retrieval. Implemented using LangChain for smooth model–database coordination, and designed a web interface for scholars, students, and general users to access verified Islamic texts efficiently.`,
      images: [alalimMockupImage,alalimImage1, alalimImage2, alalimImage3],
      tags: ["Dashboard Design", "Information Architecture", "RAG","Vector Database", "Usability Testing"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 3,
      title: "AI-Integrated Library Management System For Lahore Garrison University.",
      category: "Web Application",
      description: `Developed an AI-enhanced library management system using Django and Tailwind CSS. Built core modules for book and user management, borrowing workflows, fines, and role-based access control. Integrated an LLM for intelligent ISBN-based metadata extraction to improve catalog accuracy. Added real-time search, shelf tracking, tag generation, and Excel export features, resulting in a secure, scalable solution that improved library efficiency and user experience.`,
      images: [glsmMockupImage],
      tags: ["LLMS", "Tailwind", "Prototyping", "Interface Design"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 4,
      title: "Virtual Admission Assistant – RAG-Based AI System for Lahore Garrison University.",
      category: "Web Application",
      description: `Developed an AI-powered assistant to streamline the university admission process using Retrieval-Augmented Generation (RAG) with LangChain and vector embeddings. Built a web dashboard for document uploads, semantic embedding generation, and intelligent query handling. Enabled context-aware, LLM-driven support for admission criteria, deadlines, required documents, and campus policies—enhancing student experience with fast, accurate, and personalized guidance.`,
      images: [gorbitMockupImage],
      tags: ["RAG", "LLM", "GEMINI", "Responsive Design"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 5,
      title: "PRIMEPASS",
      category: "Web Application / Chrome Extension",
      description: "PrimePass is a secure Chrome extension that allows users to access premium digital services like Netflix, ChatGPT Plus, Udemy, Canva Pro, and Coursera at up to 95% lower cost. Designed to make top-tier tools affordable and accessible, PrimePass simplifies subscriptions by bringing multiple premium platforms under one dashboard. With seamless integration, verified access, and transparent pricing, PrimePass empowers users to save thousands while enjoying the best digital experiences without compromise.",
      images: [primepassMockupImage], 
      tags: ["React", "Javascript", "SQL"],
      demoLink: "https://primepass.app/",
      codeLink: "#"
    },
    {
      id: 6,
      title: "GEARS",
      category: "Web Application",
      description: "Developed the official website for GEARS at Lahore Garrison University, providing a platform to showcase projects, events, and initiatives. The site enables students to access resources, stay updated, and engage with the society’s activities in robotics, AI, and engineering.",
      images: [gearsMockupImage], 
      tags: ["React"],
      demoLink: "https://gears.lgu.edu.pk/",
      codeLink: "#"
    }
  ];

  const openModal = (projectId: number) => {
    setSelectedProject(projectId);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const project = projects.find(p => p.id === selectedProject);
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    const project = projects.find(p => p.id === selectedProject);
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <section id="portfolio" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-transparent">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-portfolio-text mb-4">
            My Recent Works
          </h2>
          <p className="text-sm sm:text-base text-portfolio-text-muted max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
            Here are some of my recent projects that showcase my skills in AI/Web
          </p>
        </motion.div>

        {/* Portfolio Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px", amount: 0.3 }}
              className="portfolio-card-wrapper group cursor-pointer will-change-transform"
              onClick={() => openModal(project.id)}
            >
              <Card className="relative overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-300 aspect-video will-change-transform">
                {/* Project Image */}
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl will-change-transform"
                  loading="lazy"
                />
                
                {/* Blurred Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                  <Button 
                    size="lg"
                    className="bg-portfolio-accent hover:bg-portfolio-accent-hover text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal/Popup */}
      <AnimatePresence>
        {selectedProject && selectedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl my-auto bg-portfolio-card rounded-xl sm:rounded-2xl border border-portfolio-accent/30 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxHeight: '95vh',
                overflowY: 'auto'
              }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-portfolio-bg/80 hover:bg-portfolio-accent rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>

              {/* Image Gallery */}
              <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-black/50">
                <img
                  src={selectedProjectData.images[currentImageIndex]}
                  alt={`${selectedProjectData.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                
                {/* Image Navigation */}
                {selectedProjectData.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-portfolio-bg/80 hover:bg-portfolio-accent rounded-full flex items-center justify-center transition-colors duration-300"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-portfolio-bg/80 hover:bg-portfolio-accent rounded-full flex items-center justify-center transition-colors duration-300"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProjectData.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === currentImageIndex 
                              ? 'bg-portfolio-accent w-8' 
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Project Details */}
              <div className="p-3 sm:p-4 md:p-6">
                {/* Category Badge */}
                <Badge variant="secondary" className="mb-2 sm:mb-3 text-xs sm:text-sm">
                  {selectedProjectData.category}
                </Badge>

                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-portfolio-text mb-3 sm:mb-4">
                  {selectedProjectData.title}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-portfolio-text-muted leading-relaxed mb-4 sm:mb-6">
                  {selectedProjectData.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-portfolio-text mb-2 sm:mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProjectData.tags.map((tag, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 border-portfolio-accent/30 text-portfolio-text"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  <Button 
                    size="lg"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-sm sm:text-base py-5 sm:py-6"
                    onClick={() => window.open(selectedProjectData.demoLink, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="w-full border-portfolio-accent text-portfolio-accent hover:bg-portfolio-accent hover:text-white text-sm sm:text-base py-5 sm:py-6"
                    onClick={() => window.open(selectedProjectData.codeLink, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;