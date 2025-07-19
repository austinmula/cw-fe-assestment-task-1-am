import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800">
      <div className="flex items-center gap-2">
        <img src="/task1/logo.png" alt="Wortionary Logo" className="w-10 h-10" />
        <div className="text-white font-semibold text-lg">Wortionary</div>
      </div>

      <div className="flex items-center gap-4">
        <div style={{ position: "relative" }}>
          <span>
            <span>
              <span className="absolute left-3 top-2.5">
                <Search className="text-gray-400 text-sm" />
              </span>
            </span>
          </span>
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 bg-gray-800 text-white border-none focus:ring-0 rounded-full"
          />
        </div>
        <Avatar style={{ width: "32px", height: "32px" }}>
          <AvatarImage src="/avatar.jpg" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
