import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";


import logo from "/favicon.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [prevActiveSection, setPrevActiveSection] = useState("home");


  
  const navItems = [
    { label: "Home", href: "#hero", section: "home" },
    { label: "Services", href: "#services", section: "services" },
    { label: "Portfolio", href: "#portfolio", section: "portfolio" },
    { label: "About", href: "#experience", section: "experience" },
    { label: "Testimonials", href: "#skills", section: "skills" },
    { label: "Contact", href: "#contact", section: "contact" }
  ];

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", section: "home" },
        { id: "services", section: "services" },
        { id: "portfolio", section: "portfolio" },
        { id: "experience", section: "experience" },
        { id: "skills", section: "skills" },
        { id: "contact", section: "contact" }
      ];

      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          if (activeSection !== sections[i].section) {
            setPrevActiveSection(activeSection);
            setActiveSection(sections[i].section);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-glass-nav border-none"
    >
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center space-x-2 flex-shrink-0"
          >

<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center">
  <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
</div>




          </motion.div>

          {/* Navigation */}
          <nav className="hidden xl:flex items-center justify-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                className={`relative transition-colors duration-300 ${
                  activeSection === item.section
                    ? "text-portfolio-accent"
                    : "text-portfolio-text-muted hover:text-portfolio-accent"
                }`}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-portfolio-accent to-purple-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: activeSection === item.section ? "100%" : 0
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1],
                    delay: activeSection === item.section ? 0 : 0
                  }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="hidden xl:block flex-shrink-0"
          >
            <Button 
              size="sm"
              className="bg-gradient-primary transition-all duration-300 text-sm sm:text-base px-3 sm:px-4 py-2"
              onClick={() => {
                // Create a temporary link to download the CV
                const link = document.createElement('a');
                link.href = '/Karimullah_Resume.pdf';
                link.download = 'Karimullah_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
              <Download className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            </Button>
          </motion.div>

          {/* Mobile/Tablet Hamburger Menu */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={toggleMenu}
            className="xl:hidden p-2 text-portfolio-text hover:text-portfolio-accent transition-colors z-50 relative"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed z-[100]"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                overflowY: 'auto'
              }}
              onClick={closeMenu}
            >
              {/* Centered Card Menu */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full bg-portfolio-card/95 backdrop-blur-xl border-2 border-portfolio-accent/30 rounded-3xl shadow-2xl my-auto"
                style={{
                  maxWidth: '400px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(139, 92, 246, 0.2),
                    0 0 60px rgba(139, 92, 246, 0.15)
                  `
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={closeMenu}
                  className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-portfolio-accent/20 hover:bg-portfolio-accent transition-all duration-300 backdrop-blur-sm border border-portfolio-accent/30 z-10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-6 mt-8">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl" style={{ fontFamily: 'Ballet, cursive' }}>K</span>
                  </div>
                  <span className="text-portfolio-text font-semibold text-xl">Karimullah</span>
                </div>

                <div className="flex flex-col">
                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-1 mb-6">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index + 0.1 }}
                        onClick={closeMenu}
                        className={`relative text-base font-medium py-2.5 px-4 rounded-lg transition-all duration-300 ${
                          activeSection === item.section
                            ? "text-white bg-portfolio-accent"
                            : "text-portfolio-text hover:text-portfolio-accent hover:bg-portfolio-accent/10"
                        }`}
                      >
                        <span className="relative inline-block">
                          {item.label}
                        </span>
                      </motion.a>
                    ))}
                  </nav>
                    
                  {/* Mobile CV Download Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button 
                      size="lg"
                      className="w-full bg-gradient-primary transition-all duration-300 text-base py-5"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/Karimullah_Resume.pdf';
                        link.download = 'Karimullah_Resume.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        closeMenu();
                      }}
                    >
                      Download CV
                    </Button>
                  </motion.div>
                </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social Proof Bar / Trust Indicator */}
 
    </motion.header>
  );
};

export default Header;