
import { forwardRef } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select";

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
        <SelectValue placeholder="Välj person..." />
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        <SelectGroup>
          {childrenNames.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
          <SelectSeparator />
          <div 
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-base outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer" 
            onClick={onAddPerson}
          >
            <span className="font-medium">+ Lägg till elev</span>
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

PersonSelect.displayName = 'PersonSelect';

export default PersonSelect;
