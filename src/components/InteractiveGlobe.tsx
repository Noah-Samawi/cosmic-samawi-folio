import React, { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const InteractiveGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in after mount
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Skip on mobile for performance
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Globe parameters
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    const latLines = 12;
    const lonLines = 24;
    const particleCount = 80;

    // Generate sphere points for wireframe
    const generateWireframePoints = (): Point3D[][] => {
      const lines: Point3D[][] = [];
      
      // Latitude lines
      for (let i = 1; i < latLines; i++) {
        const phi = (Math.PI * i) / latLines;
        const line: Point3D[] = [];
        for (let j = 0; j <= lonLines; j++) {
          const theta = (2 * Math.PI * j) / lonLines;
          line.push({
            x: radius * Math.sin(phi) * Math.cos(theta),
            y: radius * Math.cos(phi),
            z: radius * Math.sin(phi) * Math.sin(theta),
          });
        }
        lines.push(line);
      }
      
      // Longitude lines
      for (let j = 0; j < lonLines; j++) {
        const theta = (2 * Math.PI * j) / lonLines;
        const line: Point3D[] = [];
        for (let i = 0; i <= latLines; i++) {
          const phi = (Math.PI * i) / latLines;
          line.push({
            x: radius * Math.sin(phi) * Math.cos(theta),
            y: radius * Math.cos(phi),
            z: radius * Math.sin(phi) * Math.sin(theta),
          });
        }
        lines.push(line);
      }
      
      return lines;
    };

    // Generate floating particles
    const generateParticles = (): Point3D[] => {
      const particles: Point3D[] = [];
      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = 2 * Math.PI * Math.random();
        const r = radius * (0.9 + Math.random() * 0.3);
        particles.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.cos(phi),
          z: r * Math.sin(phi) * Math.sin(theta),
        });
      }
      return particles;
    };

    const wireframe = generateWireframePoints();
    const particles = generateParticles();

    // Rotation function
    const rotatePoint = (point: Point3D, rotX: number, rotY: number): Point3D => {
      // Rotate around Y axis
      let x = point.x * Math.cos(rotY) - point.z * Math.sin(rotY);
      let z = point.x * Math.sin(rotY) + point.z * Math.cos(rotY);
      let y = point.y;

      // Rotate around X axis
      const newY = y * Math.cos(rotX) - z * Math.sin(rotX);
      const newZ = y * Math.sin(rotX) + z * Math.cos(rotX);

      return { x, y: newY, z: newZ };
    };

    // Project 3D to 2D with perspective
    const project = (point: Point3D, centerX: number, centerY: number): { x: number; y: number; scale: number } => {
      const perspective = 600;
      const scale = perspective / (perspective + point.z);
      return {
        x: centerX + point.x * scale,
        y: centerY + point.y * scale,
        scale,
      };
    };

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Auto rotation + mouse influence
      const baseSpeed = 0.002;
      const mouseInfluence = 0.00015;
      
      rotationRef.current.y += baseSpeed + mouseRef.current.x * mouseInfluence;
      rotationRef.current.x += mouseRef.current.y * mouseInfluence * 0.5;
      
      // Clamp X rotation
      rotationRef.current.x = Math.max(-0.5, Math.min(0.5, rotationRef.current.x));

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      // Draw wireframe lines
      wireframe.forEach((line) => {
        ctx.beginPath();
        let started = false;
        
        line.forEach((point) => {
          const rotated = rotatePoint(point, rotX, rotY);
          const projected = project(rotated, centerX, centerY);
          
          // Fade based on depth
          const alpha = 0.15 + (projected.scale - 0.5) * 0.3;
          
          if (!started) {
            ctx.moveTo(projected.x, projected.y);
            started = true;
          } else {
            ctx.lineTo(projected.x, projected.y);
          }
        });
        
        // Gradient stroke - electric blue / neon cyan
        const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.2)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.15)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw particles with glow
      particles.forEach((point, index) => {
        const rotated = rotatePoint(point, rotX, rotY);
        const projected = project(rotated, centerX, centerY);
        
        // Only draw visible particles (in front)
        if (projected.scale > 0.7) {
          const alpha = (projected.scale - 0.7) * 1.5;
          const size = 1.5 + projected.scale * 1.5;
          
          // Pulsing effect
          const pulse = Math.sin(Date.now() * 0.003 + index) * 0.3 + 0.7;
          
          // Glow
          const glowGradient = ctx.createRadialGradient(
            projected.x, projected.y, 0,
            projected.x, projected.y, size * 4
          );
          glowGradient.addColorStop(0, `rgba(56, 189, 248, ${alpha * pulse * 0.8})`);
          glowGradient.addColorStop(0.5, `rgba(6, 182, 212, ${alpha * pulse * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
          
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, size * 4, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
          
          // Core
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * pulse})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseRef.current = {
        x: (e.clientX - centerX) / rect.width,
        y: (e.clientY - centerY) / rect.height,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
      style={{ 
        opacity: isVisible ? 1 : 0,
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
};

export default InteractiveGlobe;
