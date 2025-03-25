
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { isUtsattesFor } from '@/utils/incidentUtils';
import { toast } from "@/hooks/use-toast";
import { Incident } from '@/hooks/useIncidentForm';
import { ArrowLeft } from 'lucide-react';

// Types
interface ConfirmationState {
  formState: {
    incidents: Incident[];
    incidentDescription: string;
    location: string;
    date: string;
  };
  people: string[];
}

interface PersonOption {
  id: string;
  label: string;
  checked: boolean;
}

interface InjuryIncident {
  person: string;
  incident: string;
  perpetrator?: string;
}

const injuryOutcomeOptions = [
  { id: "akut-sjukvard", label: "Akut sjukvård/tandvård" },
  { id: "skolskoterska", label: "Besök hos skolsköterska" },
  { id: "hemtagen", label: "Hämtades av vårdnadshavare/åkte hem" },
  { id: "samtal", label: "Samtal med kurator/psykolog" },
  { id: "atervande", label: "Återvände till verksamheten" },
  { id: "annat", label: "Annat" }
];

const ConfirmIncident = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<ConfirmationState | null>(null);
  const [informedOptions, setInformedOptions] = useState<PersonOption[]>([]);
  const [injuryCauseMap, setInjuryCauseMap] = useState<Record<string, string>>({});
  const [outcomeMap, setOutcomeMap] = useState<Record<string, string>>({});
  const [injuryIncidents, setInjuryIncidents] = useState<InjuryIncident[]>([]);

  // Process the state passed from the previous page
  useEffect(() => {
    if (location.state) {
      setState(location.state as ConfirmationState);
      
      // Generate options for who has been informed
      const people = (location.state as ConfirmationState).people || [];
      const uniquePeople = [...new Set(people)].filter(p => p);
      
      const options: PersonOption[] = uniquePeople.map(person => ({
        id: person.replace(/\s+/g, '-').toLowerCase(),
        // Fix genitive form for names ending with 's'
        label: `${person}${person.endsWith('s') ? '' : 's'} vårdnadshavare`,
        checked: false
      }));
      
      // Always add school nurse as the last option
      options.push({
        id: 'skolskoterska',
        label: 'Skolsköterska',
        checked: false
      });
      
      setInformedOptions(options);
      
      // Find injury incidents
      const incidents = (location.state as ConfirmationState).formState.incidents || [];
      
      // Find all injury incidents 
      const injuries = incidents.filter(inc => 
        inc.incident && 
        inc.person
      ).map(inc => ({
        person: inc.person,
        incident: inc.incident,
        perpetrator: inc.perpetrator
      }));
      
      setInjuryIncidents(injuries);
      
      // Initialize empty outcome selections for each injured person
      const initialOutcomeMap: Record<string, string> = {};
      const initialCauseMap: Record<string, string> = {};
      
      injuries.forEach(injury => {
        initialOutcomeMap[injury.person] = "";
        initialCauseMap[injury.person] = "";
      });
      
      setOutcomeMap(initialOutcomeMap);
      setInjuryCauseMap(initialCauseMap);
    }
  }, [location.state]);

  const toggleInformed = (id: string) => {
    setInformedOptions(prev => 
      prev.map(option => 
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  // Get potential causes for a specific injury
  const getInjuryCauses = (person: string) => {
    if (!state) return [];
    
    // Find all incidents where this person was the victim
    const incidents = state.formState.incidents;
    
    // Get all incidents for this person with perpetrator information
    const assaultIncidents = incidents
      .filter(inc => inc.person === person && inc.incident)
      .map(inc => {
        // Include the perpetrator name in the display
        if (inc.perpetrator) {
          return `Utsattes för ${inc.incident} av ${inc.perpetrator}`;
        }
        return `Utsattes för ${inc.incident}`;
      });
    
    // If we have assault incidents, return them plus additional options
    if (assaultIncidents.length > 0) {
      const options = [...assaultIncidents];
      
      // Only add "Kombination av ovanstående" if there's more than one cause
      if (assaultIncidents.length > 1) {
        options.push("Kombination av ovanstående");
      }
      
      options.push("Vet ej");
      return options;
    }
    
    // If no assault incidents, return generic options
    return ["Olycka", "Vet ej"];
  };

  const handleSubmit = () => {
    // Validate that at least one person has been informed
    if (!informedOptions.some(option => option.checked)) {
      toast({
        title: "Validering misslyckades",
        description: "Du måste ange vilka som har informerats om händelsen.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate that an injury cause is selected for each injury
    for (const injury of injuryIncidents) {
      if (!injuryCauseMap[injury.person]) {
        toast({
          title: "Validering misslyckades",
          description: `Du måste ange vad som orsakade skadan för ${injury.person}.`,
          variant: "destructive"
        });
        return;
      }
      
      // Validate that an outcome is selected for each injury
      if (!outcomeMap[injury.person]) {
        toast({
          title: "Validering misslyckades",
          description: `Du måste ange vad som hände med ${injury.person} efter händelsen.`,
          variant: "destructive"
        });
        return;
      }
    }
    
    // Process form submission
    toast({
      title: "Anmälan har skickats in!",
      description: "Din incidentrapport har registrerats."
    });
    
    // Navigate back to the first page
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!state) {
    return <div className="container mx-auto py-12 px-4">Laddar...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <h1 className="text-3xl font-medium mb-8">
        Anmäl kränkning <span className="text-gray-500 font-normal">(2/2)</span>
      </h1>
      
      <div className="space-y-10">
        {/* Who has been informed */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Vilka har informerats om händelsen?</h2>
          <div className="space-y-3">
            {informedOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <Checkbox 
                  id={option.id} 
                  checked={option.checked}
                  onCheckedChange={() => toggleInformed(option.id)}
                  className="h-5 w-5 border-gray-400"
                />
                <label
                  htmlFor={option.id}
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* What caused each injury - only shown for injury incidents */}
        {injuryIncidents.map((injury) => (
          <div key={`cause-${injury.person}-${injury.incident}`}>
            <h2 className="text-xl font-semibold mb-4">
              Vad orsakade skadan "{injury.person} {injury.incident}"?
            </h2>
            <RadioGroup 
              value={injuryCauseMap[injury.person]} 
              onValueChange={(value) => setInjuryCauseMap(prev => ({...prev, [injury.person]: value}))}
            >
              <div className="space-y-3">
                {getInjuryCauses(injury.person).map((cause) => (
                  <div key={cause} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={cause} 
                      id={`${injury.person}-${cause}`.replace(/\s+/g, '-').toLowerCase()} 
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor={`${injury.person}-${cause}`.replace(/\s+/g, '-').toLowerCase()}
                      className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {cause}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        ))}
        
        {/* What happened after the incident - only shown for injury incidents */}
        {injuryIncidents.map((injury) => (
          <div key={`outcome-${injury.person}-${injury.incident}`}>
            <h2 className="text-xl font-semibold mb-4">
              Vad hände med {injury.person} efter händelsen?
            </h2>
            <Select 
              value={outcomeMap[injury.person]} 
              onValueChange={(value) => setOutcomeMap(prev => ({...prev, [injury.person]: value}))}
            >
              <SelectTrigger className="w-full md:w-[300px] text-base">
                <SelectValue placeholder="Välj vad som hände..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {injuryOutcomeOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id} className="text-base">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-10">
        <Button 
          onClick={handleBack} 
          size="lg" 
          className="text-lg py-px flex items-center gap-2" 
          type="button"
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4" /> Tillbaka
        </Button>
        <Button 
          onClick={handleSubmit} 
          size="lg" 
          className="text-lg py-px" 
          type="button"
        >
          Skicka in anmälan
        </Button>
      </div>
    </div>
  );
};

export default ConfirmIncident;
