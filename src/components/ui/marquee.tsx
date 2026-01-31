import React from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  speed = 'normal',
}) => {
  const speedMap = {
    slow: '60s',
    normal: '40s',
    fast: '25s',
  };

  return (
    <div
      className={cn(
        'group flex overflow-hidden [--gap:1rem] [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 items-stretch gap-[--gap] animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]'
        )}
        style={{ animationDuration: speedMap[speed] }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          'flex min-w-full shrink-0 items-stretch gap-[--gap] animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]'
        )}
        style={{ animationDuration: speedMap[speed] }}
      >
        {children}
      </div>
    </div>
  );
};
