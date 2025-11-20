import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, Github, Linkedin, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import profileImage from "@/assets/karimullah-dp.jpeg";



const Hero = () => {
  const socialLinks = [
    { icon: FaWhatsapp, href: "https://wa.me/923009410503" },
    { icon: Github, href: "https://github.com/griffin-k" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/karimullah36/" },
    { icon: Instagram, href: "https://www.instagram.com/griffin___3" },
  ];



  return (
    <section
      id="hero"
      className="min-h-[85vh] lg:min-h-[80vh] flex flex-col justify-center pt-56 sm:pt-60 md:pt-64 lg:pt-60 pb-8 lg:pb-12 px-4 sm:px-6 relative z-10 overflow-hidden w-full"
      style={{
        background: `
          radial-gradient(
            ellipse at top,
            #1e1b4b 0%,
            #0f0f23 50%,
            #000000 100%
          ),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='105' viewBox='0 0 80 105'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='death-star' fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M20 10a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm15 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zM20 75a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zm30-65a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm0 65a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zM35 10a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zM5 45a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zm60 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        backgroundSize: "cover, 60px 80px",
        backgroundRepeat: "no-repeat, repeat",
        backgroundAttachment: "fixed, scroll",
      }}
    >
      {/* Comic-style minimal particles */}
      <style>{`
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #a855f7 0%, #8b5cf6 60%, transparent 100%);
          opacity: 0.18;
          pointer-events: none;
          z-index: 1;
          animation: heroParticleFloat 7s ease-in-out infinite;
        }
        @keyframes heroParticleFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.15); }
        }
      `}</style>
      <div className="hero-particle" style={{width:32,height:32,top:'12%',left:'8%'}} />
      <div className="hero-particle" style={{width:18,height:18,top:'22%',left:'70%'}} />
      {/* <div className="hero-particle" style={{width:24,height:24,top:'68%',left:'18%'}} />
      <div className="hero-particle" style={{width:14,height:14,top:'80%',left:'60%'}} /> */}
      {/* --- Hero Main Content --- */}
      <div className="flex-1 container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 text-center lg:text-left order-2 lg:order-1"
          >
            <Badge
              variant="outline"
              className="text-white font-bold px-4 py-1.5 border border-portfolio-accent bg-transparent"
            >
              Hi, I am Karimullah
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-portfolio-accent to-portfolio-text bg-clip-text text-transparent">
                AI Engineer
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-portfolio-text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Exploring the frontier of generative AI — designing intelligent
              systems with LLMs, RAG frameworks, and LangChain that turn raw
              data into meaningful, human-like intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                className="bg-gradient-primary w-full sm:w-auto px-6 py-5"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Handshake className="w-4 h-4 mr-2" /> Let's Connect
              </Button>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-portfolio-card hover:bg-portfolio-accent rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-portfolio-text group-hover:text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden bg-gradient-card border border-border/20"
            >
              <img
                src={profileImage}
                alt="Karimullah - AI Engineer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          
        </div>
        
      </div>

      {/* --- Customer Trust Bar (Centered) --- */}
    
    </section>
  );
};

export default Hero;
