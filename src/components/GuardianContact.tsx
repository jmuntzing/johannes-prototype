
import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const uniquePeople = people.slice(0, 5);

  return (
    <div className="space-y-4 my-4">
      {uniquePeople.length === 0 ? (
        <div className="text-center text-muted-foreground py-4">
          Ingen person har valts ännu. Lägg till personer i incidentlistan först.
        </div>
      ) : (
        uniquePeople.map(person => (
          <div key={person} className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-4 p-3 border rounded">
            <div className="font-medium flex items-center">
              {person}
            </div>
            <div className="space-y-3">
              <div>
                <Select 
                  value={contactInfo[person]?.contacted || ''} 
                  onValueChange={(value) => updateContactInfo(person, 'contacted', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ja">Ja, vårdnadshavare har kontaktats</SelectItem>
                    <SelectItem value="nej">Nej, vårdnadshavare har inte kontaktats</SelectItem>
                    <SelectItem value="ingen kontakt krävs">Ingen kontakt krävs</SelectItem>
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
          </div>
        ))
      )}
    </div>
  );
};

export default GuardianContact;
