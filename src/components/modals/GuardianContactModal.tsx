
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bara en sista fråga innan vi är klara</DialogTitle>
          <DialogDescription>
            Har vårdnadshavare till de inblandade eleverna kontaktats?
          </DialogDescription>
        </DialogHeader>
        <GuardianContact people={people} />
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button onClick={onSubmit}>
            Skicka in anmälan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuardianContactModal;
