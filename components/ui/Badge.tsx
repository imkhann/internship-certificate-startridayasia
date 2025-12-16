import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary' | 'info' | 'secondary';
  className?: string;
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-700',
    neutral: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary-100 text-primary-700',
    info: 'bg-blue-100 text-blue-700',
    secondary: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
