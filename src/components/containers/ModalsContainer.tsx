import { useCallback, useState } from 'react';
import GuardianContactModal from '@/components/modals/GuardianContactModal';
import AddPersonModal from '@/components/modals/add-person/AddPersonModal';
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
  const [localAddPersonDialogOpen, setLocalAddPersonDialogOpen] = useState(false);
  const [localGuardianDialogOpen, setLocalGuardianDialogOpen] = useState(false);
  
  const addPersonDialogOpen = isAddPersonDialogOpen !== undefined ? isAddPersonDialogOpen : localAddPersonDialogOpen;
  const setAddPersonDialogOpen = setIsAddPersonDialogOpen || setLocalAddPersonDialogOpen;
  
  const guardianDialogOpen = isGuardianDialogOpen !== undefined ? isGuardianDialogOpen : localGuardianDialogOpen;
  const setGuardianDialogOpen = setIsGuardianDialogOpen || setLocalGuardianDialogOpen;

  const handlePersonAddedCallback = useCallback((name: string) => {
    console.log("Person added in ModalsContainer:", name);
    
    if (!childrenNames.includes(name)) {
      setChildrenNames([...childrenNames, name]);
    }
    
    onPersonAdded(name);
    
    setAddPersonDialogOpen(false);
  }, [childrenNames, onPersonAdded, setAddPersonDialogOpen, setChildrenNames]);

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
    onPersonAdded: handlePersonAddedCallback
  });

  const handleSubmitForm = useCallback(() => {
    console.log("Submit form called in ModalsContainer");
    onSubmitForm();
    setGuardianDialogOpen(false);
  }, [onSubmitForm, setGuardianDialogOpen]);
  
  const handleAddPerson = useCallback(() => {
    try {
      addPersonHandler();
    } catch (error) {
      console.error("Error in handleAddPerson:", error);
    }
  }, [addPersonHandler]);

  return (
    <>
      <GuardianContactModal 
        isOpen={guardianDialogOpen} 
        onOpenChange={setGuardianDialogOpen} 
        people={people} 
        onSubmit={handleSubmitForm}
      />

      <AddPersonModal 
        isOpen={addPersonDialogOpen} 
        onOpenChange={(open) => {
          try {
            setAddPersonDialogOpen(open);
            if (!open) {
              resetForm();
            }
          } catch (error) {
            console.error("Error in onOpenChange handler:", error);
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
