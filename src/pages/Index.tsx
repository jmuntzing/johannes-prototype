
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import IncidentDescription from '@/components/forms/IncidentDescription';
import IncidentDetails from '@/components/forms/IncidentDetails';
import IncidentsList from '@/components/incidents/IncidentsList';
import GuardianContactModal from '@/components/modals/GuardianContactModal';
import AddPersonModal from '@/components/modals/AddPersonModal';

const Index = () => {
  const [incidents, setIncidents] = useState<any[]>([{ id: Date.now(), person: '', incident: '', perpetrator: '' }]);
  const [incidentDescription, setIncidentDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [isGuardianDialogOpen, setIsGuardianDialogOpen] = useState(false);
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personalNumber, setPersonalNumber] = useState('');
  const [gender, setGender] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [childrenNames, setChildrenNames] = useState([
    "Alice Aronsson", "Axel Andersson", "Alva Lindgren", "Beata Berg",
    "Bertil Bäck", "Cecilia Carlsson", "Daniel Dahl", "Elsa Eriksson",
    "Frida Fors", "Gustav Grön", "Hugo Wallin", "Ida Isaksson",
    "Johan Johansson", "Karin Karlsson", "Lars Larsson",
    "Maja Martin", "Nils Nilsson", "Olivia Olsson",
    "Per Persson", "Sara Svensson"
  ]);

  const locationOptions = [
    { value: "aulan", label: "Aulan" },
    { value: "fotbollsplanen", label: "Fotbollsplanen" },
    { value: "gymnastiksalen", label: "Gymnastiksalen" },
    { value: "lektionssal", label: "Lektionssal" },
    { value: "matsalen", label: "Matsalen" },
    { value: "skolgarden", label: "Skolgården" },
    { value: "slojdsalen", label: "Slöjdsalen" },
    { value: "uppehallsrum", label: "Uppehållsrum" }
  ];

  const genderOptions = [
    { value: "flicka", label: "Flicka" },
    { value: "pojke", label: "Pojke" },
    { value: "annat", label: "Annat" },
    { value: "vill_ej_ange", label: "Vill ej ange" }
  ];

  const classOptions = [
    { value: "1A", label: "1A" },
    { value: "1B", label: "1B" },
    { value: "2A", label: "2A" },
    { value: "2B", label: "2B" },
    { value: "3A", label: "3A" },
    { value: "3B", label: "3B" },
    { value: "4A", label: "4A" },
    { value: "4B", label: "4B" },
    { value: "5A", label: "5A" },
    { value: "5B", label: "5B" },
    { value: "6A", label: "6A" },
    { value: "6B", label: "6B" },
    { value: "7A", label: "7A" },
    { value: "7B", label: "7B" },
    { value: "8A", label: "8A" },
    { value: "8B", label: "8B" },
    { value: "9A", label: "9A" },
    { value: "9B", label: "9B" }
  ];

  const addIncident = () => {
    setIncidents([...incidents, { id: Date.now(), person: '', incident: '', perpetrator: '' }]);
  };

  const updateIncident = (id: number, field: string, value: string) => {
    setIncidents(incidents.map(incident => 
      incident.id === id ? { ...incident, [field]: value } : incident
    ));
  };

  const removeIncident = (id: number) => {
    setIncidents(incidents.filter(incident => incident.id !== id));
  };

  const duplicateIncident = (id: number) => {
    const incidentToDuplicate = incidents.find(incident => incident.id === id);
    if (incidentToDuplicate) {
      setIncidents([
        ...incidents, 
        { ...incidentToDuplicate, id: Date.now() }
      ]);
    }
  };

  const swapRoles = (id: number) => {
    setIncidents(incidents.map(incident => {
      if (incident.id === id) {
        return {
          ...incident,
          person: incident.perpetrator,
          perpetrator: incident.person
        };
      }
      return incident;
    }));
  };

  const handleSubmit = () => {
    setIsGuardianDialogOpen(true);
  };

  const submitForm = () => {
    toast({
      title: "Anmälan har skickats in!",
      description: "Din incidentrapport har registrerats.",
    });
    setIsGuardianDialogOpen(false);
  };

  const handleAddPerson = () => {
    if (firstName.trim() && lastName.trim()) {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      setChildrenNames([...childrenNames, fullName]);
      resetNewPersonForm();
      setIsAddPersonDialogOpen(false);
      toast({
        title: "Person tillagd",
        description: `${fullName} har lagts till i listan.`,
      });
    }
  };

  const resetNewPersonForm = () => {
    setFirstName('');
    setLastName('');
    setPersonalNumber('');
    setGender('');
    setClassGroup('');
  };

  return (
    <div className="container mx-auto py-20 px-4 max-w-6xl">
      <h1 className="text-3xl font-medium mb-8">Rapportera incident</h1>
      
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
        onAddPerson={() => setIsAddPersonDialogOpen(true)}
      />

      <div className="flex justify-end mt-8">
        <Button onClick={handleSubmit} size="lg">
          Skicka in
        </Button>
      </div>

      {/* Guardian Contact Modal */}
      <GuardianContactModal
        isOpen={isGuardianDialogOpen}
        onOpenChange={setIsGuardianDialogOpen}
        people={incidents
          .map(i => [i.person, i.perpetrator])
          .flat()
          .filter(p => p && p.length > 0)
          .filter((v, i, a) => a.indexOf(v) === i)}
        onSubmit={submitForm}
      />

      {/* Add Person Modal */}
      <AddPersonModal
        isOpen={isAddPersonDialogOpen}
        onOpenChange={setIsAddPersonDialogOpen}
        onAddPerson={handleAddPerson}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        personalNumber={personalNumber}
        setPersonalNumber={setPersonalNumber}
        gender={gender}
        setGender={setGender}
        classGroup={classGroup}
        setClassGroup={setClassGroup}
        genderOptions={genderOptions}
        classOptions={classOptions}
      />
    </div>
  );
};

export default Index;
