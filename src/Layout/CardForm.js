import React from "react";
import {useHistory} from "react-router-dom";

function CardForm(props) {
  const { card, handleChange, deckId, formHandler, button1, button2 } = props;
  const history = useHistory();
  return (
    <form>
      <label htmlFor="front">
        Front
        <br />
      </label>
      <textarea
        id="front"
        type="textarea"
        value={card.front}
        className="mediumTextarea"
        name="front"
        placeholder={"front of the card"}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="back">
        Back
        <br />
      </label>
      <textarea
        id="back"
        type="textarea"
        name="back"
        className="mediumTextarea"
        value={card.back}
        placeholder={"back of the card"}
        onChange={handleChange}
      />
      <br />
      <button
        className="btn btn-secondary"
        onClick={() => history.push(`deck/${deckId}`)}
      >
        {`${button1}`}
      </button>
      <button className="btn btn-primary" onClick={formHandler}>
        {`${button2}`}
      </button>
    </form>
  );
}

export default CardForm;
