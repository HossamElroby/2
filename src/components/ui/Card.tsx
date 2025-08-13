import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'base' | 'lg';
  shadow?: 'none' | 'sm' | 'base' | 'lg';
}

const CardContainer = styled(motion.div)<CardProps>`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  transition: all 0.2s ease-in-out;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};

  ${props => {
    switch (props.padding) {
      case 'none': return 'padding: 0;';
      case 'sm': return `padding: ${props.theme.spacing.sm};`;
      case 'base': return `padding: ${props.theme.spacing.base};`;
      case 'lg': return `padding: ${props.theme.spacing.lg};`;
      default: return `padding: ${props.theme.spacing.base};`;
    }
  }}

  ${props => {
    switch (props.shadow) {
      case 'none': return 'box-shadow: none;';
      case 'sm': return `box-shadow: ${props.theme.shadows.sm};`;
      case 'base': return `box-shadow: ${props.theme.shadows.base};`;
      case 'lg': return `box-shadow: ${props.theme.shadows.lg};`;
      default: return `box-shadow: ${props.theme.shadows.base};`;
    }
  }}

  &:hover {
    ${props => props.onClick && `
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.lg};
      border-color: ${props.theme.colors.primary[300]};
    `}
  }
`;

export const Card: React.FC<CardProps> = ({ 
  children, 
  onClick, 
  padding = 'base',
  shadow = 'base',
  ...props 
}) => {
  return (
    <CardContainer
      padding={padding}
      shadow={shadow}
      onClick={onClick}
      whileHover={onClick ? { y: -2 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </CardContainer>
  );
};