import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import Deck from "./Deck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";



function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard/>
          </Route>
          <Route path="/decks/:deckId">
            <Deck/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
