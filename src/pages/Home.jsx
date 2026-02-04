import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar";
import { WhatsAppButton } from "../components/ui/WhatsappButton";

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <WhatsAppButton />
    </>
  );
};

export default Home;
