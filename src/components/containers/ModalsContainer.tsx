
import { useCallback, useState } from 'react';
import GuardianContactModal from '@/components/modals/GuardianContactModal';
import AddPersonModal from '@/components/modals/AddPersonModal';
import { useAddPerson } from '@/hooks/useAddPerson';

interface ModalsContainerProps {
  people: string[];
  childrenNames: string[];
  setChildrenNames: (names: string[]) => void;
  onPersonAdded: (name: string) => void;
  onSubmitForm: () => void;
  isAddPersonDialogOpen?: boolean;
  setIsAddPersonDialogOpen?: (open: boolean) => void;
  isGuardianDialogOpen?: boolean;
  setIsGuardianDialogOpen?: (open: boolean) => void;
}

export const ModalsContainer = ({
  people,
  childrenNames,
  setChildrenNames,
  onPersonAdded,
  onSubmitForm,
  isAddPersonDialogOpen,
  setIsAddPersonDialogOpen,
  isGuardianDialogOpen,
  setIsGuardianDialogOpen
}: ModalsContainerProps) => {
  // Use either the prop state or local state for dialogs
  const [localAddPersonDialogOpen, setLocalAddPersonDialogOpen] = useState(false);
  const [localGuardianDialogOpen, setLocalGuardianDialogOpen] = useState(false);
  
  const addPersonDialogOpen = isAddPersonDialogOpen !== undefined ? isAddPersonDialogOpen : localAddPersonDialogOpen;
  const setAddPersonDialogOpen = setIsAddPersonDialogOpen || setLocalAddPersonDialogOpen;
  
  const guardianDialogOpen = isGuardianDialogOpen !== undefined ? isGuardianDialogOpen : localGuardianDialogOpen;
  const setGuardianDialogOpen = setIsGuardianDialogOpen || setLocalGuardianDialogOpen;

  const {
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
    handleAddPerson: addPersonHandler,
    resetForm
  } = useAddPerson({ 
    onPersonAdded: (name) => {
      console.log("Person added in ModalsContainer:", name);
      
      // First check if the name already exists to avoid duplicates
      if (!childrenNames.includes(name)) {
        setChildrenNames([...childrenNames, name]);
      }
      
      // Call the parent callback to update any active incident
      onPersonAdded(name);
      
      // Close the dialog
      setAddPersonDialogOpen(false);
    }
  });

  const handleSubmitForm = useCallback(() => {
    console.log("Submit form called in ModalsContainer");
    onSubmitForm();
    setGuardianDialogOpen(false);
  }, [onSubmitForm, setGuardianDialogOpen]);
  
  // Wrapper for handleAddPerson to ensure it's a stable function
  const handleAddPerson = useCallback(() => {
    addPersonHandler();
  }, [addPersonHandler]);

  return (
    <>
      {/* Guardian Contact Modal */}
      <GuardianContactModal 
        isOpen={guardianDialogOpen} 
        onOpenChange={setGuardianDialogOpen} 
        people={people} 
        onSubmit={handleSubmitForm}
      />

      {/* Add Person Modal */}
      <AddPersonModal 
        isOpen={addPersonDialogOpen} 
        onOpenChange={(open) => {
          setAddPersonDialogOpen(open);
          if (!open) {
            // Reset form when closing the dialog without adding
            resetForm();
          }
        }}
        onAddPerson={handleAddPerson} 
        firstName={firstName} 
        setFirstName={setFirstName} 
        lastName={lastName} 
        setLastName={setLastName} 
        personalNumber={personalNumber} 
        setPersonalNumber={setPersonalNumber} 
        gender={gender} 
        setGender={setGender} 
        classGroup={classGroup} 
        setClassGroup={setClassGroup} 
        genderOptions={genderOptions} 
        classOptions={classOptions} 
      />
    </>
  );
};
