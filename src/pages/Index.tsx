
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Upload, UserRoundPlus, X } from "lucide-react";
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
    <div className="container mx-auto py-14 px-4 max-w-6xl">
      <h1 className="text-3xl font-medium mb-8">Rapportera incident</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-8">
        <div className="md:col-span-3">
          <h3 className="text-xl font-semibold mb-4">Vad var det som hände?</h3>
          <Textarea 
            id="vad-hande" 
            value={incidentDescription}
            onChange={(e) => setIncidentDescription(e.target.value)}
            placeholder='T.ex. "Under rasten på skolgården började Alex Johansson och Liam Eriksson bråka..."'
            className="min-h-[250px]"
          />
        </div>

        <div className="md:col-span-2 space-y-10">
          <div>
            <h3 className="text-xl font-semibold mb-4">På vilken plats hände det?</h3>
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
            <h3 className="text-xl font-semibold mb-4">Vilken dag hände det?</h3>
            <Input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Finns det t.ex. foton eller film från händelsen?</h3>
            <label htmlFor="dropzone-file" className="flex flex-row items-center justify-center w-full h-10 border border-dashed rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
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
        <div className="space-y-1">
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
        <DialogContent className="sm:max-w-[600px] bg-[#F1F0FB]">
          <div className="absolute right-4 top-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsAddPersonDialogOpen(false)}
              className="h-6 w-6 rounded-full p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Stäng</span>
            </Button>
          </div>
          
          <div className="py-4">
            <h2 className="text-3xl font-bold mb-6 text-[#403E43]">Lägg till elev</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="firstname" className="text-[#403E43] text-base">Förnamn</Label>
                <Input 
                  id="firstname" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Förnamn"
                  className="bg-white border-[#9b87f5] focus-visible:ring-[#9b87f5]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastname" className="text-[#403E43] text-base">Efternamn</Label>
                <Input 
                  id="lastname" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Efternamn"
                  className="bg-white border-[#9b87f5] focus-visible:ring-[#9b87f5]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="personalnumber" className="text-[#403E43] text-base">Personnummer</Label>
                <Input 
                  id="personalnumber" 
                  value={personalNumber}
                  onChange={(e) => setPersonalNumber(e.target.value)}
                  placeholder="Personnummer"
                  className="bg-white border-[#9b87f5] focus-visible:ring-[#9b87f5]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-[#403E43] text-base">Kön</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender" className="bg-white border-[#9b87f5] focus-visible:ring-[#9b87f5]">
                    <SelectValue placeholder="Ange kön..." />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              <Label htmlFor="class" className="text-[#403E43] text-base">Klass/grupp</Label>
              <Select value={classGroup} onValueChange={setClassGroup}>
                <SelectTrigger id="class" className="bg-white border-[#9b87f5] focus-visible:ring-[#9b87f5]">
                  <SelectValue placeholder="Ange klass/grupp..." />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsAddPersonDialogOpen(false)} className="min-w-[120px]">
                Avbryt
              </Button>
              <Button onClick={handleAddPerson} className="min-w-[120px] bg-[#9b87f5] hover:bg-[#7b67d5]">
                Lägg till
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
