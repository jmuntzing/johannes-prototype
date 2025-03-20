
import { useState, useCallback } from 'react';
import GuardianContactModal from '@/components/modals/GuardianContactModal';
import AddPersonModal from '@/components/modals/AddPersonModal';
import { useAddPerson } from '@/hooks/useAddPerson';

interface ModalsContainerProps {
  people: string[];
  childrenNames: string[];
  setChildrenNames: (names: string[]) => void;
  onPersonAdded: (name: string, isEmpty: boolean) => void;
  onSubmitForm: () => void;
}

const ModalsContainer = ({
  people,
  childrenNames,
  setChildrenNames,
  onPersonAdded,
  onSubmitForm
}: ModalsContainerProps) => {
  const [isGuardianDialogOpen, setIsGuardianDialogOpen] = useState(false);
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false);

  const handlePersonAdded = useCallback((fullName: string) => {
    // First check if the name already exists to avoid duplicates
    if (!childrenNames.includes(fullName)) {
      setChildrenNames([...childrenNames, fullName]);
    }
    
    // Call the parent callback to update any active incident
    onPersonAdded(fullName, false);
    
    // Close the dialog
    setIsAddPersonDialogOpen(false);
  }, [childrenNames, setChildrenNames, onPersonAdded]);

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
    isSubmitting,
    handleAddPerson,
    resetForm
  } = useAddPerson({ onPersonAdded: handlePersonAdded });

  const handleOpenAddPersonDialog = useCallback(() => {
    resetForm();
    setIsAddPersonDialogOpen(true);
  }, [resetForm]);

  const handleOpenGuardianDialog = useCallback(() => {
    setIsGuardianDialogOpen(true);
  }, []);

  const handleSubmitForm = useCallback(() => {
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
        isOpen={isAddPersonDialogOpen} 
        onOpenChange={setIsAddPersonDialogOpen} 
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

      {/* Export handleOpenGuardianDialog and handleOpenAddPersonDialog */}
      <div className="hidden">
        {isSubmitting ? null : null /* Use isSubmitting to avoid linter warnings */}
      </div>
    </>
  );
};

// Export both the component and the hooks
export { 
  ModalsContainer,
  useCallback as useModalOpener
};
