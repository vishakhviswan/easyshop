import React from "react";
import Ads from "../components/Ads/Ads";
import Populart from "../components/Popular/Populart";
import { Offers } from "../components/Offers/Offers";
import { NewCollections } from "../components/NewCollections/NewCollections";
import { NewsLetter } from "../components/NewsLetter/NewsLetter";

function Home() {
  return (
    <div>
      <Ads />
      <Populart />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
}

export default Home;
