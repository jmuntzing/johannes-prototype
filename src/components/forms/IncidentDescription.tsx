
import { Textarea } from "@/components/ui/textarea";

interface IncidentDescriptionProps {
  incidentDescription: string;
  setIncidentDescription: (value: string) => void;
}

const IncidentDescription = ({ 
  incidentDescription, 
  setIncidentDescription 
}: IncidentDescriptionProps) => {
  return (
    <div className="md:col-span-3">
      <h3 className="text-xl font-semibold mb-4">Vad var det som hände?</h3>
      <Textarea 
        id="vad-hande" 
        value={incidentDescription}
        onChange={(e) => setIncidentDescription(e.target.value)}
        placeholder='T.ex. "Under rasten på skolgården började Alex Johansson och Liam Eriksson bråka..."'
        className="min-h-[350px]"
      />
    </div>
  );
};

export default IncidentDescription;
