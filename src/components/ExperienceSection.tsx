import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard';

const experienceData = [
  {
    id: 'cbre',
    title: 'IT Support Specialist – 2nd Level',
    company: 'CBRE for DXC / Dell Technologies',
    period: '2017 – 2023',
    location: 'Frankfurt, Germany',
    description:
      'Provided enterprise-level technical support across global infrastructure. Managed Active Directory environments, resolved complex incidents via ServiceNow, and administered Windows Server systems at scale.',
    tasks: [
      'Active Directory user & group management across multi-domain environments',
      'ServiceNow incident resolution, escalation & SLA tracking',
      '2nd Level troubleshooting for hardware, software & network issues',
      'Windows Server administration & Group Policy management',
      'VPN configuration, network diagnostics & security compliance',
    ],
    technologies: ['Active Directory', 'ServiceNow', 'Windows Server', 'PowerShell', 'Networking', 'ITIL'],
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">Professional journey & milestones</p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative mb-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-8 z-10">
                <div className="w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/50">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                </div>
              </div>

              {/* Content Card */}
              <div className={`pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'}`}>
                <SpotlightCard
                  className="glass-card p-6 md:p-8"
                  spotlightColor="rgba(59, 130, 246, 0.15)"
                >
                  <motion.div whileHover={{ scale: 1.01, y: -3 }} transition={{ duration: 0.3 }} className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Tasks */}
                    <ul className="space-y-2 mb-6">
                      {exp.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </SpotlightCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
