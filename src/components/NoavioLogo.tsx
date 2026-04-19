import React from 'react';

interface NoavioLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const NoavioLogo: React.FC<NoavioLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const hexSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Hexagon with N */}
      <svg
        width={hexSize}
        height={hexSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M20 2L34.6 10.5V27.5L20 36L5.4 27.5V10.5L20 2Z"
          stroke="hsl(187, 95%, 53%)"
          strokeWidth="2"
          fill="hsl(187, 95%, 53% / 0.06)"
        />
        <text
          x="20"
          y="26"
          textAnchor="middle"
          fontSize="18"
          fontWeight="800"
          fill="hsl(210, 40%, 98%)"
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="-0.5"
        >
          N
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-foreground font-semibold text-lg tracking-tight">
            Noavio
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-cyan-400 font-medium mt-0.5">
            IT Solutions
          </span>
        </div>
      )}
    </div>
  );
};

export default NoavioLogo;
