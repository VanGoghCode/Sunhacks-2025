'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-2xl transition-all duration-300 ease-out
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
    shadow-lg hover:shadow-xl
    backdrop-blur-sm
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-green-600 to-forest-700
      text-green-500 hover:from-green-700 hover:to-forest-800
      shadow-green-500/30 hover:shadow-green-500/50
      border-none
      hover:shadow-lg hover:shadow-green-400/25
    `,
    secondary: `
      bg-gradient-to-r from-green-100 to-leaf-200
      text-white hover:from-green-200 hover:to-leaf-300
      shadow-leaf-500/25 hover:shadow-leaf-500/40
      border-none font-semibold
    `,
    outline: `
      bg-white/30 backdrop-blur-md border-2
      text-green-800 hover:green-200 font-semibold
      border-green-500/70 hover:border-green-600/90
      hover:bg-green-600/90 hover:shadow-lg
      shadow-white/40 hover:shadow-green-500/50
    `,
    ghost: `
      bg-transparent hover:bg-green-100/90
      text-green-700 hover:text-green-800 font-medium
      shadow-sm hover:shadow-md
      border border-transparent hover:border-green-300/70
      hover:bg-green-50/80
    `,
    icon: `
      bg-transparent hover:bg-green-100/80
      text-green-600 hover:text-green-800 font-medium
      shadow-none hover:shadow-sm
      border border-transparent hover:border-green-200/50
      rounded-xl p-2 min-w-0
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};