import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchInputProps {
  initialValue: string;
  onSearch: (search: string) => void;
}

export function SearchInput({
  initialValue,
  onSearch,
}: SearchInputProps) {
  const [innerValue, setInnerValue] = useState(initialValue);

  useEffect(() => {
    onSearch(innerValue);
  }, [innerValue, onSearch]);

  useEffect(() => {
    setInnerValue(initialValue);
  }, [initialValue]);

  return (
    <div className="flex items-center bg-black px-4 py-2 rounded-full w-full max-w-xl mt-6 shadow-lg">
      <Search className="text-gray-400 mr-3" />
      <Input
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
        type="text"
        placeholder="Type to search..."
        className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0"
      />
      <Button className="bg-blue-600 hover:bg-blue-700 text-white ml-4">
        Search
      </Button>
    </div>
  );
}
