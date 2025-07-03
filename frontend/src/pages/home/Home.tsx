import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router";

function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;
