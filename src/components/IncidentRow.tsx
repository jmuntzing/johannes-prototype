
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, Copy, RotateCw } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

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
}

const IncidentRow = ({
  incident,
  childrenNames,
  onUpdate,
  onRemove,
  onDuplicate,
  onSwap,
  onAddPerson
}: IncidentRowProps) => {
  const [showPerpetrator, setShowPerpetrator] = useState(false);

  // Check if the incident requires a perpetrator when the component mounts or when incident changes
  useEffect(() => {
    const requiresPerpetrator = isUtsattesFor(incident.incident);
    setShowPerpetrator(requiresPerpetrator);
  }, [incident.incident]);

  const isUtsattesFor = (value: string) => {
    const utsattesForIncidents = [
      'digitala trakasserier', 'elaka kommentarer', 'fysiska hot', 'förolämpningar',
      'förlöjliganden', 'knuffar', 'nedsättande ord', 'psykosocial utfrysning',
      'rasistiska uttryck', 'ryktesspridning', 'slag', 'sparkar',
      'spridning av kränkande material', 'social exkludering', 'verbala hot'
    ];
    return utsattesForIncidents.includes(value);
  };

  const getIncidentDisplay = (value: string) => {
    if (!value) return '';
    
    if (isUtsattesFor(value)) {
      return `utsattes för ${value}`;
    } else {
      return `drabbades av ${value}`;
    }
  };

  return (
    <div className="p-3 bg-gray-50 rounded-lg flex flex-wrap md:flex-nowrap items-center gap-3">
      <div className="w-full md:w-auto">
        <Select 
          value={incident.person} 
          onValueChange={(value) => {
            if (value === "addNewPerson") {
              onAddPerson();
            } else {
              onUpdate("person", value);
            }
          }}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Välj person..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Personer</SelectLabel>
              {childrenNames.map(name => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
              <SelectItem value="addNewPerson">+ Lägg till ny person</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-auto flex-1">
        <Select 
          value={incident.incident} 
          onValueChange={(value) => onUpdate("incident", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="utsattes för/drabbades av..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>utsattes för...</SelectLabel>
              <SelectItem value="digitala trakasserier">digitala trakasserier</SelectItem>
              <SelectItem value="elaka kommentarer">elaka kommentarer</SelectItem>
              <SelectItem value="fysiska hot">fysiska hot</SelectItem>
              <SelectItem value="förolämpningar">förolämpningar</SelectItem>
              <SelectItem value="förlöjliganden">förlöjliganden</SelectItem>
              <SelectItem value="knuffar">knuffar</SelectItem>
              <SelectItem value="nedsättande ord">nedsättande ord</SelectItem>
              <SelectItem value="psykosocial utfrysning">psykosocial utfrysning</SelectItem>
              <SelectItem value="rasistiska uttryck">rasistiska uttryck</SelectItem>
              <SelectItem value="ryktesspridning">ryktesspridning</SelectItem>
              <SelectItem value="slag">slag</SelectItem>
              <SelectItem value="sparkar">sparkar</SelectItem>
              <SelectItem value="spridning av kränkande material">spridning av kränkande material</SelectItem>
              <SelectItem value="social exkludering">social exkludering</SelectItem>
              <SelectItem value="verbala hot">verbala hot</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>drabbades av...</SelectLabel>
              <SelectItem value="allergisk reaktion">allergisk reaktion</SelectItem>
              <SelectItem value="blåmärken">blåmärken</SelectItem>
              <SelectItem value="brännskada">brännskada</SelectItem>
              <SelectItem value="föremål i ögat">föremål i ögat</SelectItem>
              <SelectItem value="fästingbett">fästingbett</SelectItem>
              <SelectItem value="fraktur benbrott">fraktur (benbrott)</SelectItem>
              <SelectItem value="fysiska överbelastningsskador">fysiska överbelastningsskador</SelectItem>
              <SelectItem value="förstoring av stukning">förstoring av stukning</SelectItem>
              <SelectItem value="hjärnskakning">hjärnskakning</SelectItem>
              <SelectItem value="insektsbett">insektsbett</SelectItem>
              <SelectItem value="klämskada">klämskada</SelectItem>
              <SelectItem value="köldskada">köldskada</SelectItem>
              <SelectItem value="näsblod">näsblod</SelectItem>
              <SelectItem value="skärsår">skärsår</SelectItem>
              <SelectItem value="skrubbsår">skrubbsår</SelectItem>
              <SelectItem value="slagskada">slagskada</SelectItem>
              <SelectItem value="sticksår">sticksår</SelectItem>
              <SelectItem value="stukning">stukning</SelectItem>
              <SelectItem value="sträckning">sträckning</SelectItem>
              <SelectItem value="tandskada">tandskada</SelectItem>
              <SelectItem value="vridskada">vridskada</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {showPerpetrator && (
        <>
          <div className="flex items-center">
            <span className="mx-2">av</span>
          </div>

          <div className="w-full md:w-auto">
            <Select 
              value={incident.perpetrator} 
              onValueChange={(value) => {
                if (value === "addNewPerson") {
                  onAddPerson();
                } else {
                  onUpdate("perpetrator", value);
                }
              }}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Välj person..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Personer</SelectLabel>
                  {childrenNames.map(name => (
                    <SelectItem key={name} value={name}>{name}</SelectItem>
                  ))}
                  <SelectItem value="addNewPerson">+ Lägg till ny person</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div className="flex gap-2 ml-auto">
        {showPerpetrator && incident.perpetrator && (
          <Button 
            variant="outline" 
            size="icon"
            onClick={onSwap}
            title="Byt roller"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        )}
        <Button 
          variant="outline" 
          size="icon"
          onClick={onDuplicate}
          title="Skapa kopia"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onRemove}
          title="Ta bort"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default IncidentRow;
