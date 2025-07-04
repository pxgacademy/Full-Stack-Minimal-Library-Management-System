import Navbar from "@/components/navbar/Navbar";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import { Outlet } from "react-router";

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("library_user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    } else dispatch(setUser(null));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;
