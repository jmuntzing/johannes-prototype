
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

const ModalsContainer = ({
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
  // Use either the prop state or local state for add person dialog
  const [localAddPersonDialogOpen, setLocalAddPersonDialogOpen] = useState(false);
  const [localGuardianDialogOpen, setLocalGuardianDialogOpen] = useState(false);
  
  const addPersonDialogOpen = isAddPersonDialogOpen !== undefined ? isAddPersonDialogOpen : localAddPersonDialogOpen;
  const setAddPersonDialogOpen = setIsAddPersonDialogOpen || setLocalAddPersonDialogOpen;
  
  const guardianDialogOpen = isGuardianDialogOpen !== undefined ? isGuardianDialogOpen : localGuardianDialogOpen;
  const setGuardianDialogOpen = setIsGuardianDialogOpen || setLocalGuardianDialogOpen;

  // Define handlePersonAdded first as a stub to resolve the circular dependency
  const handlePersonAddedRef = useCallback((fullName: string) => {
    console.log("Person added in ModalsContainer:", fullName);
    
    // First check if the name already exists to avoid duplicates
    if (!childrenNames.includes(fullName)) {
      setChildrenNames([...childrenNames, fullName]);
    }
    
    // Call the parent callback to update any active incident
    onPersonAdded(fullName);
    
    // Important: Reset form values after a person is added
    resetForm();
    
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
  } = useAddPerson({ onPersonAdded: handlePersonAddedRef });

  // We use the reference directly to avoid the circular dependency
  const handlePersonAdded = handlePersonAddedRef;

  const handleSubmitForm = useCallback(() => {
    console.log("Submit form called in ModalsContainer");
    onSubmitForm();
    setGuardianDialogOpen(false);
  }, [onSubmitForm, setGuardianDialogOpen]);

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

export { ModalsContainer };
