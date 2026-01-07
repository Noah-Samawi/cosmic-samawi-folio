import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioData } from '@/data/portfolio';

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    },
  };

  // Separate featured and other projects
  const featuredProjects = portfolioData.projects.filter(p => p.featured);
  const otherProjects = portfolioData.projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('projects.subtitle')}</p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className={`glass-card h-full overflow-hidden flex flex-col relative ${
                  project.isSecurityProject ? 'ring-2 ring-primary/30' : ''
                }`}
              >
                {/* Featured/Security Badge */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  {project.isSecurityProject && (
                    <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                      <Shield className="h-3 w-3" />
                      Security
                    </span>
                  )}
                  {project.featured && (
                    <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Project Image/Number */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 ${
                    project.isSecurityProject 
                      ? 'bg-gradient-to-br from-primary/30 to-accent/20' 
                      : 'bg-gradient-to-br from-primary/20 to-secondary/20'
                  }`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-display font-bold text-primary/15 group-hover:text-primary/25 transition-colors">
                      0{index + 1}
                    </span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center gap-4"
                  >
                    <Button variant="neon" size="sm" asChild className="font-medium">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Project
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                          tech.toLowerCase() === 'security' || tech.toLowerCase() === 'owasp'
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl font-display font-semibold text-center mb-8 text-muted-foreground"
            >
              More Projects
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card h-full overflow-hidden flex flex-col"
                  >
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Github className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                        </a>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
