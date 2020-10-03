import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Home extends Component {
  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }

  render() {
    return (
      <div>
        <h1>Loup Garou</h1>
        <NavLink className="btn btn-primary mr-4" to="/games/new">
          Créer une partie
        </NavLink>
        <NavLink className="btn btn-primary mr-4" to="/games/join">
          Rejoindre une partie
        </NavLink>
      </div>
    );
  }
}
