import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchInput } from "./SearchInput";

export function Header() {
  const handleHeaderSearch = (search: string) => {
    console.log("Header search:", search);
    // Implement header search logic here
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800">
      <div className="flex items-center gap-2">
        <img src="/task1/logo.png" alt="Wortionary Logo" className="md:w-4 md:h-4 h-3 w-3" />
        <div className="text-white font-semibold md:text-lg text-sm">Wortionary</div>
      </div>

      <div className="flex items-center gap-4">
        <SearchInput
          onSearch={handleHeaderSearch}
          placeholder="Search..."
          size="sm"
          variant="compact"
          showButton={false}
          className="w-64"
          debounceMs={500}
        />
        <Avatar style={{ width: "32px", height: "32px" }}>
          <AvatarImage src="/avatar.jpg" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
