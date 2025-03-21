
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  // Fix for pointer-events issue after modal closes
  useEffect(() => {
    if (!isOpen) {
      // Ensure body has proper pointer events after modal closes
      document.body.style.pointerEvents = '';
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      
      // Make sure pointer-events are restored when dialog closes
      if (!open) {
        setTimeout(() => {
          document.body.style.pointerEvents = '';
        }, 100);
      }
    }}>
      <DialogContent className="sm:max-w-[900px] p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium">
            Har vårdnadshavare informerats?
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            Innan du skickar in din anmälan, ange om vårdnadshavarna till de inblandade eleverna har informerats.
          </p>
        </DialogHeader>
        
        <div className="mt-4">
          <GuardianContact people={people} />
          
          <div className="flex justify-end gap-4 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                onOpenChange(false);
                // Ensure pointer events are restored
                setTimeout(() => {
                  document.body.style.pointerEvents = '';
                }, 100);
              }}
              className="min-w-[120px]"
            >
              Avbryt
            </Button>
            <Button 
              onClick={() => {
                onSubmit();
                // Ensure pointer events are restored after submit
                setTimeout(() => {
                  document.body.style.pointerEvents = '';
                }, 100);
              }}
              className="min-w-[120px]"
            >
              Spara
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuardianContactModal;
