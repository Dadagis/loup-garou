import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <NavBar />
        <Switch>
          <Route path="/login" component={LoginForm} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;

// Créateur de la partie choisi les rôles et invite les joueurs
// Attente dans un Lobby
// la partie commence
// attribution au hasard des rôles
// visualisation du rôle + instruction + timer
// jeu par étape avec différents formulaires
// Chaque étape se conclue par un Lobby
// quand tout le monde à terminé, on passe à l'étape suivante
// Quand toutes les étapes sont faites on passe à la phase jour
// chrono
// vote
// fin du game
