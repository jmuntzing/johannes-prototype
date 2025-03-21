
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GuardianContact from "@/components/GuardianContact";

interface GuardianContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  people: string[];
  onSubmit: () => void;
}

const GuardianContactModal = ({
  isOpen,
  onOpenChange,
  people,
  onSubmit
}: GuardianContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-8 border-0">
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium">Har vårdnadshavare informerats?</DialogTitle>
          <p className="text-muted-foreground mt-3 mb-2">
            Innan du skickar in din anmälan, ange om vårdnadshavarna till de inblandade eleverna har informerats.
          </p>
        </DialogHeader>
        <GuardianContact people={people} />
        <DialogFooter className="gap-2 pt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-36 h-14 text-base"
            type="button"
          >
            Avbryt
          </Button>
          <Button 
            onClick={onSubmit} 
            className="bg-gray-600 hover:bg-gray-700 w-44 h-14 text-base"
            type="button"
          >
            Skicka in anmälan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuardianContactModal;
