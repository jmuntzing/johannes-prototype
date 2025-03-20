
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import IncidentRow from "@/components/IncidentRow";

interface Incident {
  id: number;
  person: string;
  incident: string;
  perpetrator: string;
}

interface IncidentsListProps {
  incidents: Incident[];
  childrenNames: string[];
  addIncident: () => void;
  updateIncident: (id: number, field: string, value: string) => void;
  removeIncident: (id: number) => void;
  duplicateIncident: (id: number) => void;
  swapRoles: (id: number) => void;
  onAddPerson: () => void;
}

const IncidentsList = ({
  incidents,
  childrenNames,
  addIncident,
  updateIncident,
  removeIncident,
  duplicateIncident,
  swapRoles,
  onAddPerson
}: IncidentsListProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Vem utsattes för/drabbades av vad?</h3>
        <Button onClick={addIncident} variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" /> Lägg till ny
        </Button>
      </div>
      <div className="space-y-0.5">
        {incidents.map((incident) => (
          <IncidentRow
            key={incident.id}
            incident={incident}
            childrenNames={childrenNames}
            onUpdate={(field, value) => updateIncident(incident.id, field, value)}
            onRemove={() => removeIncident(incident.id)}
            onDuplicate={() => duplicateIncident(incident.id)}
            onSwap={() => swapRoles(incident.id)}
            onAddPerson={onAddPerson}
          />
        ))}
      </div>
    </div>
  );
};

export default IncidentsList;
