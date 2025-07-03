import { Link } from "react-router";
import { ProfileDropdown } from "./ProfileDropdown";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-100 py-2 shadow-lg px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl">
          <Link to="/">
            📚 <span className="font-semibold">Library Management</span>
          </Link>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-4">
            <NavLinks />
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
