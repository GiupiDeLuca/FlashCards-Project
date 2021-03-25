import React from "react";
import { useState, useEffect } from "react";
import { updateDeck } from "../utils/api/index.js";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";

function EditDeck() {
  const initialDeck = {
    name: "",
    description: "",
    id: null,
  };

  const [deck, setDeck] = useState({ ...initialDeck });
  const history = useHistory();

  const { deckId } = useParams();

  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, []);

  const handleChange = (event) =>
    setDeck({ ...deck, [event.target.name]: event.target.value });

  function formHandler(event) {
    event.preventDefault();
    updateDeck(deck);
    setDeck({ ...initialDeck });
    history.goBack();
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form>
        <label htmlFor="front">
          Name
        </label>
        <br />
          <textarea
            id="front"
            type="textarea"
            className="mediumTextarea"
            value={deck.name}
            name="name"
            placeholder={"front of the card"}
            onChange={handleChange}
          />
        <br />
        <label htmlFor="back">
          Description
        </label>
        <br />
          <textarea
            id="back"
            type="textarea"
            className="mediumTextarea"
            name="description"
            value={deck.description}
            placeholder={"back of the card"}
            onChange={handleChange}
          />
        <br />
        <button className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={formHandler}>
          Done
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
