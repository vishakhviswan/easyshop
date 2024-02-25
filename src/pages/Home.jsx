import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import Ads from "../components/Ads/Ads";
import Populart from "../components/Popular/Populart";
import { Offers } from "../components/Offers/Offers";
import { NewCollections } from "../components/NewCollections/NewCollections";

function Home() {
  return (
    <div>
      <Navbar />
      <Ads />
      <Populart />
      <Offers />
      <NewCollections/>
    </div>
  );
}

export default Home;
