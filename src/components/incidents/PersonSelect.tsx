
import { forwardRef } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select";

interface PersonSelectProps {
  value: string;
  onChange: (value: string) => void;
  childrenNames: string[];
  onAddPerson: () => void;
  placeholder?: string;
}

const PersonSelect = forwardRef<HTMLButtonElement, PersonSelectProps>(({
  value,
  onChange,
  childrenNames,
  onAddPerson,
  placeholder = "Person..."
}, ref) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full md:w-[200px] text-base" ref={ref}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[400px] bg-white z-50">
        <SelectGroup>
          {childrenNames.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
          <SelectSeparator className="bg-gray-300" />
          <div 
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-base outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              try {
                onAddPerson();
              } catch (error) {
                console.error("Error in onAddPerson handler:", error);
              }
            }}
          >
            <span className="font-medium">+ Lägg till person</span>
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

PersonSelect.displayName = 'PersonSelect';

export default PersonSelect;
