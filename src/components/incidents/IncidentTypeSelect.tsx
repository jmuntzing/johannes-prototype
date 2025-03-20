
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
    if (!value) return <SelectValue placeholder="utsattes för/drabbades av..." />;
    
    const prefix = isUtsattesFor(value) ? 'utsattes för' : 'drabbades av';
    
    return (
      <div className="flex items-center">
        <span className="mr-1">{prefix}</span>
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
          <SelectLabel>utsattes för...</SelectLabel>
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
        <SelectGroup>
          <SelectLabel>drabbades av...</SelectLabel>
          <SelectItem value="allergisk reaktion">allergisk reaktion</SelectItem>
          <SelectItem value="blåmärken">blåmärken</SelectItem>
          <SelectItem value="brännskada">brännskada</SelectItem>
          <SelectItem value="föremål i ögat">föremål i ögat</SelectItem>
          <SelectItem value="fästingbett">fästingbett</SelectItem>
          <SelectItem value="fraktur benbrott">fraktur (benbrott)</SelectItem>
          <SelectItem value="fysiska överbelastningsskador">fysiska överbelastningsskador</SelectItem>
          <SelectItem value="förstoring av stukning">förstoring av stukning</SelectItem>
          <SelectItem value="hjärnskakning">hjärnskakning</SelectItem>
          <SelectItem value="insektsbett">insektsbett</SelectItem>
          <SelectItem value="klämskada">klämskada</SelectItem>
          <SelectItem value="köldskada">köldskada</SelectItem>
          <SelectItem value="näsblod">näsblod</SelectItem>
          <SelectItem value="skärsår">skärsår</SelectItem>
          <SelectItem value="skrubbsår">skrubbsår</SelectItem>
          <SelectItem value="slagskada">slagskada</SelectItem>
          <SelectItem value="sticksår">sticksår</SelectItem>
          <SelectItem value="stukning">stukning</SelectItem>
          <SelectItem value="sträckning">sträckning</SelectItem>
          <SelectItem value="tandskada">tandskada</SelectItem>
          <SelectItem value="vridskada">vridskada</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default IncidentTypeSelect;
