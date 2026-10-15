'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  subtitle?: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: (string | DropdownOption)[];
  placeholder?: string;
  className?: string;
  heightClass?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  disabled?: boolean;
}

export default function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = 'Select option',
  className = '',
  heightClass = 'h-[52px]',
  icon,
  subtitle,
  disabled = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize options
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full ${heightClass} px-3.5 py-2 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border transition-all duration-200 text-left flex items-center justify-between gap-2.5 shadow-sm ${
          isOpen
            ? 'dark:border-palegar-gold border-palegar-lightGold ring-1 dark:ring-palegar-gold/50 ring-palegar-lightGold/50'
            : 'dark:border-palegar-gold/30 border-palegar-lightGold/40 hover:dark:border-palegar-gold/60 hover:border-palegar-lightGold/70'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {icon && (
            <span className="dark:text-palegar-gold text-palegar-lightGold shrink-0">
              {icon}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <span className="font-semibold text-xs dark:text-palegar-text text-palegar-lightText block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            {(selectedOption?.subtitle || subtitle) && (
              <span className="text-[10px] dark:text-palegar-muted text-palegar-lightMuted block truncate opacity-85">
                {selectedOption?.subtitle || subtitle}
              </span>
            )}
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 dark:text-palegar-gold text-palegar-lightGold shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Floating Royal Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl dark:bg-[#140E0A] bg-[#FFFDF9] border dark:border-palegar-gold/40 border-palegar-lightGold/50 shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto p-1.5 space-y-1 custom-modal-scroll animate-fadeIn">
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`px-3 py-2 rounded-xl text-xs cursor-pointer flex items-center justify-between gap-2 transition-all ${
                  isSelected
                    ? 'dark:bg-palegar-gold/20 bg-amber-100 font-semibold dark:text-palegar-goldLight text-palegar-lightGold border dark:border-palegar-gold/40 border-palegar-lightGold/40'
                    : 'dark:text-neutral-200 text-neutral-800 hover:dark:bg-palegar-gold/15 hover:bg-amber-50 hover:dark:text-palegar-goldLight'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate">{opt.label}</div>
                  {opt.subtitle && (
                    <div className="text-[10px] opacity-75 dark:text-palegar-muted text-palegar-lightMuted truncate">
                      {opt.subtitle}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 dark:text-palegar-gold text-palegar-lightGold shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
