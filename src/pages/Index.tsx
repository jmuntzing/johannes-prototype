import { useState } from 'react';
import { useIncidentForm } from '@/hooks/useIncidentForm';
import IncidentForm from '@/components/forms/IncidentForm';
import { ModalsContainer } from '@/components/containers/ModalsContainer';

const Index = () => {
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false);
  const {
    incidents,
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

  const handleAddPerson = (name: string) => {
    console.log("Person added:", name);
  };

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
        onSubmit={submitForm}
      />
      
      <ModalsContainer
        people={incidents.map(i => i.person).filter(Boolean)}
        childrenNames={childrenNames}
        setChildrenNames={setChildrenNames}
        onPersonAdded={handleAddPerson}
        onSubmitForm={() => {}}
        isAddPersonDialogOpen={isAddPersonDialogOpen}
        setIsAddPersonDialogOpen={setIsAddPersonDialogOpen}
      />
    </>
  );
};

export default Index;
