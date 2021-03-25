import React from "react";
import { useHistory } from "react-router-dom";
import {listDecks} from "../utils/api/index.js";
import DecksList from "./DecksList";


function Home() {
  const history = useHistory();

  function goToCreateDeck() {
    history.push("/decks/new");
  }

  

  return (
    <div>
      <button className="btn btn-secondary" onClick={goToCreateDeck}>
        {" "}
        + Create Deck{" "}
      </button>
      <br/>
      <DecksList/>
    </div>
  );
}

export default Home;
