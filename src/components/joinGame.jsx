import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";

export default class JoinGame extends Form {
  state = {
    data: {
      gameId: "",
    },
    errors: {},
  };

  schema = {
    gameId: Joi.string().required().label("GameId"),
  };

  doSubmit = async () => {
    const id = this.state.data.gameId;
    console.log("je submit");
    await http.get(`http://localhost:4000/api/games/${id}`).then((response) => {
      this.props.history.push(`/games/${id}/start`);
    });
  };

  render() {
    return (
      <div>
        <h1>Rejoindre une partie</h1>
        <p>
          Entres la chaine de caractères que t'as donné le créateur de la partie
        </p>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("gameId", "Numéro de la partie")}
          {this.renderButton("Rejoindre la partie")}
        </form>
      </div>
    );
  }
}
