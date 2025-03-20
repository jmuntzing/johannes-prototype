
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Circle } from "lucide-react";

interface GuardianContactProps {
  people: string[];
}

interface ContactInfo {
  contacted: string;
  comment: string;
}

const GuardianContact = ({ people }: GuardianContactProps) => {
  const [contactInfo, setContactInfo] = useState<Record<string, ContactInfo>>(
    people.reduce((acc, person) => {
      acc[person] = { contacted: '', comment: '' };
      return acc;
    }, {} as Record<string, ContactInfo>)
  );

  const updateContactInfo = (person: string, field: keyof ContactInfo, value: string) => {
    setContactInfo({
      ...contactInfo,
      [person]: {
        ...contactInfo[person],
        [field]: value
      }
    });
  };

  // Display at most 5 unique people, in case there are lots of duplicates in the incident list
  const uniquePeople = [...new Set(people)].slice(0, 5);

  // Custom select items with icons
  const selectOptions = [
    { value: "ja", label: "Vårdnadshavare informerad", icon: <Check className="mr-2 h-4 w-4" /> },
    { value: "nej", label: "Vårdnadshavare ej informerad", icon: <Circle className="mr-2 h-4 w-4" /> },
    { value: "ingen kontakt krävs", label: "Ingen kontakt krävs", icon: null }
  ];

  return (
    <div className="my-4 border rounded-md p-4 bg-white">
      {uniquePeople.length === 0 ? (
        <div className="text-center text-muted-foreground py-4">
          Ingen person har valts ännu. Lägg till personer i incidentlistan först.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr,1.5fr,1.5fr] gap-4 pb-2 font-medium">
            <div>Elev</div>
            <div>Vårdnadshavare informerad?</div>
            <div>Kommentar</div>
          </div>
          {uniquePeople.map(person => (
            <div key={person} className="grid grid-cols-[1fr,1.5fr,1.5fr] gap-4 items-center">
              <div className="font-medium">
                {person}
              </div>
              <div>
                <Select 
                  value={contactInfo[person]?.contacted || ''} 
                  onValueChange={(value) => updateContactInfo(person, 'contacted', value)}
                >
                  <SelectTrigger className="w-full">
                    {contactInfo[person]?.contacted ? (
                      <div className="flex items-center">
                        {contactInfo[person]?.contacted === "ja" && <Check className="mr-2 h-4 w-4" />}
                        {contactInfo[person]?.contacted === "nej" && <Circle className="mr-2 h-4 w-4" />}
                        {contactInfo[person]?.contacted === "ja" ? "Vårdnadshavare informerad" : 
                         contactInfo[person]?.contacted === "nej" ? "Vårdnadshavare ej informerad" : 
                         "Ingen kontakt krävs"}
                      </div>
                    ) : (
                      <SelectValue placeholder="Välj..." />
                    )}
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {selectOptions.map(option => (
                      <SelectItem key={option.value} value={option.value} className="flex items-center">
                        <div className="flex items-center">
                          {option.icon}
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Textarea 
                  placeholder="Kommentar..."
                  value={contactInfo[person]?.comment || ''}
                  onChange={(e) => updateContactInfo(person, 'comment', e.target.value)}
                  className="h-20"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuardianContact;
