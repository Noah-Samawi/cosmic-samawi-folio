import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const CosmicMap: React.FC = () => {
  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-primary/20">
      {/* Dark map background with grid */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Radial glow from Frankfurt position */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        {/* Simplified Germany outline - stylized */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Stylized Germany shape */}
          <path
            d="M180 80 L220 70 L260 90 L280 130 L270 180 L290 220 L280 260 L240 290 L200 310 L160 290 L140 250 L130 200 L140 150 L160 110 Z"
            fill="none"
            stroke="rgba(6, 182, 212, 0.4)"
            strokeWidth="2"
            className="animate-pulse"
          />
          
          {/* Connection lines radiating from Frankfurt */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="200"
              y1="180"
              x2={200 + Math.cos((angle * Math.PI) / 180) * 150}
              y2={180 + Math.sin((angle * Math.PI) / 180) * 150}
              stroke="rgba(6, 182, 212, 0.15)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}
          
          {/* City dots */}
          {[
            { x: 170, y: 120, name: 'Hamburg' },
            { x: 260, y: 130, name: 'Berlin' },
            { x: 150, y: 200, name: 'Cologne' },
            { x: 230, y: 280, name: 'Munich' },
          ].map((city, i) => (
            <circle
              key={i}
              cx={city.x}
              cy={city.y}
              r="4"
              fill="rgba(6, 182, 212, 0.5)"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
          
          {/* Frankfurt marker - center */}
          <circle
            cx="200"
            cy="180"
            r="8"
            fill="rgba(6, 182, 212, 0.3)"
            className="animate-ping"
          />
          <circle
            cx="200"
            cy="180"
            r="6"
            fill="#06b6d4"
          />
        </svg>
      </div>

      {/* Location label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30"
      >
        <MapPin className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">Frankfurt, Germany</span>
      </motion.div>

      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.1) 2px, rgba(6, 182, 212, 0.1) 4px)',
        }}
      />
    </div>
  );
};

export default CosmicMap;
