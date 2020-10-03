import React, { Component } from "react";
import Axios from "axios";

export default class NewGame extends Component {
  state = { players: [], roles: [] };

  componentWillMount = async () => {
    await Axios.get("http://localhost:4000/api/roles/index").then(
      (response) => {
        this.setState({ roles: response.data });
      }
    );
  };

  handleClick = async () => {
    try {
      const headers = {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU4Yzc3OWYxNWYzOTBlYWQ0YWNmN2MiLCJpYXQiOjE1OTk2NTM3NTN9.8DwdfGlEZRz3ZHHDD98XmoYKTTPhDs-gJIG-xVBQZLk",
      };
      const gameId = this.props.location.pathname.split("/")[2];

      await Axios.get(`http://localhost:4000/api/games/${gameId}`, {
        headers: headers,
      }).then((response) => {
        this.setState({ players: response.data.players });
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { roles } = this.state;
    return (
      <div>
        <h1>Salon d'avant partie</h1>
        <p>Vous êtes le créateur de la partie vous devez choisir les rôles</p>
        <h2>Rôles</h2>
        <div>
          {roles.map((role) => (
            <span key={role._id}>{role.name}</span>
          ))}
        </div>
        <div>
          <h3>Liste des joueurs</h3>
          <ul>
            {this.state.players.map((player) => (
              <li key={player}>{player}</li>
            ))}
          </ul>
          <button onClick={this.handleClick}>Update</button>
        </div>
      </div>
    );
  }
}
