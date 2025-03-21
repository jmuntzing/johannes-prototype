
import { Button } from "@/components/ui/button";

interface AddPersonActionsProps {
  onCancel: () => void;
  onAddPerson: () => void;
}

const AddPersonActions = ({ onCancel, onAddPerson }: AddPersonActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button 
        variant="outline" 
        onClick={onCancel}
        className="min-w-[120px] text-base py-6"
        type="button"
      >
        Avbryt
      </Button>
      <Button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            console.log("Add person button clicked");
            onAddPerson();
            // Ensure pointer events are restored after adding person
            setTimeout(() => {
              document.body.style.pointerEvents = 'auto';
            }, 100);
          } catch (error) {
            console.error("Error in onAddPerson handler:", error);
          }
        }}
        className="min-w-[120px] text-base py-6"
        type="button"
      >
        Lägg till
      </Button>
    </div>
  );
};

export default AddPersonActions;
