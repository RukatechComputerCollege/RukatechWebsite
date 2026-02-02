import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { WhatsAppButton } from "../components/WhatsappButton";

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
