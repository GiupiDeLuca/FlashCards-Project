import React from "react";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index.js";
import { useParams } from "react-router-dom";
import { createCard } from "../utils/api/index.js";
import CardForm from "./CardForm.js";

function AddCard() {
  const initialCard = {
    front: "",
    back: "",
  };

  const [deck, setDeck] = useState({ cards: [] });
  const [card, setCard] = useState({ ...initialCard });
  const { deckId } = useParams();
  const button1 = "done";
  const button2 = "save";

  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, []);

  const handleChange = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value,
    });
  };

  const formHandler = (event) => {
    event.preventDefault();
    createCard(deckId, card);
    setCard({ ...initialCard });
  };

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
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{`${deck.name}: Add Card`}</h2>
      <CardForm
        card={card}
        handleChange={handleChange}
        deckId={deckId}
        formHandler={formHandler}
        button1={button1}
        button2={button2}
      />
    </div>
  );
}

export default AddCard;


