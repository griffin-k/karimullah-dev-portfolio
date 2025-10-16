import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronRight, Brain, Globe, Zap, BarChart3 } from "lucide-react";

const Services = () => {
  const [activeService, setActiveService] = useState(-1);

  useEffect(() => {
    if (activeService !== -1) {
      const timer = setTimeout(() => {
        setActiveService(-1);
      }, 5000); // Closes after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [activeService]);

  const services = [
    {
      id: 0,
      title: "AI & Machine Learning",
      icon: Brain,
      description: "I develop intelligent AI solutions using LLMs, RAGs, and LangChain, crafting smart chatbots, predictive models, and automation systems. My work spans computer vision, data science, and NLP, turning complex data into actionable, human-like intelligence.",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 1,
      title: "Web Development",
      icon: Globe,
      description: "I build full-stack web applications using Django, Flask, and FastAPI, with a focus on performance and scalability. My expertise includes secure API development, robust backend architectures, and optimized database design using SQL and NoSQL technologies to deliver seamless digital experiences.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Automation & Scripting",
      icon: Zap,
      description: "I create automation solutions that save time and boost efficiency — from web scraping and data extraction bots to smart Telegram, Discord, and Slack bots. My Python-based automations handle repetitive tasks seamlessly, turning complex workflows into simple, hands-free operations.",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Data Analytics & Visualization",
      icon: BarChart3,
      description: "I transform raw data into meaningful insights through data cleaning, interactive dashboards, and business intelligence tools. Using platforms like Plotly, Dash, and Streamlit, I deliver clear, data-driven visualizations that support smarter decisions.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="services" className="pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-transparent">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-portfolio-text mb-4">
            My Quality Services
          </h2>
          <p className="text-sm sm:text-base text-portfolio-text-muted max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
            I build intelligent AI systems, scalable web applications, and automated solutions 
            that transform complex challenges into seamless digital experiences.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-0">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card 
                className={`relative overflow-hidden border transition-all duration-500 cursor-pointer glass-container ${
                  activeService === service.id 
                    ? 'bg-gradient-primary border-portfolio-accent shadow-glow' 
                    : 'border-glass-border hover:border-portfolio-accent/50'
                }`}
                onClick={() => setActiveService(activeService === service.id ? -1 : service.id)}
              >
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center justify-between gap-2 sm:gap-0">
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-1 min-w-0">
                      {/* Service Icon */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                        activeService === service.id 
                          ? 'bg-white/20' 
                          : 'bg-portfolio-accent/10'
                      }`}>
                        <service.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          activeService === service.id 
                            ? 'text-white' 
                            : 'text-portfolio-accent'
                        }`} />
                      </div>

                      {/* Service Title */}
                      <h3 className={`text-xs sm:text-sm lg:text-base font-semibold leading-tight ${
                        activeService === service.id 
                          ? 'text-white' 
                          : 'text-portfolio-text'
                      }`}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                      animate={{ 
                        rotate: activeService === service.id ? 90 : 0,
                        scale: activeService === service.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        activeService === service.id 
                          ? 'text-white' 
                          : 'text-portfolio-text-muted'
                      }`} />
                    </motion.div>
                  </div>

                  {/* Service Description - Expandable */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeService === service.id ? "auto" : 0,
                      opacity: activeService === service.id ? 1 : 0,
                      scale: activeService === service.id ? 1 : 0.95,
                      y: activeService === service.id ? 0 : 20
                    }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 sm:pt-6 pl-0 sm:pl-16 lg:pl-18">
                      <p className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
                        activeService === service.id 
                          ? 'text-white/90' 
                          : 'text-portfolio-text-muted'
                      }`}>
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Gradient Overlay for Active State */}
                {activeService === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-primary -z-10"
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;