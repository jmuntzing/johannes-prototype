
import { forwardRef } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

interface PersonSelectProps {
  value: string;
  onChange: (value: string) => void;
  childrenNames: string[];
  onAddPerson: () => void;
}

const PersonSelect = forwardRef<HTMLButtonElement, PersonSelectProps>(({
  value,
  onChange,
  childrenNames,
  onAddPerson
}, ref) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full md:w-[200px] text-base" ref={ref}>
        <SelectValue placeholder="Välj person..." className={value ? "font-semibold" : ""} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectGroup>
          {childrenNames.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
          <div 
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer" 
            onClick={onAddPerson}
          >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
              <PlusCircle className="h-4 w-4" />
            </span>
            <span>Lägg till person...</span>
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

PersonSelect.displayName = 'PersonSelect';

export default PersonSelect;
