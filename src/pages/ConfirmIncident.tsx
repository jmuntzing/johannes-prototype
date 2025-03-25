
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getIncidentDisplay } from '@/utils/incidentUtils';
import { toast } from "@/hooks/use-toast";
import { Incident } from '@/hooks/useIncidentForm';

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
  const [injuryCauses, setInjuryCauses] = useState<string[]>([]);
  const [selectedInjuryCause, setSelectedInjuryCause] = useState<string>("");
  const [selectedOutcome, setSelectedOutcome] = useState<string>("");
  const [injuredPerson, setInjuredPerson] = useState<string>("");
  const [injuryType, setInjuryType] = useState<string>("");

  // Process the state passed from the previous page
  useEffect(() => {
    if (location.state) {
      setState(location.state as ConfirmationState);
      
      // Generate options for who has been informed
      const people = (location.state as ConfirmationState).people || [];
      const uniquePeople = [...new Set(people)].filter(p => p);
      
      const options: PersonOption[] = uniquePeople.map(person => ({
        id: person.replace(/\s+/g, '-').toLowerCase(),
        label: `${person}s vårdnadshavare`,
        checked: false
      }));
      
      // Always add school nurse as the last option
      options.push({
        id: 'skolskoterska',
        label: 'Skolsköterska',
        checked: false
      });
      
      setInformedOptions(options);
      
      // Find injury incidents to populate injury causes
      const incidents = (location.state as ConfirmationState).formState.incidents || [];
      
      // Find the first injury incident (not "utsattes för")
      const injuryIncident = incidents.find(inc => inc.incident && !inc.incident.includes('utsattes för'));
      
      if (injuryIncident) {
        setInjuredPerson(injuryIncident.person);
        setInjuryType(injuryIncident.incident);
      }
      
      // Gather all incidents for this person to create cause options
      const personIncidents = incidents
        .filter(inc => inc.person === injuredPerson && inc.incident)
        .map(inc => inc.incident);
      
      // Create unique list of incident causes
      const uniqueCauses = [...new Set(personIncidents)];
      setInjuryCauses(uniqueCauses);
      
      // If we have assault incidents, add them as cause options
      const assaultIncidents = incidents
        .filter(inc => inc.person === injuredPerson && inc.incident && inc.incident.includes('utsattes för'))
        .map(inc => `Utsattes för ${inc.incident.replace('utsattes för ', '')}`);
      
      if (assaultIncidents.length > 0) {
        setInjuryCauses([...assaultIncidents, "Kombination av ovanstående", "Vet ej"]);
      }
    }
  }, [location.state, injuredPerson]);

  const toggleInformed = (id: string) => {
    setInformedOptions(prev => 
      prev.map(option => 
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
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
    
    // Validate that an injury cause is selected if there's an injury
    if (injuryCauses.length > 0 && !selectedInjuryCause) {
      toast({
        title: "Validering misslyckades",
        description: "Du måste ange vad som orsakade skadan.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate that an outcome is selected
    if (!selectedOutcome) {
      toast({
        title: "Validering misslyckades",
        description: "Du måste ange vad som hände efter händelsen.",
        variant: "destructive"
      });
      return;
    }
    
    // Process form submission
    toast({
      title: "Anmälan har skickats in!",
      description: "Din incidentrapport har registrerats."
    });
    
    // Navigate back to the first page
    navigate("/");
  };

  if (!state) {
    return <div className="container mx-auto py-12 px-4">Laddar...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <h1 className="text-3xl font-medium mb-8">Slutför anmälan</h1>
      
      <div className="space-y-10">
        {/* Who has been informed */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Vilka har informerats om händelsen?</h2>
          <div className="space-y-3">
            {informedOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={option.id} 
                  checked={option.checked}
                  onCheckedChange={() => toggleInformed(option.id)}
                />
                <label
                  htmlFor={option.id}
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* What caused the injury - only shown if there's an injury incident */}
        {injuryType && injuryCauses.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Vad orsakade skadan "{injuredPerson} drabbades av {injuryType}"?
            </h2>
            <RadioGroup value={selectedInjuryCause} onValueChange={setSelectedInjuryCause}>
              <div className="space-y-3">
                {injuryCauses.map((cause) => (
                  <div key={cause} className="flex items-center space-x-2">
                    <RadioGroupItem value={cause} id={cause.replace(/\s+/g, '-').toLowerCase()} />
                    <label
                      htmlFor={cause.replace(/\s+/g, '-').toLowerCase()}
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {cause}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}
        
        {/* What happened after the incident */}
        {injuredPerson && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Vad hände med {injuredPerson} efter händelsen?
            </h2>
            <RadioGroup value={selectedOutcome} onValueChange={setSelectedOutcome}>
              <div className="space-y-3">
                {injuryOutcomeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <label
                      htmlFor={option.id}
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}
      </div>
      
      <div className="flex justify-end mt-10">
        <Button onClick={handleSubmit} size="lg" className="text-lg py-px" type="button">
          Skicka in anmälan
        </Button>
      </div>
    </div>
  );
};

export default ConfirmIncident;
