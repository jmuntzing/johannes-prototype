
import { Button } from "@/components/ui/button";
import { Trash2, Copy, RotateCw } from "lucide-react";

interface RowActionsProps {
  showSwap: boolean;
  onSwap: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
}

const RowActions = ({
  showSwap,
  onSwap,
  onDuplicate,
  onRemove
}: RowActionsProps) => {
  return (
    <div className="flex gap-2 ml-auto">
      {showSwap && (
        <Button 
          variant="outline" 
          size="icon"
          onClick={onSwap}
          title="Byt roller"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      )}
      <Button 
        variant="outline" 
        size="icon"
        onClick={onDuplicate}
        title="Skapa kopia"
      >
        <Copy className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon"
        onClick={onRemove}
        title="Ta bort"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default RowActions;
