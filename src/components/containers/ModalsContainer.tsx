
import { useState, useCallback } from 'react';
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
}

const ModalsContainer = ({
  people,
  childrenNames,
  setChildrenNames,
  onPersonAdded,
  onSubmitForm,
  isAddPersonDialogOpen,
  setIsAddPersonDialogOpen
}: ModalsContainerProps) => {
  const [isGuardianDialogOpen, setIsGuardianDialogOpen] = useState(false);
  const [localAddPersonDialogOpen, setLocalAddPersonDialogOpen] = useState(false);
  
  // Use either the prop state or local state
  const addPersonDialogOpen = isAddPersonDialogOpen !== undefined ? isAddPersonDialogOpen : localAddPersonDialogOpen;
  const setAddPersonDialogOpen = setIsAddPersonDialogOpen || setLocalAddPersonDialogOpen;

  const handlePersonAdded = useCallback((fullName: string) => {
    console.log("Person added in ModalsContainer:", fullName);
    
    // First check if the name already exists to avoid duplicates
    if (!childrenNames.includes(fullName)) {
      setChildrenNames([...childrenNames, fullName]);
    }
    
    // Call the parent callback to update any active incident
    onPersonAdded(fullName);
    
    // Close the dialog
    setAddPersonDialogOpen(false);
  }, [childrenNames, setChildrenNames, onPersonAdded, setAddPersonDialogOpen]);

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
    handleAddPerson,
    resetForm
  } = useAddPerson({ onPersonAdded: handlePersonAdded });

  const handleOpenAddPersonDialog = useCallback(() => {
    resetForm();
    setAddPersonDialogOpen(true);
  }, [resetForm, setAddPersonDialogOpen]);

  const handleOpenGuardianDialog = useCallback(() => {
    setIsGuardianDialogOpen(true);
  }, []);

  const handleSubmitForm = useCallback(() => {
    console.log("Submit form called in ModalsContainer");
    onSubmitForm();
    setIsGuardianDialogOpen(false);
  }, [onSubmitForm]);

  return (
    <>
      {/* Guardian Contact Modal */}
      <GuardianContactModal 
        isOpen={isGuardianDialogOpen} 
        onOpenChange={setIsGuardianDialogOpen} 
        people={people} 
        onSubmit={handleSubmitForm}
      />

      {/* Add Person Modal */}
      <AddPersonModal 
        isOpen={addPersonDialogOpen} 
        onOpenChange={setAddPersonDialogOpen} 
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

// Export the component
export { ModalsContainer };
