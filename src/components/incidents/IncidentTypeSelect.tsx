
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
          <SelectItem value="blåmärken" className="pl-10">blåmärken</SelectItem>
          <SelectItem value="frakturer" className="pl-10">frakturer</SelectItem>
          <SelectItem value="förlust av medvetande" className="pl-10">förlust av medvetande</SelectItem>
          <SelectItem value="hjärnskakning" className="pl-10">hjärnskakning</SelectItem>
          <SelectItem value="huvudvärk" className="pl-10">huvudvärk</SelectItem>
          <SelectItem value="hudrodnad" className="pl-10">hudrodnad</SelectItem>
          <SelectItem value="illamående" className="pl-10">illamående</SelectItem>
          <SelectItem value="näsblod" className="pl-10">näsblod</SelectItem>
          <SelectItem value="skrubbsår" className="pl-10">skrubbsår</SelectItem>
          <SelectItem value="skador på kläder eller ägodelar" className="pl-10">skador på kläder eller ägodelar</SelectItem>
          <SelectItem value="skärsår" className="pl-10">skärsår</SelectItem>
          <SelectItem value="svullnad" className="pl-10">svullnad</SelectItem>
          <SelectItem value="tand- eller munskador" className="pl-10">tand- eller munskador</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default IncidentTypeSelect;
