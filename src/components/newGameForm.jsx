import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import auth from "../services/authService";

export default class NewGameForm extends Form {
  state = {
    data: {
      gameName : "",
      playersNumber : 3,
    },
    errors: {},
  };

  schema = {
    gameName: Joi.string().required().label("Username"),
    playersNumber: Joi.number()
    .integer()
    .min(3)
    .max(13)
    .required(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;

      const headers = {
        "x-auth-token":
          auth.getJwt(),
      };
      console.log(headers);
      await http.post(
        "http://localhost:4000/api/games/",
        { name : data.gameName, playersNumber : data.playersNumber },
        {
          headers: headers,
        }
      ).then((response) => {
        const { state } = this.props.location;
        window.location = state
          ? state.from.pathname
          : `/games/${response.data._id}/roles`;
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.isAuthenticated() === null) return <Redirect to="/" />;

    return (
      <div>
        <h1>Créer une partie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("gameName", "Nom de la partie")}
          {this.renderInput("playersNumber", "Nombre de joueurs")}
          {this.renderButton("Créer la partie")}
        </form>
      </div>
    );
  }
}
