
import { useState, useCallback, useMemo } from 'react';
import { toast } from "@/hooks/use-toast";

// Define a type for incidents to improve type safety
export interface Incident {
  id: number;
  person: string;
  incident: string;
  perpetrator: string;
}

export interface IncidentFormState {
  incidents: Incident[];
  incidentDescription: string;
  location: string;
  date: string;
  childrenNames: string[];
}

export const useIncidentForm = () => {
  const [incidents, setIncidents] = useState<Incident[]>([{
    id: Date.now(),
    person: '',
    incident: '',
    perpetrator: ''
  }]);
  const [incidentDescription, setIncidentDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [childrenNames, setChildrenNames] = useState([
    "Alice Aronsson", "Axel Andersson", "Alva Lindgren", "Beata Berg", 
    "Bertil Bäck", "Cecilia Carlsson", "Daniel Dahl", "Elsa Eriksson", 
    "Frida Fors", "Gustav Grön", "Hugo Wallin", "Ida Isaksson", 
    "Johan Johansson", "Karin Karlsson", "Lars Larsson", "Maja Martin", 
    "Nils Nilsson", "Olivia Olsson", "Per Persson", "Sara Svensson"
  ]);

  // Memoize options to prevent unnecessary re-renders
  const locationOptions = useMemo(() => [
    { value: "aulan", label: "Aulan" },
    { value: "fotbollsplanen", label: "Fotbollsplanen" },
    { value: "gymnastiksalen", label: "Gymnastiksalen" },
    { value: "lektionssal", label: "Lektionssal" },
    { value: "matsalen", label: "Matsalen" },
    { value: "skolgarden", label: "Skolgården" },
    { value: "slojdsalen", label: "Slöjdsalen" },
    { value: "uppehallsrum", label: "Uppehållsrum" }
  ], []);

  const addIncident = useCallback(() => {
    setIncidents(prevIncidents => [...prevIncidents, {
      id: Date.now(),
      person: '',
      incident: '',
      perpetrator: ''
    }]);
  }, []);

  const updateIncident = useCallback((id: number, field: string, value: string) => {
    setIncidents(prevIncidents => prevIncidents.map(incident => 
      incident.id === id ? { ...incident, [field]: value } : incident
    ));
  }, []);

  const removeIncident = useCallback((id: number) => {
    setIncidents(prevIncidents => prevIncidents.filter(incident => incident.id !== id));
  }, []);

  const duplicateIncident = useCallback((id: number) => {
    setIncidents(prevIncidents => {
      const incidentToDuplicate = prevIncidents.find(incident => incident.id === id);
      if (incidentToDuplicate) {
        return [...prevIncidents, { ...incidentToDuplicate, id: Date.now() }];
      }
      return prevIncidents;
    });
  }, []);

  const swapRoles = useCallback((id: number) => {
    setIncidents(prevIncidents => prevIncidents.map(incident => {
      if (incident.id === id) {
        return {
          ...incident,
          person: incident.perpetrator,
          perpetrator: incident.person
        };
      }
      return incident;
    }));
  }, []);

  const submitForm = useCallback(() => {
    toast({
      title: "Anmälan har skickats in!",
      description: "Din incidentrapport har registrerats."
    });
  }, []);

  return {
    incidents,
    setIncidents, // Export setIncidents so it can be used in the Index component
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
  };
};
