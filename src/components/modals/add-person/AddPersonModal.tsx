
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddPersonForm from './AddPersonForm';
import AddPersonActions from './AddPersonActions';
import { useAddPersonModal } from './useAddPersonModal';

interface GenderOption {
  value: string;
  label: string;
}

interface ClassOption {
  value: string;
  label: string;
}

interface AddPersonModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPerson: () => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  personalNumber: string;
  setPersonalNumber: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  classGroup: string;
  setClassGroup: (value: string) => void;
  genderOptions: GenderOption[];
  classOptions: ClassOption[];
}

const AddPersonModal = ({
  isOpen,
  onOpenChange,
  onAddPerson,
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
  classOptions
}: AddPersonModalProps) => {
  const { firstNameInputRef } = useAddPersonModal({ isOpen });

  const handleCancel = () => {
    onOpenChange(false);
    // Ensure pointer events are restored
    setTimeout(() => {
      document.body.style.pointerEvents = 'auto';
    }, 100);
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        try {
          // Ensure this callback doesn't throw errors
          onOpenChange(open);
          
          // Make sure pointer-events are restored when dialog closes
          if (!open) {
            setTimeout(() => {
              document.body.style.pointerEvents = 'auto';
            }, 100);
          }
        } catch (error) {
          console.error("Error in Dialog onOpenChange:", error);
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px] p-8">
        <DialogTitle className="text-3xl font-medium mb-6">Lägg till elev</DialogTitle>
        <DialogDescription className="sr-only">Formulär för att lägga till en ny elev</DialogDescription>
        
        <AddPersonForm
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
          firstNameInputRef={firstNameInputRef}
        />
        
        <AddPersonActions 
          onCancel={handleCancel}
          onAddPerson={onAddPerson}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPersonModal;
