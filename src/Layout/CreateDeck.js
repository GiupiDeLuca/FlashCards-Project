import React from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";
import { useState } from "react";

function CreateDeck() {
  const initialDeck = {
    name: "",
    description: "",
  };

  const [deck, setDeck] = useState({ ...initialDeck });
  const history = useHistory();

  function goHome() {
    history.push("/");
  }

  function handleChange(event) {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value,
    });
  }

  function formHandler(event) {
    event.preventDefault();
    createDeck(deck);
    console.log(deck);
    setDeck({ ...initialDeck });
    goHome();
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1> Create Deck </h1>
      <form>
        <label htmlFor="name">
          Name
        </label>
        <br />
          <input
            id="name"
            type="text"
            name="name"
            value={deck.name}
            placeholder="Deck Name"
            onChange={handleChange}
          />
        <br />
        <label htmlFor="description">
          Description
        </label>
        <br />
        <textarea
            id="description"
            type="textarea"
            className="bigTextarea"
            name="description"
            value={deck.description}
            placeholder="Brief description on the deck"
            onChange={handleChange}
          />
      </form>
      <button className="btn btn-secondary" onClick={goHome}>
        Cancel
      </button>
      <button className="btn btn-primary" onClick={formHandler}>
        Submit
      </button>
    </div>
  );
}

export default CreateDeck;
