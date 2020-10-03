import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import Axios from "axios";

export default class NewGameForm extends Form {
  state = {
    data: { gameName: "" },
    errors: {},
  };

  schema = {
    gameName: Joi.string().required().label("Username"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      // TOKEN A RECUPERER AU LOGIN ET A STOCKER DANS LE NAVIGATEUR DES QUE POSSIBLE
      const headers = {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjU4Yzc3OWYxNWYzOTBlYWQ0YWNmN2MiLCJpYXQiOjE1OTk2NTM3NTN9.8DwdfGlEZRz3ZHHDD98XmoYKTTPhDs-gJIG-xVBQZLk",
      };
      await Axios.post(
        "http://localhost:4000/api/games/",
        { name: data.gameName },
        {
          headers: headers,
        }
      ).then((response) => {
        const { state } = this.props.location;
        window.location = state
          ? state.from.pathname
          : `/games/${response.data._id}/start`;
      });
      // await auth.login(data.username, data.password);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // décommenter quand le login fonctionne
    // if (auth.getCurrentUser() === null) return <Redirect to="/" />;

    return (
      <div>
        <h1>Créer une partie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("gameName", "Nom de la partie")}
          {this.renderButton("Créer la partie")}
        </form>
      </div>
    );
  }
}
