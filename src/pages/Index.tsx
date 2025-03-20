
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, Trash2, Copy, RotateCw, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [isAddPersonSheetOpen, setIsAddPersonSheetOpen] = useState(false);
  const [newPersonName, setNewPersonName] = useState('');
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
      setIsAddPersonSheetOpen(false);
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Vad var det som hände?</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              id="vad-hande" 
              value={incidentDescription}
              onChange={(e) => setIncidentDescription(e.target.value)}
              placeholder="T.ex. "Under rasten på skolgården började Alex Johansson och Liam Eriksson bråka…""
              className="min-h-[250px]"
            />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">På vilken plats hände det?</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Vilken dag hände det?</CardTitle>
            </CardHeader>
            <CardContent>
              <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Finns det t.ex. foton eller film från händelsen?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Klicka för att ladda upp</span> eller dra och släpp
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Vem utsattes för/drabbades av vad?</CardTitle>
            <Button onClick={addIncident} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Lägg till ny
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
                onAddPerson={() => setIsAddPersonSheetOpen(true)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

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

      {/* Add Person Sheet */}
      <Sheet open={isAddPersonSheetOpen} onOpenChange={setIsAddPersonSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Lägg till ny person</SheetTitle>
            <SheetDescription>
              Fyll i namn på den nya personen som ska läggas till i listan.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Namn</Label>
              <Input 
                id="name" 
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="För- och efternamn"
              />
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddPersonSheetOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={handleAddPerson}>Lägg till</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
