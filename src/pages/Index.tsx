
import { useCallback, useState } from 'react';
import { useIncidentForm } from '@/hooks/useIncidentForm';
import IncidentForm from '@/components/forms/IncidentForm';
import { ModalsContainer } from '@/components/containers/ModalsContainer';

const Index = () => {
  const {
    incidents,
    setIncidents,
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

  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false);
  const [isGuardianDialogOpen, setIsGuardianDialogOpen] = useState(false);

  // Function to handle adding a person with updating an incident
  const handlePersonAdded = useCallback((fullName: string) => {
    console.log("Person added:", fullName);
    
    // Find the first incident with an empty person field
    const emptyIncidentIndex = incidents.findIndex(inc => inc.person === '');
    
    if (emptyIncidentIndex !== -1) {
      // Update that incident
      const updatedIncidents = [...incidents];
      updatedIncidents[emptyIncidentIndex] = {
        ...updatedIncidents[emptyIncidentIndex],
        person: fullName
      };
      setIncidents(updatedIncidents);
    }
    
    // Close the dialog
    setIsAddPersonDialogOpen(false);
  }, [incidents, setIncidents]);

  const handleSubmit = useCallback(() => {
    console.log("Submit button clicked, opening guardian dialog");
    // Instead of directly submitting the form, open the guardian dialog
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
        onOpenAddPersonDialog={() => {
          console.log("Opening add person dialog");
          setIsAddPersonDialogOpen(true);
        }}
        onSubmit={handleSubmit}
      />

      <ModalsContainer
        people={incidents.map(i => [i.person, i.perpetrator]).flat().filter(p => p && p.length > 0).filter((v, i, a) => a.indexOf(v) === i)}
        childrenNames={childrenNames}
        setChildrenNames={setChildrenNames}
        onPersonAdded={handlePersonAdded}
        onSubmitForm={submitForm}
        isAddPersonDialogOpen={isAddPersonDialogOpen}
        setIsAddPersonDialogOpen={setIsAddPersonDialogOpen}
        isGuardianDialogOpen={isGuardianDialogOpen}
        setIsGuardianDialogOpen={setIsGuardianDialogOpen}
      />
    </>
  );
};

export default Index;
