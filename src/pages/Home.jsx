import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar";
import { WhatsAppButton } from "../components/ui/WhatsappButton";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import Footer from "../components/ui/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollToTopButton />
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Home;
