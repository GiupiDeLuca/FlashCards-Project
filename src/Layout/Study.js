import React from "react";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index.js";
import { useParams, useHistory } from "react-router-dom";

function Study() {
  const [deck, setDeck] = useState({ cards: [] });
  const [index, setIndex] = useState(0);
  const [sideToDisplay, setSideToDisplay] = useState("front");
  const card = deck.cards[index % deck.cards.length] || {};
  const history = useHistory();

  const { deckId } = useParams();
  console.log(deck);

  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, []);

  function flipSide() {
    if (sideToDisplay === "front") {
      setSideToDisplay("back");
    } else {
      setSideToDisplay("front");
    }
  }

  function goToNextCard() {
    setIndex(index + 1);
    flipSide();
    if (index > deck.cards.length - 2) {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page"
        )
      ) {
        history.push(`/decks/${deckId}/study`);
        setIndex(0);
      } else {
        history.push("/");
      }
    }
  }

  if (deck.cards.length > 2) {
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
              Study
            </li>
          </ol>
        </nav>
        <h2>{`Study: ${deck.name}`}</h2>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{`Card ${
              (index % deck.cards.length) + 1
            } of ${deck.cards.length} (${sideToDisplay})`}</h2>
            <p className="card-text">{`${card[sideToDisplay]}`}</p>

            <button className="btn btn-secondary" onClick={flipSide}>
              Flip
            </button>
            {
                sideToDisplay === "back" 
                && <button className="btn btn-primary" onClick={goToNextCard}>
                Next
              </button>
            }
          </div>
        </div>
      </div>
    );
  } else {
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
              Study
            </li>
          </ol>
        </nav>
        <h2>{`${deck.name}: Study`}</h2>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Not Enough Cards</h2>
            <p className="card-text">{`You need at least 3 cards to study. There are ${deck.cards.length} cards in this deck.`}</p>

            <button
              className="btn btn-primary"
              onClick={() => history.push(`/decks/${deckId}/cards/new`)}
            >
              + Add Cards
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Study;
