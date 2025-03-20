
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GenderOption {
  value: string;
  label: string;
}

interface ClassOption {
  value: string;
  label: string;
}

interface AddPersonModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPerson: () => void;
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
}

const AddPersonModal = ({
  isOpen,
  onOpenChange,
  onAddPerson,
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
  classOptions
}: AddPersonModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#F1F0FB]">
        <div className="absolute right-4 top-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)}
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
            <Button variant="outline" onClick={() => onOpenChange(false)} className="min-w-[120px]">
              Avbryt
            </Button>
            <Button onClick={onAddPerson} className="min-w-[120px] bg-[#9b87f5] hover:bg-[#7b67d5]">
              Lägg till
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPersonModal;
