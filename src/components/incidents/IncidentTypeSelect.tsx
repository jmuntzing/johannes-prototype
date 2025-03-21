
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
    if (!value) return <SelectValue placeholder="elev..." />;
    
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
          <SelectLabel className="text-muted-foreground">utsattes för...</SelectLabel>
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
        <SelectGroup>
          <SelectLabel className="text-muted-foreground">drabbades av...</SelectLabel>
          <SelectItem value="allergisk reaktion" className="pl-10">allergisk reaktion</SelectItem>
          <SelectItem value="blåmärken" className="pl-10">blåmärken</SelectItem>
          <SelectItem value="brännskada" className="pl-10">brännskada</SelectItem>
          <SelectItem value="föremål i ögat" className="pl-10">föremål i ögat</SelectItem>
          <SelectItem value="fästingbett" className="pl-10">fästingbett</SelectItem>
          <SelectItem value="fraktur benbrott" className="pl-10">fraktur (benbrott)</SelectItem>
          <SelectItem value="fysiska överbelastningsskador" className="pl-10">fysiska överbelastningsskador</SelectItem>
          <SelectItem value="förstoring av stukning" className="pl-10">förstoring av stukning</SelectItem>
          <SelectItem value="hjärnskakning" className="pl-10">hjärnskakning</SelectItem>
          <SelectItem value="insektsbett" className="pl-10">insektsbett</SelectItem>
          <SelectItem value="klämskada" className="pl-10">klämskada</SelectItem>
          <SelectItem value="köldskada" className="pl-10">köldskada</SelectItem>
          <SelectItem value="näsblod" className="pl-10">näsblod</SelectItem>
          <SelectItem value="skärsår" className="pl-10">skärsår</SelectItem>
          <SelectItem value="skrubbsår" className="pl-10">skrubbsår</SelectItem>
          <SelectItem value="slagskada" className="pl-10">slagskada</SelectItem>
          <SelectItem value="sticksår" className="pl-10">sticksår</SelectItem>
          <SelectItem value="stukning" className="pl-10">stukning</SelectItem>
          <SelectItem value="sträckning" className="pl-10">sträckning</SelectItem>
          <SelectItem value="tandskada" className="pl-10">tandskada</SelectItem>
          <SelectItem value="vridskada" className="pl-10">vridskada</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default IncidentTypeSelect;
