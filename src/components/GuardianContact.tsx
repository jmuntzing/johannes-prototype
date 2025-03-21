
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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

  // Simplified select options without icons
  const selectOptions = [
    { value: "ja", label: "Ja" },
    { value: "nej", label: "Nej" },
    { value: "ingen kontakt krävs", label: "Ingen kontakt krävs" }
  ];

  return (
    <div className="my-4 rounded-md p-6 bg-gray-50">
      {uniquePeople.length === 0 ? (
        <div className="text-center text-muted-foreground py-4">
          Ingen person har valts ännu. Lägg till personer i incidentlistan först.
        </div>
      ) : (
        <div className="space-y-1">
          <div className="grid grid-cols-[0.8fr,1.2fr,2fr] gap-4 mb-1">
            <div className="text-sm font-medium">Elev</div>
            <div className="text-sm font-medium">Vårdnadshavare informerad?</div>
            <div className="text-sm font-medium">Kommentar</div>
          </div>
          <Separator className="mb-2" />
          {uniquePeople.map(person => (
            <div key={person} className="grid grid-cols-[0.8fr,1.2fr,2fr] gap-4 items-center mb-4">
              <div className="font-medium">
                {person}
              </div>
              <div>
                <Select 
                  value={contactInfo[person]?.contacted || ''} 
                  onValueChange={(value) => updateContactInfo(person, 'contacted', value)}
                >
                  <SelectTrigger className="w-full h-10 border-gray-500">
                    <SelectValue placeholder="Välj..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {selectOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
                  className="h-10 py-2 min-h-0 resize-none overflow-hidden border-gray-500"
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
