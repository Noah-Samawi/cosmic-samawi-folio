export const portfolioData = {
  personal: {
    name: 'Noah Al-Samawi',
    nameAr: 'نوح السماوي',
    title: 'Technical Content & Learning Developer',
    subtitle: 'Software Developer & IT Systems Engineer',
    location: 'Frankfurt, Germany',
    email: 'contact@noahalsamawi.dev',
    linkedin: 'https://linkedin.com/in/noahalsamawi',
    github: 'https://github.com/noahalsamawi',
  },
  
  experience: [
    {
      id: 'cbre',
      title: 'IT Support Specialist - 2nd Level',
      company: 'CBRE for DXC/Dell',
      period: '2017 - 2023',
      location: 'Frankfurt, Germany',
      description: 'Provided enterprise-level technical support managing Active Directory, ServiceNow ticketing, and complex Windows environments across global infrastructure.',
      tasks: [
        'Active Directory user & group management',
        'ServiceNow incident resolution & escalation',
        '2nd Level technical support & troubleshooting',
        'Windows Server administration',
        'Network configuration & VPN management',
      ],
      technologies: ['Active Directory', 'ServiceNow', 'Windows Server', 'PowerShell', 'Networking'],
    },
  ],
  
  projects: [
    {
      id: 'project-1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React frontend and Django REST API backend. Features include user authentication, product catalog, shopping cart, and payment integration.',
      image: '/placeholder.svg',
      technologies: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'Stripe'],
      liveUrl: '#',
      codeUrl: '#',
    },
    {
      id: 'project-2',
      title: 'Task Management System',
      description: 'Collaborative project management application with real-time updates, team workspaces, and Kanban boards built with modern web technologies.',
      image: '/placeholder.svg',
      technologies: ['React', 'Django REST', 'Redis', 'WebSockets'],
      liveUrl: '#',
      codeUrl: '#',
    },
    {
      id: 'project-3',
      title: 'Learning Management Portal',
      description: 'Educational platform for course creation and student management with video hosting, progress tracking, and certification system.',
      image: '/placeholder.svg',
      technologies: ['React', 'TypeScript', 'Django', 'AWS S3'],
      liveUrl: '#',
      codeUrl: '#',
    },
  ],
  
  skills: {
    languages: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'PowerShell', level: 75 },
    ],
    frameworks: [
      { name: 'React', level: 85 },
      { name: 'Django', level: 90 },
      { name: 'Django REST', level: 88 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Bootstrap', level: 80 },
      { name: 'Node.js', level: 70 },
    ],
    systems: [
      { name: 'Linux', level: 85 },
      { name: 'Windows Server', level: 90 },
      { name: 'Active Directory', level: 92 },
      { name: 'Git/GitHub', level: 85 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Networking', level: 85 },
      { name: 'ServiceNow', level: 88 },
    ],
  },
  
  education: [
    {
      id: 'bsc',
      degree: 'B.Sc. Computer Science',
      school: 'Sanaa University',
      location: 'Sanaa, Yemen',
      year: '',
      description: 'Foundation in computer science fundamentals, algorithms, data structures, and software engineering principles.',
    },
    {
      id: 'diploma',
      degree: 'Full-Stack Web Development Diploma',
      school: 'Code Institute',
      location: 'Dublin, Ireland',
      year: '2024',
      description: 'Intensive program covering modern full-stack development with Python, Django, JavaScript, React, and agile methodologies.',
    },
  ],
  
  cvContext: `
    Noah Al-Samawi is a Software Developer and IT Systems Engineer based in Frankfurt, Germany.
    
    Professional Experience:
    - 6 years at CBRE working for DXC/Dell (2017-2023) as IT Support Specialist - 2nd Level
    - Expertise in Active Directory, ServiceNow, Windows Server, PowerShell, and enterprise networking
    - Transitioned to full-stack development while maintaining strong IT infrastructure knowledge
    
    Technical Skills:
    - Languages: Python, JavaScript, TypeScript, SQL, HTML/CSS, PowerShell
    - Frameworks: React, Django, Django REST Framework, Tailwind CSS, Bootstrap
    - Systems: Linux, Windows Server, Active Directory, Git, Docker, AWS, Networking
    
    Education:
    - B.Sc. in Computer Science from Sanaa University
    - Full-Stack Web Development Diploma from Code Institute, Dublin (2024)
    
    Projects:
    - Built full-stack applications using React and Django
    - E-commerce platforms, task management systems, and learning portals
    
    Unique Value:
    - Hybrid expertise bridging IT infrastructure and modern web development
    - Strong understanding of enterprise systems from years of technical support
    - Clean code practices and modern development workflows
    - Bilingual: English and Arabic
    
    Contact:
    - Location: Frankfurt, Germany
    - Available for full-stack development and technical roles
  `,
};
