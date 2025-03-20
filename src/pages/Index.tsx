
import { useCallback, useState } from 'react';
import { useIncidentForm } from '@/hooks/useIncidentForm';
import IncidentForm from '@/components/forms/IncidentForm';
import { ModalsContainer, useModalOpener } from '@/components/containers/ModalsContainer';

const Index = () => {
  const {
    incidents,
    setIncidents, // Add this line to destructure setIncidents from the hook
    incidentDescription,
    setIncidentDescription,
    location,
    setLocation,
    date,
    setDate,
    childrenNames,
    setChildrenNames,
    locationOptions,
    addIncident,
    updateIncident,
    removeIncident,
    duplicateIncident,
    swapRoles,
    submitForm
  } = useIncidentForm();

  const [isGuardianDialogOpen, setIsGuardianDialogOpen] = useState(false);
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false);

  // Function to handle adding a person with updating an incident
  const handlePersonAdded = useCallback((fullName: string, isEmpty: boolean) => {
    // Find an empty slot or use the last incident
    setIncidents(prevIncidents => {
      const activeIncidentId = isEmpty 
        ? prevIncidents.find(inc => inc.person === '')?.id || prevIncidents[prevIncidents.length - 1].id
        : null;
      
      if (activeIncidentId) {
        return prevIncidents.map(incident => 
          incident.id === activeIncidentId ? 
            { ...incident, person: fullName } : incident
        );
      }
      return prevIncidents;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    setIsGuardianDialogOpen(true);
  }, []);

  return (
    <>
      <IncidentForm
        incidents={incidents}
        incidentDescription={incidentDescription}
        setIncidentDescription={setIncidentDescription}
        location={location}
        setLocation={setLocation}
        date={date}
        setDate={setDate}
        locationOptions={locationOptions}
        childrenNames={childrenNames}
        addIncident={addIncident}
        updateIncident={updateIncident}
        removeIncident={removeIncident}
        duplicateIncident={duplicateIncident}
        swapRoles={swapRoles}
        onOpenAddPersonDialog={() => setIsAddPersonDialogOpen(true)}
        onSubmit={handleSubmit}
      />

      <ModalsContainer
        people={incidents.map(i => [i.person, i.perpetrator]).flat().filter(p => p && p.length > 0).filter((v, i, a) => a.indexOf(v) === i)}
        childrenNames={childrenNames}
        setChildrenNames={setChildrenNames}
        onPersonAdded={handlePersonAdded}
        onSubmitForm={submitForm}
      />
    </>
  );
};

export default Index;
