
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
      <h3 className="text-xl font-semibold mb-2">Vad var det som hände?</h3>
      <Textarea 
        id="vad-hande" 
        value={incidentDescription}
        onChange={(e) => setIncidentDescription(e.target.value)}
        placeholder='T.ex. "Under rasten på skolgården började Alex Johansson och Liam Eriksson bråka. Det hela började med ett missförstånd från en tidigare diskussion i gruppen, som snabbt trappades upp. Alex knuffade Liam, och då slog Liam tillbaka. Bråket avbröts snabbt av en rastvakt som kom dit och stoppade dem. Båda grabbarna togs till rektorns kontor för att prata om vad som hänt …"'
        className="min-h-[350px]"
      />
    </div>
  );
};

export default IncidentDescription;
