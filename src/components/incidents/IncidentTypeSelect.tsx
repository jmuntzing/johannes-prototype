
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getIncidentDisplay, isUtsattesFor } from "@/utils/incidentUtils";

interface IncidentTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const IncidentTypeSelect = ({
  value,
  onChange
}: IncidentTypeSelectProps) => {
  const renderTriggerContent = () => {
    if (!value) return <SelectValue placeholder="utsattes för..." />;
    
    return (
      <div className="flex items-center">
        <span className="font-semibold">{value}</span>
      </div>
    );
  };

  return (
    <Select 
      value={value} 
      onValueChange={onChange}
    >
      <SelectTrigger className="w-full md:w-[300px] text-base">
        {renderTriggerContent()}
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        <SelectGroup>
          <SelectItem value="digitala trakasserier">digitala trakasserier</SelectItem>
          <SelectItem value="elaka kommentarer">elaka kommentarer</SelectItem>
          <SelectItem value="fysiska hot">fysiska hot</SelectItem>
          <SelectItem value="förolämpningar">förolämpningar</SelectItem>
          <SelectItem value="förlöjliganden">förlöjliganden</SelectItem>
          <SelectItem value="knuffar">knuffar</SelectItem>
          <SelectItem value="nedsättande ord">nedsättande ord</SelectItem>
          <SelectItem value="psykosocial utfrysning">psykosocial utfrysning</SelectItem>
          <SelectItem value="rasistiska uttryck">rasistiska uttryck</SelectItem>
          <SelectItem value="ryktesspridning">ryktesspridning</SelectItem>
          <SelectItem value="slag">slag</SelectItem>
          <SelectItem value="sparkar">sparkar</SelectItem>
          <SelectItem value="spridning av kränkande material">spridning av kränkande material</SelectItem>
          <SelectItem value="social exkludering">social exkludering</SelectItem>
          <SelectItem value="verbala hot">verbala hot</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default IncidentTypeSelect;
