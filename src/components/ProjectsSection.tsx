import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2, Radio, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioData } from '@/data/portfolio';
import SpotlightCard from '@/components/SpotlightCard';
import { Marquee } from '@/components/ui/marquee';
import mustaphaImage from '@/assets/project-mustapha.png';
import nakaaImage from '@/assets/project-nakaa.png';

const projectImages: Record<string, string> = {
  'mustapha-lamjahdi': mustaphaImage,
  'nakaa': nakaaImage,
};

const ProjectCard: React.FC<{ project: typeof portfolioData.projects[0]; index: number }> = ({ project, index }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="w-[340px] md:w-[400px] shrink-0 group"
  >
    <SpotlightCard
      className={`glass-card h-full overflow-hidden flex flex-col relative ${
        project.isSecurityProject ? 'ring-2 ring-primary/30' : ''
      }`}
      spotlightColor={project.isSecurityProject ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'}
    >
      {/* Badges */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        {(project as any).isLive && (
          <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse">
            <Radio className="h-3 w-3" />
            Live
          </span>
        )}
        {project.isSecurityProject && (
          <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
            <Shield className="h-3 w-3" />
            Security
          </span>
        )}
        {project.featured && !(project as any).isLive && !project.isSecurityProject && (
          <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30">
            <Star className="h-3 w-3" />
            Featured
          </span>
        )}
      </div>

      {/* Project Image / Number */}
      <div className="relative h-44 overflow-hidden">
        {projectImages[project.id] ? (
          <img
            src={projectImages[project.id]}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <>
            <div className={`absolute inset-0 ${
              project.isSecurityProject
                ? 'bg-gradient-to-br from-primary/30 to-accent/20'
                : 'bg-gradient-to-br from-primary/20 to-secondary/20'
            }`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <FolderGit2 className="h-12 w-12 text-primary/20 group-hover:text-primary/40 transition-colors" />
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-muted text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          {project.codeUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1 text-xs">
              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5 mr-1.5" />
                GitHub
              </a>
            </Button>
          )}
          <Button variant="neon" size="sm" asChild className="flex-1 text-xs">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              Live Demo
            </a>
          </Button>
        </div>
      </div>
    </SpotlightCard>
  </motion.div>
);

const ProjectsSection: React.FC = () => {
  const { t, direction } = useLanguage();
  const featuredProjects = portfolioData.projects.filter(p => p.featured);
  const otherProjects = portfolioData.projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
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

        {/* Featured Projects Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Marquee speed="slow" pauseOnHover reverse={direction === 'rtl'} className="py-4">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </Marquee>
        </motion.div>

        {/* Other Projects - Reverse */}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Marquee speed="normal" pauseOnHover reverse className="py-4">
                {otherProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </Marquee>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
