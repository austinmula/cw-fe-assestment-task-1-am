import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchInput } from "./SearchInput";
import { memo, useCallback } from "react";

export const Header = memo(function Header() {
  const handleHeaderSearch = useCallback((search: string) => {
    console.log("Header search:", search);
    // Implement header search logic here
  }, []);

  return (
    <header 
      className="flex items-center justify-between px-6 py-4 bg-[#121417] border-b border-gray-800"
      role="banner"
      aria-label="Main header"
    >
      <div className="flex items-center gap-2">
        <img 
          src="/task1/logo.png" 
          alt="Wortionary Logo" 
          className="md:w-4 md:h-4 h-3 w-3"
          role="img"
          loading="eager"
          decoding="async"
        />
        <div className="text-white font-semibold md:text-lg text-sm">Wortionary</div>
      </div>

      <nav className="flex items-center gap-4" role="navigation" aria-label="User navigation">
        <SearchInput
          onSearch={handleHeaderSearch}
          placeholder="Search"
          size="sm"
          variant="compact"
          showButton={false}
          className="w-60 max-md:w-44"
          debounceMs={500}
          ariaLabel="Search dictionary"
        />
        <Avatar 
          style={{ width: "32px", height: "32px" }}
          role="button"
          tabIndex={0}
          aria-label="User profile menu"
        >
          <AvatarImage src="/avatar.jpg" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
});
