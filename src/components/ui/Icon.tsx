import React from 'react';
import clsx from 'clsx';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className,
  ...props
}) => {
  return (
    <svg
      className={clsx(sizeClasses[size], 'inline-block', className)}
      {...props}
    >
      <use href={`/sprites/sprite.svg#${name}`} />
    </svg>
  );
};
