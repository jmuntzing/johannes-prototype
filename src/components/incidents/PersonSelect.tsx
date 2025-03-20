
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonSelectProps {
  value: string;
  onChange: (value: string) => void;
  childrenNames: string[];
  placeholder?: string;
  width?: string;
  onAddPerson: () => void;
}

const PersonSelect = ({
  value,
  onChange,
  childrenNames,
  placeholder = "Välj person...",
  width = "w-full md:w-[200px]",
  onAddPerson,
}: PersonSelectProps) => {
  return (
    <Select 
      value={value} 
      onValueChange={(value) => {
        if (value === "addNewPerson") {
          onAddPerson();
        } else {
          onChange(value);
        }
      }}
    >
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Personer</SelectLabel>
          {childrenNames.map(name => (
            <SelectItem key={name} value={name}>{name}</SelectItem>
          ))}
          <SelectItem value="addNewPerson">+ Lägg till ny person</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PersonSelect;
