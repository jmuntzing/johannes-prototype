
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
    if (!value) return <SelectValue placeholder="kränkning ..." />;
    
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
          <SelectItem value="digitala trakasserier" className="pl-10">digitala trakasserier</SelectItem>
          <SelectItem value="elaka kommentarer" className="pl-10">elaka kommentarer</SelectItem>
          <SelectItem value="fysiska hot" className="pl-10">fysiska hot</SelectItem>
          <SelectItem value="förolämpningar" className="pl-10">förolämpningar</SelectItem>
          <SelectItem value="förlöjliganden" className="pl-10">förlöjliganden</SelectItem>
          <SelectItem value="knuffar" className="pl-10">knuffar</SelectItem>
          <SelectItem value="nedsättande ord" className="pl-10">nedsättande ord</SelectItem>
          <SelectItem value="psykosocial utfrysning" className="pl-10">psykosocial utfrysning</SelectItem>
          <SelectItem value="rasistiska uttryck" className="pl-10">rasistiska uttryck</SelectItem>
          <SelectItem value="ryktesspridning" className="pl-10">ryktesspridning</SelectItem>
          <SelectItem value="slag" className="pl-10">slag</SelectItem>
          <SelectItem value="sparkar" className="pl-10">sparkar</SelectItem>
          <SelectItem value="spridning av kränkande material" className="pl-10">spridning av kränkande material</SelectItem>
          <SelectItem value="social exkludering" className="pl-10">social exkludering</SelectItem>
          <SelectItem value="verbala hot" className="pl-10">verbala hot</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default IncidentTypeSelect;
