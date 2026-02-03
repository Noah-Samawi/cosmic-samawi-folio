export const portfolioData = {
  personal: {
    name: 'Noah Al-Samawi',
    nameAr: 'نوح السماوي',
    title: 'Full-Stack Developer & Cybersecurity Specialist',
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
      id: 'mustapha-lamjahdi',
      title: 'Mustapha Lamjahdi Campaign',
      description: 'A complete digital campaign platform for an SPD candidate in Frankfurt. Features a custom CMS-like structure, event management, newsletter system, and PWA installability.',
      image: '/src/assets/project-mustapha.png',
      technologies: ['React', 'Tailwind CSS', 'Supabase', 'Resend', 'Framer Motion'],
      liveUrl: 'https://mustapha-lamjahdi.de',
      codeUrl: '',
      featured: true,
      isLive: true,
      highlights: ['Interactive Map', 'Event RSVP', 'Dynamic News Slider'],
    },
    {
      id: 'nakaa',
      title: 'Nakaa - Food Scanner',
      description: 'An AI-powered food scanning app for Halal, Vegan, and Allergy-conscious users. Scans barcodes and ingredient lists (OCR) to give an instant "Traffic Light" verdict.',
      image: '/src/assets/project-nakaa.png',
      technologies: ['React', 'TypeScript', 'Open Food Facts API', 'Tesseract.js', 'PWA'],
      liveUrl: 'https://nakaa-pure-scan.lovable.app',
      codeUrl: '',
      featured: true,
      isLive: true,
      highlights: ['Barcode Scanning', 'AI Ingredient Analysis', 'Multi-language (AR/EN/DE)'],
    },
    {
      id: 'novavault',
      title: 'NovaVault',
      description: 'A secure, military-grade Password Manager built as a Progressive Web App (PWA). Features Row Level Security (RLS), end-to-end encryption logic, and biometric-ready UI.',
      image: '/placeholder.svg',
      technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PWA'],
      liveUrl: 'https://novavault-demo.lovable.app',
      codeUrl: 'https://github.com/Noah-Samawi/novavault',
      featured: true,
      isSecurityProject: true,
    },
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
    security: [
      { name: 'Burp Suite', level: 85 },
      { name: 'Wireshark', level: 80 },
      { name: 'Nmap', level: 82 },
      { name: 'Metasploit', level: 75 },
      { name: 'Nessus/OpenVAS', level: 78 },
      { name: 'Python (OSINT)', level: 85 },
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
    Noah Al-Samawi is a Full-Stack Developer & Cybersecurity Specialist based in Frankfurt, Germany.
    
    Professional Focus:
    - I don't just build apps; I secure them. With a hands-on "breaker" mindset, I identify vulnerabilities before they become threats.
    - Building Home Labs for attack simulation and automating security workflows
    - 6 years enterprise IT at CBRE for DXC/Dell (2017-2023) as IT Support Specialist - 2nd Level
    
    Technical Skills:
    - Languages: Python, JavaScript, TypeScript, SQL, HTML/CSS, PowerShell
    - Frameworks: React, Django, Django REST Framework, Tailwind CSS, Bootstrap
    - Systems: Linux, Windows Server, Active Directory, Git, Docker, AWS, Networking
    - Cybersecurity: Burp Suite, Wireshark, Nmap, Metasploit, Nessus, OpenVAS, Python OSINT, Bash Scripting
    - Defensive: SIEM Basics, IDS/IPS Configuration, OWASP best practices
    
    Education:
    - B.Sc. in Computer Science from Sanaa University
    - Full-Stack Web Development Diploma from Code Institute, Dublin (2024)
    
    Projects:
    - NovaVault: Military-grade Password Manager PWA with RLS, end-to-end encryption, biometric-ready UI
    - Web Application Security: Security-focused Django project with OWASP practices
    - VistaSphere: Modern React application with advanced UI patterns
    - Chain Breaker: Habit-tracking application for personal development
    - TechForHer: Platform empowering women in technology
    
    Unique Value:
    - Hybrid expertise bridging full-stack development with offensive/defensive security
    - Hands-on penetration testing experience with industry-standard tools
    - Strong understanding of enterprise systems from years of technical support
    - Multilingual: English, German, and Arabic
    
    Contact:
    - Email: noah.al-samawi@gmx.de
    - LinkedIn: https://www.linkedin.com/in/noah-al-samawi-058583197/
    - GitHub: https://github.com/Noah-Samawi
    - XING: https://www.xing.com/profile/Noah_AlSamawi
    - Location: Frankfurt, Germany
  `,
};
