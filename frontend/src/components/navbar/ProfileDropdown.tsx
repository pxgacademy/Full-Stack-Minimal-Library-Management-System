import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { Link } from "react-router";
import { navLinks } from "./navLinks";
import { useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/features/authSlice";
import { toast } from "sonner";

export function ProfileDropdown() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("library_user");
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full border border-gray-300 p-1.5 flex items-center justify-center cursor-pointer">
          <User size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="#">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="border-b">
          <DropdownMenuLabel>Web Links</DropdownMenuLabel>
          {navLinks.map((l) => (
            <DropdownMenuItem key={l.link} asChild className="cursor-pointer">
              <Link to={l.link}>{l.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
