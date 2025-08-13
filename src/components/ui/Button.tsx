import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonBase = styled(motion.button)<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.base};
  font-family: ${props => props.theme.typography.fontFamily.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => props.size === 'sm' && css`
    padding: ${props.theme.spacing.sm} ${props.theme.spacing.base};
    font-size: ${props.theme.typography.fontSize.sm};
    height: 36px;
  `}

  ${props => props.size === 'base' && css`
    padding: ${props.theme.spacing.base} ${props.theme.spacing.lg};
    font-size: ${props.theme.typography.fontSize.base};
    height: 44px;
  `}

  ${props => props.size === 'lg' && css`
    padding: ${props.theme.spacing.lg} ${props.theme.spacing.xl};
    font-size: ${props.theme.typography.fontSize.lg};
    height: 52px;
  `}

  ${props => props.variant === 'primary' && css`
    background-color: ${props.theme.colors.primary[600]};
    color: white;

    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.primary[700]};
      transform: translateY(-1px);
      box-shadow: ${props.theme.shadows.lg};
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: ${props.theme.shadows.base};
    }
  `}

  ${props => props.variant === 'secondary' && css`
    background-color: ${props.theme.colors.secondary[600]};
    color: white;

    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.secondary[700]};
      transform: translateY(-1px);
      box-shadow: ${props.theme.shadows.lg};
    }
  `}

  ${props => props.variant === 'outline' && css`
    background-color: transparent;
    color: ${props.theme.colors.primary[600]};
    border-color: ${props.theme.colors.primary[600]};

    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.primary[50]};
      transform: translateY(-1px);
    }
  `}

  ${props => props.variant === 'ghost' && css`
    background-color: transparent;
    color: ${props.theme.colors.neutral[700]};

    &:hover:not(:disabled) {
      background-color: ${props.theme.colors.neutral[100]};
      transform: translateY(-1px);
    }
  `}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'base',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  return (
    <ButtonBase
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </ButtonBase>
  );
};