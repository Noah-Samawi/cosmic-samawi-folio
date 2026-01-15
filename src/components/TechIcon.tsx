import React from 'react';
import { 
  Code2, 
  Database, 
  Server, 
  Shield, 
  Globe, 
  FileCode, 
  Box,
  Layers,
  Palette,
  Zap
} from 'lucide-react';

// Map technologies to their icon components and colors
const techIconMap: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
  // Languages
  'react': { icon: Code2, color: 'text-cyan-400', bgColor: 'bg-cyan-400/10' },
  'typescript': { icon: FileCode, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  'javascript': { icon: Zap, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
  'python': { icon: Code2, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  'html': { icon: Globe, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  'css': { icon: Palette, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
  'html/css': { icon: Globe, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  
  // Frameworks
  'django': { icon: Layers, color: 'text-green-600', bgColor: 'bg-green-600/10' },
  'node.js': { icon: Server, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  'tailwind css': { icon: Palette, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
  'vite': { icon: Zap, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  'bootstrap': { icon: Palette, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
  
  // Databases
  'postgresql': { icon: Database, color: 'text-blue-600', bgColor: 'bg-blue-600/10' },
  'sql': { icon: Database, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
  
  // Security
  'security': { icon: Shield, color: 'text-red-500', bgColor: 'bg-red-500/10' },
  'owasp': { icon: Shield, color: 'text-red-400', bgColor: 'bg-red-400/10' },
  
  // DevOps
  'docker': { icon: Box, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  
  // Default
  'default': { icon: Code2, color: 'text-muted-foreground', bgColor: 'bg-muted' },
};

interface TechIconProps {
  tech: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const TechIcon: React.FC<TechIconProps> = ({ tech, showLabel = true, size = 'sm' }) => {
  const techKey = tech.toLowerCase();
  const { icon: IconComponent, color, bgColor } = techIconMap[techKey] || techIconMap['default'];
  
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const containerSize = size === 'sm' ? 'p-1.5' : 'p-2';
  
  return (
    <div 
      className={`flex items-center gap-1.5 ${containerSize} rounded-lg ${bgColor} transition-all duration-200 hover:scale-105`}
      title={tech}
    >
      <IconComponent className={`${iconSize} ${color}`} />
      {showLabel && (
        <span className={`text-xs font-medium ${color}`}>
          {tech}
        </span>
      )}
    </div>
  );
};

export default TechIcon;
