# Noah Al-Samawi | Developer Portfolio 🚀

> A modern, performance-optimized personal portfolio showcasing full-stack development expertise with cutting-edge web technologies.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.90.1-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.26-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

## 🚀 Key Features

- **⚡ Lightning-Fast Performance**: Built on Vite with optimized bundle splitting and lazy loading for sub-second page loads
- **🎨 Interactive UI Components**: Custom-built Bento Grid layout, magnetic 3D card effects, and smooth scroll animations using Framer Motion
- **🖥️ Terminal-Style About Section**: Unique macOS-inspired terminal component with realistic typing animations and cursor effects
- **🔐 Full-Stack Authentication**: Complete authentication system with protected routes, user profiles, and session management via Supabase
- **📱 Fully Responsive Design**: Mobile-first approach with adaptive layouts across all screen sizes and devices
- **🌐 Internationalization Ready**: Multi-language support architecture with RTL/LTR text direction handling
- **♿ Accessibility First**: WCAG 2.1 compliant with semantic HTML, ARIA labels, and keyboard navigation support

---

## 🛠️ Technical Architecture & Stack

### **Frontend**
- **React 18.3.1** – Component-based architecture with hooks and context for state management
- **TypeScript 5.8.3** – Type-safe development with strict mode enabled
- **Vite 5.4.19** – Next-generation build tool for blazing-fast HMR and optimized production builds
- **Tailwind CSS 3.4.17** – Utility-first CSS framework with custom design system tokens
- **Framer Motion 12.23.26** – Production-ready motion library for fluid animations

### **Backend & BaaS**
- **Supabase 2.90.1** – Open-source Firebase alternative providing:
  - PostgreSQL database with Row-Level Security (RLS)
  - Authentication with JWT tokens
  - Real-time subscriptions
  - Edge Functions for serverless logic

### **UI Components & Design System**
- **shadcn/ui** – Radix UI primitives styled with Tailwind CSS
- **Lucide React** – Beautiful, consistent icon system
- **React Hook Form + Zod** – Type-safe form validation with schema validation

### **Routing & Navigation**
- **React Router DOM 6.30.1** – Client-side routing with protected routes and dynamic navigation

### **Why This Stack?**
This architecture was chosen for **scalability**, **developer experience**, and **production-grade performance**. The combination of Vite + React + TypeScript ensures type safety and fast development cycles, while Supabase provides enterprise-level backend capabilities without infrastructure overhead.

---

## ⚙️ Getting Started

### **Prerequisites**
- Node.js 18+ and npm (or Bun runtime)
- Git

### **Local Development**

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### **Build for Production**

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── HeroSection.tsx
│   ├── TerminalAbout.tsx
│   ├── BentoSkillsGrid.tsx
│   ├── ContactSection.tsx
│   └── ...
├── pages/              # Route-level components
│   ├── Index.tsx
│   ├── Dashboard.tsx
│   └── Login.tsx
├── contexts/           # React Context providers
│   ├── ThemeContext.tsx
│   └── LanguageContext.tsx
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/       # Supabase client & types
├── lib/                # Utility functions
└── index.css           # Global styles & design tokens
```

---

## 🎯 Performance Optimizations

- **Code Splitting**: Route-based lazy loading with React.lazy()
- **Image Optimization**: Progressive image loading with blur placeholders
- **Animation Performance**: GPU-accelerated transforms with Framer Motion
- **Bundle Size**: Tree-shaking and dependency deduplication
- **Caching Strategy**: Service Worker implementation for offline support

---

## 🔐 Security Features

- **Row-Level Security (RLS)**: Database-level access control policies
- **JWT Authentication**: Secure token-based session management
- **CSRF Protection**: Built-in protection against cross-site request forgery
- **Input Validation**: Schema-based validation with Zod
- **Secure Headers**: CSP and security headers configured

---

## 👨‍💻 Author

**Noah Al-Samawi**  
Computer Engineer & Full-Stack Developer  
📍 Frankfurt, Germany 🇩🇪

🌐 [Portfolio](https://www.noahsamawi.de) | 💼 [LinkedIn](https://linkedin.com/in/noah-al-samawi) | 📧 [Contact](mailto:noah@example.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ using modern web technologies</sub>
</div>
