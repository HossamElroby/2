import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownTrigger = styled.button<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.base};
  background-color: white;
  border: 1px solid ${props => props.theme.colors.neutral[300]};
  border-radius: ${props => props.theme.borderRadius.base};
  font-family: ${props => props.theme.typography.fontFamily.primary};
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.neutral[700]};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${props => props.theme.colors.primary[400]};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
  }

  ${props => props.isOpen && `
    border-color: ${props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props.theme.colors.primary[100]};
  `}
`;

const DropdownIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.neutral[500]};
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.neutral[200]};
  border-radius: ${props => props.theme.borderRadius.base};
  box-shadow: ${props => props.theme.shadows.lg};
  margin-top: 4px;
  max-height: 300px;
  overflow-y: auto;
`;

const DropdownOption = styled.div<{ isSelected: boolean }>`
  padding: ${props => props.theme.spacing.base};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    background-color: ${props => props.theme.colors.neutral[100]};
  }

  ${props => props.isSelected && `
    background-color: ${props.theme.colors.primary[100]};
    color: ${props.theme.colors.primary[700]};
  `}

  &:first-child {
    border-top-left-radius: ${props => props.theme.borderRadius.base};
    border-top-right-radius: ${props => props.theme.borderRadius.base};
  }

  &:last-child {
    border-bottom-left-radius: ${props => props.theme.borderRadius.base};
    border-bottom-right-radius: ${props => props.theme.borderRadius.base};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.base};
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
  font-family: ${props => props.theme.typography.fontFamily.primary};
  font-size: ${props => props.theme.typography.fontSize.base};

  &:focus {
    outline: none;
    border-bottom-color: ${props => props.theme.colors.primary[500]};
  }
`;

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownTrigger
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>
          {selectedOption ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {selectedOption.icon}
              {selectedOption.label}
            </div>
          ) : (
            placeholder
          )}
        </span>
        <DropdownIcon
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </DropdownIcon>
      </DropdownTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {searchable && (
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            )}
            {filteredOptions.map((option) => (
              <DropdownOption
                key={option.value}
                isSelected={option.value === value}
                onClick={() => handleSelect(option.value)}
              >
                {option.icon}
                {option.label}
              </DropdownOption>
            ))}
          </DropdownMenu>
        )}
      </AnimatePresence>
    </DropdownContainer>
  );
};