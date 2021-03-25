import React from "react";
import { useState, useEffect } from "react";
import { readDeck, deleteCard, deleteDeck} from "../utils/api/index.js";
import { useHistory, useParams } from "react-router-dom";

function Deck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();
  const cards = deck.cards || [];

  function deleteHandler(id) {
    if (window.confirm("Delete this card?")) {
      deleteCard(id);
      readDeck(deckId).then((response) => setDeck(response));
      history.push(`/decks/${deckId}`)
    }
  };

  function deleteDeckHandler(id) {
    if (window.confirm("Delete this deck?")) {
      deleteDeck(id);
      history.push("/");
    }
  };

  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, [deck.id]);

  console.log("Deck component the deck", deck);
  console.log("Deck component", deckId);
  console.log(deck.cards);

  const cardItem = cards.map((card) => (
    <div className="card" kay={card.id}>
      <div className="card-body row">
        <p className="card-text col-6"> {card.front}</p>
        <p className="card-text col-6"> {card.back}</p>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-secondary me-md-2 btn-sm"
          onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteHandler(card.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Deck
          </li>
        </ol>
      </nav>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
          <div className=" btn ">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => history.push(`/decks/${deck.id}/edit`)}
            >
              Edit
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => history.push(`/decks/${deck.id}/study`)}
            >
              Study
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
            >
              + Add Cards
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteDeckHandler(deck.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <h2>Cards</h2>
      <div>{cardItem}</div>
    </div>
  );
}

export default Deck;
