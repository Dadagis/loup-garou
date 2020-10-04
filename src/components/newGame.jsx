import React, { Component } from "react";
import http from "../services/httpService";
import auth from "../services/authService";

export default class NewGame extends Component {
  state = { game: {},roles: [], gameRoles: [], interval: "" };


  componentDidMount = async () => {
    await this.getGame();
    await this.getRoles();
    this.getGameRoles();
    this.refreshGame();
    
  };

  getGame = async function(){
    try {
      const headers = {
        "x-auth-token":
          auth.getJwt(),
      };

      const gameId = this.props.location.pathname.split("/")[2];

      await http.get(`http://localhost:4000/api/games/${gameId}`, 
      {headers}
      ).then((response) => {
        this.setState({ game: response.data });
      });
    } catch (error) {
    }
  }
  refreshGame = async function() {
    var interval = setInterval(async () => {
      this.getGame();
    }, 1000);
    this.setState({interval});
  }

  getRoles = async function(){
    await http.get("http://localhost:4000/api/roles/index").then(
      (response) => {
        this.setState({ roles: response.data });
      }
    );
  }

  getGameRoles = function(){
    const {roles, game} = this.state;
    let gameRoles = [];
    console.log(game);
    game.rolesId.forEach(roleId => {
      roles.forEach(role => {
        if (roleId === role._id){
          gameRoles.push(role);
        }
      });
    });
    this.setState({gameRoles})
  }
  
  componentWillUnmount = function() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.interval);
  };


  render() {
    const { gameRoles, game } = this.state;
    const { players } = this.state.game;
    return (
      <div>
        <h1>Salon d'avant partie</h1>
        <p>Vous êtes le créateur de la partie vous devez choisir les rôles</p>
        <h2>Rôles</h2>
        <div>
          {gameRoles.map((role) => (
            <span key={role._id}>{role.name}</span>
          ))}
        </div>
        <div>
          <h3>Liste des joueurs</h3>
          <ul>
          
          </ul>
        </div>
      </div>
    );
  }
}
