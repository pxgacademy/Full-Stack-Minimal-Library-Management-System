import { Link, NavLink } from "react-router";
import { ProfileDropdown } from "./ProfileDropdown";
import { navLinks } from "./navLinks";

const Navbar = () => {
const 

  return (
    <nav className="w-full bg-gray-100/60 backdrop-blur py-2 shadow px-4 fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl">
          <Link to="/">
            📚 <span className="font-semibold">Library Management</span>
          </Link>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="hidden md:flex items-center gap-x-4">
            {navLinks.map((l) => (
              <NavLink key={l.link} to={l.link}>
                {l.name}
              </NavLink>
            ))}
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
