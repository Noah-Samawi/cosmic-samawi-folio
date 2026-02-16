import React from 'react';
import { motion } from 'framer-motion';

const statusItems = [
  { icon: '●', label: 'Systems Online', value: '100%', color: 'text-green-400' },
  { icon: '⚡', label: 'Tasks Automated', value: '1,420+', color: 'text-primary' },
  { icon: '📍', label: 'Server Location', value: 'Frankfurt (DE)', color: 'text-primary' },
  { icon: '🔒', label: 'Security Level', value: 'Maximum', color: 'text-green-400' },
];

const SystemStatusTicker: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="w-full bg-background/80 backdrop-blur-sm border-y border-border/30 py-3 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
          <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase hidden md:inline">
            SYS_STATUS &gt;
          </span>
          {statusItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 font-mono text-xs md:text-sm">
              <span className={item.color}>{item.icon}</span>
              <span className="text-muted-foreground">{item.label}:</span>
              <span className="text-foreground font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SystemStatusTicker;
