
import { useState, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";

export interface AddPersonState {
  firstName: string;
  lastName: string;
  personalNumber: string;
  gender: string;
  classGroup: string;
}

export interface UseAddPersonProps {
  onPersonAdded: (fullName: string) => void;
}

export const useAddPerson = ({ onPersonAdded }: UseAddPersonProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personalNumber, setPersonalNumber] = useState('');
  const [gender, setGender] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genderOptions = [
    { value: "flicka", label: "Flicka" },
    { value: "pojke", label: "Pojke" },
    { value: "annat", label: "Annat" },
    { value: "vill_ej_ange", label: "Vill ej ange" }
  ];

  const classOptions = [
    { value: "1A", label: "1A" }, { value: "1B", label: "1B" },
    { value: "2A", label: "2A" }, { value: "2B", label: "2B" },
    { value: "3A", label: "3A" }, { value: "3B", label: "3B" },
    { value: "4A", label: "4A" }, { value: "4B", label: "4B" },
    { value: "5A", label: "5A" }, { value: "5B", label: "5B" },
    { value: "6A", label: "6A" }, { value: "6B", label: "6B" },
    { value: "7A", label: "7A" }, { value: "7B", label: "7B" },
    { value: "8A", label: "8A" }, { value: "8B", label: "8B" },
    { value: "9A", label: "9A" }, { value: "9B", label: "9B" }
  ];

  const resetForm = useCallback(() => {
    setFirstName('');
    setLastName('');
    setPersonalNumber('');
    setGender('');
    setClassGroup('');
  }, []);

  const handleAddPerson = useCallback(() => {
    if (isSubmitting) return;
    
    if (firstName.trim() && lastName.trim()) {
      setIsSubmitting(true);
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      
      // Call the callback with the new person's name
      onPersonAdded(fullName);
      
      // Show confirmation toast
      toast({
        title: "Person tillagd",
        description: `${fullName} har lagts till i listan.`
      });
      
      // Reset form
      resetForm();
      
      // Reset submitting state after a delay
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  }, [firstName, lastName, isSubmitting, onPersonAdded, resetForm]);

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    personalNumber,
    setPersonalNumber,
    gender,
    setGender,
    classGroup,
    setClassGroup,
    genderOptions,
    classOptions,
    isSubmitting,
    handleAddPerson,
    resetForm
  };
};
