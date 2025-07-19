import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchInputProps {
  initialValue?: string;
  onSearch: (search: string) => void;
  placeholder?: string;
  buttonText?: string;
  showButton?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "compact";
  disabled?: boolean;
  className?: string;
  debounceMs?: number;
}

export function SearchInput({
  initialValue = "",
  onSearch,
  placeholder = "Type to search...",
  buttonText = "Search",
  showButton = true,
  size = "md",
  variant = "default",
  disabled = false,
  className = "",
  debounceMs = 300
}: SearchInputProps) {
  const [innerValue, setInnerValue] = useState(initialValue);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(innerValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [innerValue, onSearch, debounceMs]);

  useEffect(() => {
    setInnerValue(initialValue);
  }, [initialValue]);

  const handleSearchClick = () => {
    onSearch(innerValue);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          container: "px-3 py-1.5 max-w-md",
          icon: "mr-2 h-4 w-4",
          button: "ml-2 px-3 py-1 text-sm"
        };
      case "lg":
        return {
          container: "px-6 py-3 max-w-2xl",
          icon: "mr-4 h-6 w-6",
          button: "ml-6 px-6 py-3 text-lg"
        };
      default:
        return {
          container: "px-4 py-2 max-w-xl",
          icon: "mr-3 h-5 w-5",
          button: "ml-4 px-4 py-2"
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const containerClass = variant === "compact" 
    ? `flex items-center bg-gray-800 rounded-md w-full ${sizeClasses.container} ${className}`
    : `flex items-center bg-black rounded-md w-full mt-6 shadow-lg ${sizeClasses.container} ${className}`;

  return (
    <div className={containerClass}>
      <Search className={`text-gray-400 ${sizeClasses.icon}`} />
      <Input
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none"
      />
      {showButton && (
        <Button 
          onClick={handleSearchClick}
          disabled={disabled}
          className={`bg-blue-600 hover:bg-blue-700 text-white ${sizeClasses.button} transition-colors duration-200`}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
