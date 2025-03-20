
import { Textarea } from "@/components/ui/textarea";
import { memo } from "react";

interface IncidentDescriptionProps {
  incidentDescription: string;
  setIncidentDescription: (value: string) => void;
}

const IncidentDescription = memo(({ 
  incidentDescription, 
  setIncidentDescription 
}: IncidentDescriptionProps) => {
  // Use a callback function for onChange to prevent unnecessary re-renders
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIncidentDescription(e.target.value);
  };

  return (
    <div className="md:col-span-3">
      <h3 className="text-xl font-semibold mb-2">Vad var det som hände?</h3>
      <Textarea 
        id="vad-hande" 
        value={incidentDescription}
        onChange={handleChange}
        placeholder='T.ex. "Under rasten på skolgården började Alex Johansson och Liam Eriksson bråka. Det hela började med ett missförstånd från en tidigare diskussion i gruppen, som snabbt trappades upp. Alex knuffade Liam, och då slog Liam tillbaka. Bråket avbröts snabbt av en rastvakt som kom dit och stoppade dem. Båda grabbarna togs till rektorns kontor för att prata om vad som hänt …"'
        className="min-h-[350px]"
      />
    </div>
  );
});

// Add display name for better debugging
IncidentDescription.displayName = 'IncidentDescription';

export default IncidentDescription;
