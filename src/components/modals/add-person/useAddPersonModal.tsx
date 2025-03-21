
import { useEffect, useRef } from 'react';

interface UseAddPersonModalProps {
  isOpen: boolean;
}

export const useAddPersonModal = ({ isOpen }: UseAddPersonModalProps) => {
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  // Focus on first name input when modal opens
  useEffect(() => {
    if (isOpen && firstNameInputRef.current) {
      setTimeout(() => {
        firstNameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Fix for pointer-events issue after modal closes
  useEffect(() => {
    if (!isOpen) {
      // Ensure body has proper pointer events after modal closes
      document.body.style.pointerEvents = 'auto';
    }
  }, [isOpen]);

  return {
    firstNameInputRef
  };
};
