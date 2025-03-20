
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LocationOption {
  value: string;
  label: string;
}

interface IncidentDetailsProps {
  location: string;
  setLocation: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  locationOptions: LocationOption[];
}

const IncidentDetails = ({
  location,
  setLocation,
  date,
  setDate,
  locationOptions
}: IncidentDetailsProps) => {
  return (
    <div className="md:col-span-2 space-y-7">
      <div>
        <h3 className="text-[19px] font-semibold mb-2">På vilken plats hände det?</h3>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full text-base">
            <SelectValue placeholder="Välj plats..." />
          </SelectTrigger>
          <SelectContent>
            {locationOptions.map(option => (
              <SelectItem key={option.value} value={option.value} className="text-base">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-[19px] font-semibold mb-2">Vilken dag hände det?</h3>
        <Input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full text-base calendar-right-align"
        />
      </div>

      <div>
        <h3 className="text-[19px] font-semibold mb-2">Finns det t.ex. foton eller film från händelsen?</h3>
        <label htmlFor="dropzone-file" className="flex flex-row items-center justify-start w-full h-10 border border-dashed rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
          <Upload className="h-4 w-4 ml-3 mr-2 text-gray-500 dark:text-gray-400" />
          <span className="text-base text-gray-500 dark:text-gray-400">Ladda upp filer</span>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default IncidentDetails;
