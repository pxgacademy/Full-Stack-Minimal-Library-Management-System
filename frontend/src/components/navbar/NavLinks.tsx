import { NavLink } from "react-router";

const NavLinks = () => {
  return (
    <>
      <NavLink to="/">All Books</NavLink>
      <NavLink to="add-books">Add Books</NavLink>
      <NavLink to="borrow-summary">Borrow Summary</NavLink>
      <NavLink to="my-borrows">My Borrows</NavLink>
    </>
  );
};

export default NavLinks;
