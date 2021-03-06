import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Home from "./components/home";
import NewGameForm from "./components/newGameForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import NewGame from "./components/newGame";
import Logout from "./components/logout";
import GameRolesChoices from "./components/gameRolesChoices";
import JoinGame from "./components/joinGame";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <main className="container">
          <NavBar user={user} />
          <Switch>
            <Route path="/games/:id/start" component={NewGame} />
            <Route path="/games/:id/roles" component={GameRolesChoices} />

            <Route path="/games/new" component={NewGameForm} />
            <Route path="/games/join" component={JoinGame} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />

            <Route path="/" component={Home} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
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
