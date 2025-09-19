import React from 'react';
import { Palette } from 'lucide-react';

interface PaletteIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'purple' | 'gradient' | 'art';
}

export function PaletteIcon({ 
  className = "", 
  size = 'md',
  variant = 'default'
}: PaletteIconProps) {
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const variantClasses = {
    default: 'text-gray-600',
    purple: 'text-purple-600',
    gradient: 'text-purple-500',
    art: 'text-blue-600'
  };

  return (
    <Palette 
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    />
  );
}

// Enhanced version with gradient colors
export function EnhancedPaletteIcon({ 
  className = "", 
  size = 'md' 
}: { className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <Palette 
      className={`${sizeClasses[size]} text-purple-600 ${className}`}
    />
  );
}

// Simple version that matches Lucide style exactly  
export function SimplePaletteIcon({ 
  className = "", 
  size = 'md' 
}: { className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <Palette 
      className={`${sizeClasses[size]} text-purple-600 ${className}`}
    />
  );
}