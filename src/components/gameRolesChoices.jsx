import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ChoiceRoleCard from "./choiceRoleCard";

export default class GameRolesChoices extends Component {
  state = {
    roles: {},
    errors: {}
  };

  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }
  handleChoice = role => {
    const roles = [...this.state.roles];
    const index = roles.indexOf(role);
    roles[index] = { ...roles[index] };
    roles[index].chosed = !roles[index].chosed;
    this.setState({ roles });
  };

  render() {
    let role = {
      name: "Villageois",
      description: "Ce personnage ne fait rien de bien intéréssant.",
      roleNameImage: ""
    }
    return (
      <div className="container">
        <div className="row">
          <ChoiceRoleCard role={role} chosed="true" onClick={this.handleChoice} />
          <ChoiceRoleCard role={role}/>
          <ChoiceRoleCard role={role}/>
          <ChoiceRoleCard role={role}/>
          <ChoiceRoleCard role={role}/>
          <ChoiceRoleCard role={role}/>
        </div>
        
      </div>
    );
  }
}
