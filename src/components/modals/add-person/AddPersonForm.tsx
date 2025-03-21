
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GenderOption {
  value: string;
  label: string;
}

interface ClassOption {
  value: string;
  label: string;
}

interface AddPersonFormProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  personalNumber: string;
  setPersonalNumber: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  classGroup: string;
  setClassGroup: (value: string) => void;
  genderOptions: GenderOption[];
  classOptions: ClassOption[];
  firstNameInputRef: React.RefObject<HTMLInputElement>;
}

const AddPersonForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  personalNumber,
  setPersonalNumber,
  gender,
  setGender,
  classGroup,
  setClassGroup,
  genderOptions,
  classOptions,
  firstNameInputRef
}: AddPersonFormProps) => {
  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="firstname" className="text-base">Förnamn</Label>
          <Input 
            id="firstname" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Förnamn"
            ref={firstNameInputRef}
            className="text-base"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastname" className="text-base">Efternamn</Label>
          <Input 
            id="lastname" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Efternamn"
            className="text-base"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="personalnumber" className="text-base">Personnummer</Label>
          <Input 
            id="personalnumber" 
            value={personalNumber}
            onChange={(e) => setPersonalNumber(e.target.value)}
            placeholder="Personnummer"
            className="text-base"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-base">Kön</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender" className="text-base">
              <SelectValue placeholder="Ange kön..." />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white z-50">
              {genderOptions.map(option => (
                <SelectItem key={option.value} value={option.value} className="text-base">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2 mb-8">
        <Label htmlFor="class" className="text-base">Klass/grupp</Label>
        <Select value={classGroup} onValueChange={setClassGroup}>
          <SelectTrigger id="class" className="text-base">
            <SelectValue placeholder="Ange klass/grupp..." />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-white z-50">
            {classOptions.map(option => (
              <SelectItem key={option.value} value={option.value} className="text-base">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AddPersonForm;
