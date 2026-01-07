export const portfolioData = {
  personal: {
    name: 'Noah Al-Samawi',
    nameAr: 'نوح السماوي',
    title: 'Full-Stack Developer & Security Specialist',
    subtitle: 'Software Developer & IT Systems Engineer',
    location: 'Frankfurt, Germany',
    email: 'noah.al-samawi@gmx.de',
    linkedin: 'https://www.linkedin.com/in/noah-al-samawi-058583197/',
    github: 'https://github.com/Noah-Samawi',
    xing: 'https://www.xing.com/profile/Noah_AlSamawi',
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
      id: 'visste-sphere',
      title: 'VistaSphere',
      description: 'A modern full-stack web application showcasing advanced React patterns and responsive UI design with elegant user experiences.',
      image: '/placeholder.svg',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      liveUrl: 'https://github.com/Noah-Samawi/visste-sphere',
      codeUrl: 'https://github.com/Noah-Samawi/visste-sphere',
      featured: true,
    },
    {
      id: 'pp4-security',
      title: 'Web Application Security',
      description: 'Comprehensive security-focused web application demonstrating OWASP best practices, secure authentication, and vulnerability prevention techniques.',
      image: '/placeholder.svg',
      technologies: ['Django', 'Python', 'Security', 'OWASP', 'PostgreSQL'],
      liveUrl: 'https://github.com/Noah-Samawi/pp4-Web-Application-Security',
      codeUrl: 'https://github.com/Noah-Samawi/pp4-Web-Application-Security',
      featured: true,
      isSecurityProject: true,
    },
    {
      id: 'chain-breaker',
      title: 'Chain Breaker',
      description: 'An innovative web application designed to help users break negative patterns and build positive habits through interactive tracking.',
      image: '/placeholder.svg',
      technologies: ['React', 'JavaScript', 'CSS', 'Node.js'],
      liveUrl: 'https://github.com/Noah-Samawi/chain-breaker1',
      codeUrl: 'https://github.com/Noah-Samawi/chain-breaker1',
      featured: true,
    },
    {
      id: 'techforher',
      title: 'TechForHer',
      description: 'A platform empowering women in technology through resources, community, and mentorship opportunities in the tech industry.',
      image: '/placeholder.svg',
      technologies: ['React', 'TypeScript', 'Django', 'PostgreSQL'],
      liveUrl: 'https://github.com/Noah-Samawi/techforher',
      codeUrl: 'https://github.com/Noah-Samawi/techforher',
      featured: true,
    },
    {
      id: 'how-to-christmas',
      title: 'How To Christmas',
      description: 'A festive web application providing creative holiday planning resources, recipes, and gift ideas for the perfect Christmas celebration.',
      image: '/placeholder.svg',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      liveUrl: 'https://github.com/Noah-Samawi/How-To-Christmas',
      codeUrl: 'https://github.com/Noah-Samawi/How-To-Christmas',
      featured: false,
    },
    {
      id: 'august-hackathon',
      title: 'August Hackathon Team Project',
      description: 'Collaborative hackathon project built with a team, demonstrating agile development practices and team collaboration skills.',
      image: '/placeholder.svg',
      technologies: ['Python', 'Django', 'JavaScript', 'Agile'],
      liveUrl: 'https://github.com/Noah-Samawi/august-hackathon-team1',
      codeUrl: 'https://github.com/Noah-Samawi/august-hackathon-team1',
      featured: false,
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
    - Passionate about Cybersecurity and secure coding practices
    
    Technical Skills:
    - Languages: Python, JavaScript, TypeScript, SQL, HTML/CSS, PowerShell
    - Frameworks: React, Django, Django REST Framework, Tailwind CSS, Bootstrap
    - Systems: Linux, Windows Server, Active Directory, Git, Docker, AWS, Networking
    - Security: OWASP best practices, secure authentication, vulnerability assessment
    
    Education:
    - B.Sc. in Computer Science from Sanaa University
    - Full-Stack Web Development Diploma from Code Institute, Dublin (2024)
    
    Projects:
    - VistaSphere: Modern React application with advanced UI patterns
    - Web Application Security: Security-focused Django project with OWASP practices
    - Chain Breaker: Habit-tracking application for personal development
    - TechForHer: Platform empowering women in technology
    - How To Christmas: Festive planning web application
    - August Hackathon: Team collaboration project
    
    Unique Value:
    - Hybrid expertise bridging IT infrastructure and modern web development
    - Strong understanding of enterprise systems from years of technical support
    - Passion for cybersecurity and secure software development
    - Clean code practices and modern development workflows
    - Multilingual: English, German, and Arabic
    
    Contact:
    - Email: noah.al-samawi@gmx.de
    - LinkedIn: https://www.linkedin.com/in/noah-al-samawi-058583197/
    - GitHub: https://github.com/Noah-Samawi
    - XING: https://www.xing.com/profile/Noah_AlSamawi
    - Location: Frankfurt, Germany
  `,
};
