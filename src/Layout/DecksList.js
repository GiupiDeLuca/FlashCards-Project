import React from "react";
import { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index.js";
import { deleteDeck } from "../utils/api/index.js";
import { useHistory } from "react-router-dom";

function DecksList() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    listDecks().then((response) => setDecks(response));
  }, []);

  function deleteHandler(id) {
    if (window.confirm("Delete this deck?")) {
      deleteDeck(id);
      listDecks().then((response) => setDecks(response));
      history.push("/");
    }
  }

  const deckItem = decks.map((deck) => (
    <div className="card" key={deck.id}>
      <div className="card-body">
        <h2 className="card-title">{`${deck.name}`}</h2>
        <p className="card-text">{`${deck.description}`}</p>
        <p className="card-text">{`${deck.cards.length} cards`}</p>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => history.push(`/decks/${deck.id}`)}
        >
          View
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => history.push(`/decks/${deck.id}/study`)}
        >
          Study
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteHandler(deck.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      {deckItem}
      <br />
    </div>
  );
}

export default DecksList;
