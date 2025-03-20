import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IncidentRow from "@/components/IncidentRow";
import GuardianContact from "@/components/GuardianContact";

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
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonEmail, setNewPersonEmail] = useState('');
  const [newPersonPhone, setNewPersonPhone] = useState('');
  const [newPersonClass, setNewPersonClass] = useState('');
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
    if (newPersonName.trim()) {
      setChildrenNames([...childrenNames, newPersonName.trim()]);
      setNewPersonName('');
      setNewPersonEmail('');
      setNewPersonPhone('');
      setNewPersonClass('');
      setIsAddPersonDialogOpen(false);
      toast({
        title: "Person tillagd",
        description: `${newPersonName.trim()} har lagts till i listan.`,
      });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <h1 className="text-3xl font-medium mb-8">Rapportera incident</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Vad var det som hände?</h3>
          <Textarea 
            id="vad-hande" 
            value={incidentDescription}
            onChange={(e) => setIncidentDescription(e.target.value)}
            placeholder='T.ex. "Under rasten på skolgården började Alex Johansson och Liam Eriksson bråka..."'
            className="min-h-[250px]"
          />
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold mb-2">På vilken plats hände det?</h3>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Välj plats..." />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Vilken dag hände det?</h3>
            <Input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Finns det t.ex. foton eller film från händelsen?</h3>
            <label htmlFor="dropzone-file" className="flex flex-row items-center justify-center w-full h-10 border border-dashed rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
              <Upload className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Ladda upp filer</span>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Vem utsattes för/drabbades av vad?</h3>
          <Button onClick={addIncident} variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Lägg till ny
          </Button>
        </div>
        <div className="space-y-3">
          {incidents.map((incident) => (
            <IncidentRow
              key={incident.id}
              incident={incident}
              childrenNames={childrenNames}
              onUpdate={(field, value) => updateIncident(incident.id, field, value)}
              onRemove={() => removeIncident(incident.id)}
              onDuplicate={() => duplicateIncident(incident.id)}
              onSwap={() => swapRoles(incident.id)}
              onAddPerson={() => setIsAddPersonDialogOpen(true)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleSubmit} size="lg">
          Skicka in
        </Button>
      </div>

      {/* Guardian Contact Dialog */}
      <Dialog open={isGuardianDialogOpen} onOpenChange={setIsGuardianDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Bara en sista fråga innan vi är klara</DialogTitle>
            <DialogDescription>
              Har vårdnadshavare till de inblandade eleverna kontaktats?
            </DialogDescription>
          </DialogHeader>
          <GuardianContact 
            people={incidents
              .map(i => [i.person, i.perpetrator])
              .flat()
              .filter(p => p && p.length > 0)
              .filter((v, i, a) => a.indexOf(v) === i)}
          />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsGuardianDialogOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={submitForm}>
              Skicka in anmälan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Person Dialog */}
      <Dialog open={isAddPersonDialogOpen} onOpenChange={setIsAddPersonDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Lägg till ny person</DialogTitle>
            <DialogDescription>
              Fyll i uppgifter om den nya personen som ska läggas till i listan.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Namn</Label>
              <Input 
                id="name" 
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="För- och efternamn"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input 
                id="email" 
                type="email"
                value={newPersonEmail}
                onChange={(e) => setNewPersonEmail(e.target.value)}
                placeholder="exempel@skola.se"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input 
                id="phone" 
                type="tel"
                value={newPersonPhone}
                onChange={(e) => setNewPersonPhone(e.target.value)}
                placeholder="07X-XXX XX XX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Klass</Label>
              <Input 
                id="class" 
                value={newPersonClass}
                onChange={(e) => setNewPersonClass(e.target.value)}
                placeholder="t.ex. 7B"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPersonDialogOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={handleAddPerson}>Lägg till</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
