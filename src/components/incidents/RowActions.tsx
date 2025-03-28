
import { Button } from "@/components/ui/button";
import { Trash2, Copy, ArrowLeftRight } from "lucide-react";

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
          variant="ghost" 
          size="sm"
          onClick={onSwap}
          title="Byt roller"
          className="h-7 px-2"
        >
          <ArrowLeftRight className="h-3 w-3 mr-0.5" />
          <span className="text-xs">Byt roller</span>
        </Button>
      )}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onDuplicate}
        title="Skapa kopia"
        className="h-7 px-2"
      >
        <Copy className="h-3 w-3 mr-0.5" />
        <span className="text-xs">Kopiera</span>
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onRemove}
        title="Ta bort"
        className="h-7 px-2"
      >
        <Trash2 className="h-3 w-3 mr-0.5" />
        <span className="text-xs">Radera</span>
      </Button>
    </div>
  );
};

export default RowActions;
