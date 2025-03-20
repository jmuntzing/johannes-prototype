
import { memo } from 'react';
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
  locationOptions: { value: string; label: string; }[];
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
  return (
    <div className="container mx-auto py-20 px-4 max-w-6xl">
      <h1 className="text-3xl font-medium mb-8">Anmäl incident</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-14 mb-8">
        <IncidentDescription 
          incidentDescription={incidentDescription} 
          setIncidentDescription={setIncidentDescription} 
        />

        <IncidentDetails 
          location={location} 
          setLocation={setLocation} 
          date={date} 
          setDate={setDate} 
          locationOptions={locationOptions} 
        />
      </div>

      <IncidentsList 
        incidents={incidents} 
        childrenNames={childrenNames} 
        addIncident={addIncident} 
        updateIncident={updateIncident} 
        removeIncident={removeIncident} 
        duplicateIncident={duplicateIncident} 
        swapRoles={swapRoles} 
        onAddPerson={onOpenAddPersonDialog} 
      />

      <div className="flex justify-end mt-8">
        <Button 
          onClick={() => {
            console.log("Submit button clicked in IncidentForm");
            onSubmit();
          }} 
          size="lg" 
          className="text-lg py-px"
          type="button"
        >
          Slutför anmälan
        </Button>
      </div>
    </div>
  );
});

IncidentForm.displayName = 'IncidentForm';

export default IncidentForm;
