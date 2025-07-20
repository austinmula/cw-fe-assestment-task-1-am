import { useState, useEffect, useId, memo, useCallback, useMemo } from "react";
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
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const SearchInput = memo(function SearchInput({
  initialValue = "",
  onSearch,
  placeholder = "Type to search...",
  buttonText = "Search",
  showButton = true,
  size = "md",
  variant = "default",
  disabled = false,
  className = "",
  debounceMs = 300,
  ariaLabel = "Search input",
  ariaDescribedBy
}: SearchInputProps) {
  const [innerValue, setInnerValue] = useState(initialValue);
  const inputId = useId();
  const buttonId = useId();

  // Memoize debounced search to prevent unnecessary recreations
  const debouncedSearch = useCallback(() => {
    onSearch(innerValue);
  }, [onSearch, innerValue]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(debouncedSearch, debounceMs);
    return () => clearTimeout(timer);
  }, [debouncedSearch, debounceMs]);

  useEffect(() => {
    setInnerValue(initialValue);
  }, [initialValue]);

  const handleSearchClick = useCallback(() => {
    onSearch(innerValue);
  }, [onSearch, innerValue]);

  // Memoize size classes to prevent recalculation on every render
  const sizeClasses = useMemo(() => {
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
  }, [size]);

  // Memoize container class to prevent string concatenation on every render
  const containerClass = useMemo(() => {
    return variant === "compact" 
      ? `flex items-center bg-gray-800 rounded-md w-full ${sizeClasses.container} ${className}`
      : `flex items-center bg-black rounded-md w-full mt-6 shadow-lg ${sizeClasses.container} ${className}`;
  }, [variant, sizeClasses.container, className]);

  return (
    <div 
      className={containerClass}
      role="search"
      aria-label="Search form"
    >
      <Search 
        className={`text-gray-400 ${sizeClasses.icon}`} 
        aria-hidden="true"
      />
      <Input
        id={inputId}
        value={innerValue}
        onChange={(e) => setInnerValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearchClick();
          }
        }}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        autoComplete="off"
        className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {showButton && (
        <Button 
          id={buttonId}
          onClick={handleSearchClick}
          disabled={disabled}
          type="button"
          aria-label={`${buttonText} for "${innerValue || placeholder}"`}
          className={`bg-[#1980e5] hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black text-white ${sizeClasses.button} transition-colors duration-200`}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
});
