
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import IncidentDescription from '@/components/forms/IncidentDescription';
import IncidentDetails from '@/components/forms/IncidentDetails';
import IncidentsList from '@/components/incidents/IncidentsList';
import { Incident } from '@/hooks/useIncidentForm';

interface IncidentFormProps {
  incidents: Incident[];
  incidentDescription: string;
  setIncidentDescription: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  locationOptions: {
    value: string;
    label: string;
  }[];
  childrenNames: string[];
  addIncident: () => void;
  updateIncident: (id: number, field: string, value: string) => void;
  removeIncident: (id: number) => void;
  duplicateIncident: (id: number) => void;
  swapRoles: (id: number) => void;
  onOpenAddPersonDialog: () => void;
  onSubmit: () => void;
}

const IncidentForm = memo(({
  incidents,
  incidentDescription,
  setIncidentDescription,
  location,
  setLocation,
  date,
  setDate,
  locationOptions,
  childrenNames,
  addIncident,
  updateIncident,
  removeIncident,
  duplicateIncident,
  swapRoles,
  onOpenAddPersonDialog,
  onSubmit
}: IncidentFormProps) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    console.log("Submit button clicked in IncidentForm");
    
    // Collect all people involved in incidents
    const involvedPeople = incidents
      .map(i => [i.person, i.perpetrator])
      .flat()
      .filter(p => p && p.length > 0);
    
    // Navigate to confirmation page with the form state
    navigate('/confirm', {
      state: {
        formState: {
          incidents,
          incidentDescription,
          location,
          date
        },
        people: involvedPeople
      }
    });
    
    // Still call the original onSubmit in case other code depends on it
    onSubmit();
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <h1 className="text-3xl font-medium mb-8">
        Anmäl kränkning <span className="text-gray-500 font-normal">(1/2)</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-14 mb-8">
        <IncidentDescription incidentDescription={incidentDescription} setIncidentDescription={setIncidentDescription} />
        <IncidentDetails location={location} setLocation={setLocation} date={date} setDate={setDate} locationOptions={locationOptions} />
      </div>

      <IncidentsList incidents={incidents} childrenNames={childrenNames} addIncident={addIncident} updateIncident={updateIncident} removeIncident={removeIncident} duplicateIncident={duplicateIncident} swapRoles={swapRoles} onAddPerson={onOpenAddPersonDialog} />

      <div className="flex justify-end mt-8">
        <Button onClick={handleContinue} size="lg" className="text-lg py-px" type="button">Fortsätt &gt;</Button>
      </div>
    </div>
  );
});

IncidentForm.displayName = 'IncidentForm';
export default IncidentForm;
