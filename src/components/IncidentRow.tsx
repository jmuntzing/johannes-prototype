
import { useState, useEffect, useRef } from 'react';
import { isUtsattesFor, getIncidentDisplay } from '@/utils/incidentUtils';
import PersonSelect from '@/components/incidents/PersonSelect';
import IncidentTypeSelect from '@/components/incidents/IncidentTypeSelect';
import RowActions from '@/components/incidents/RowActions';

interface IncidentRowProps {
  incident: {
    id: number;
    person: string;
    incident: string;
    perpetrator: string;
  };
  childrenNames: string[];
  onUpdate: (field: string, value: string) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onSwap: () => void;
  onAddPerson: () => void;
  autoFocus?: boolean;
}

const IncidentRow = ({
  incident,
  childrenNames,
  onUpdate,
  onRemove,
  onDuplicate,
  onSwap,
  onAddPerson,
  autoFocus = false
}: IncidentRowProps) => {
  const [showPerpetrator, setShowPerpetrator] = useState(false);
  const personSelectRef = useRef<HTMLButtonElement>(null);

  // Check if the incident requires a perpetrator when the component mounts or when incident changes
  useEffect(() => {
    const requiresPerpetrator = isUtsattesFor(incident.incident);
    setShowPerpetrator(requiresPerpetrator);
  }, [incident.incident]);

  // Set focus to the first field on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && personSelectRef.current) {
      personSelectRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="p-3 bg-gray-50 rounded-lg flex flex-wrap md:flex-nowrap items-center gap-3">
      <div className="w-full md:w-auto">
        <PersonSelect
          value={incident.person}
          onChange={(value) => onUpdate("person", value)}
          childrenNames={childrenNames}
          onAddPerson={onAddPerson}
          ref={personSelectRef}
        />
      </div>

      <div className="w-full md:w-auto">
        <IncidentTypeSelect
          value={incident.incident}
          onChange={(value) => onUpdate("incident", value)}
        />
      </div>

      {showPerpetrator && (
        <>
          <div className="flex items-center">
            <span className="mx-2">av</span>
          </div>

          <div className="w-full md:w-auto">
            <PersonSelect
              value={incident.perpetrator}
              onChange={(value) => onUpdate("perpetrator", value)}
              childrenNames={childrenNames}
              onAddPerson={onAddPerson}
            />
          </div>
        </>
      )}

      <RowActions
        showSwap={showPerpetrator && !!incident.perpetrator}
        onSwap={onSwap}
        onDuplicate={onDuplicate}
        onRemove={onRemove}
      />
    </div>
  );
};

export default IncidentRow;
