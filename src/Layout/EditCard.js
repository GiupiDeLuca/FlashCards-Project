import React from "react";
import { useState, useEffect } from "react";
import { updateCard } from "../utils/api/index.js";
import { useHistory, useParams } from "react-router-dom";
import { readCard, readDeck } from "../utils/api/index.js";
import CardForm from "./CardForm";

function EditCard() {
  const initialCard = {
    front: "",
    back: "",
    id: null,
  };

  const [deck, setDeck] = useState({ cards: [] });
  const [card, setCard] = useState({ ...initialCard });
  const { cardId, deckId } = useParams();
  const history = useHistory();
  const button1 = "cancel";
  const button2 = "submit";

  useEffect(() => {
    readCard(cardId).then((response) => setCard(response));
  }, []);

  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, []);

  const handleChange = (event) =>
    setCard({ ...card, [event.target.name]: event.target.value });

  const formHandler = (event) => {
    event.preventDefault();
    updateCard(card);
    setCard({ ...initialCard });
    history.goBack();
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{`Deck ${deck.name}`}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {`Edit Card ${cardId}`}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
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

export default EditCard;

// import React from "react";
// import { useState, useEffect } from "react";
// import { updateCard } from "../utils/api/index.js";
// import { useHistory, useParams } from "react-router-dom";
// import { readCard, readDeck } from "../utils/api/index.js";

// function EditCard() {

//     const initialCard = {
//         front: "",
//         back: "",
//         id: null
//     };

//   const [deck, setDeck] = useState({ cards: [] });
//   const [card, setCard] = useState({...initialCard});
//   const { cardId, deckId } = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     readCard(cardId).then((response) => setCard(response));
//   }, []);

//   useEffect(() => {
//     readDeck(deckId).then((response) => setDeck(response));
//   }, []);

//   const handleChange = (event) =>
//     setCard({ ...card, [event.target.name]: event.target.value });

//   const formHandler = (event) => {
//     event.preventDefault();
//     updateCard(card)
//     setCard({ ...initialCard });
//     history.goBack();
//   };

//   return (
//     <div>
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item">
//             <a href="/">Home</a>
//           </li>
//           <li className="breadcrumb-item">
//             <a href={`/decks/${deckId}`}>{`Deck ${deck.name}`}</a>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             {`Edit Card ${cardId}`}
//           </li>
//         </ol>
//       </nav>
//       <h2>Edit Card</h2>
//       <form>
//         <label htmlFor="front">
//           Front
//           <br />
//         </label>
//         <textarea
//             id="front"
//             type="textarea"
//             value={card.front}
//             className="mediumTextarea"
//             name="front"
//             placeholder={"front of the card"}
//             onChange={handleChange}
//           />
//         <br />
//         <label htmlFor="back">
//           Back
//           <br />
//         </label>
//         <textarea
//             id="back"
//             type="textarea"
//             name="back"
//             className="mediumTextarea"
//             value={card.back}
//             placeholder={"back of the card"}
//             onChange={handleChange}
//           />
//         <br />
//         <button className="btn btn-secondary" onClick={() => history.push(`deck/${deckId}`)}>
//           Cancel
//         </button>
//         <button className="btn btn-primary" onClick={formHandler}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditCard;
