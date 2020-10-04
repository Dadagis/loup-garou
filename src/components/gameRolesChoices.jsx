import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ChoiceRoleCard from "./choiceRoleCard";
import http from "../services/httpService";
import auth from "../services/authService";
import Form from "./common/form";

export default class GameRolesChoices extends Component {
  state = {
    roles: [],
    rolesNumber: 0,
    game: {},
    errors: {}
  };
  componentDidMount = async () => {
    await this.getRoles();
    await this.getGame();
    this.selectRoles();
  };

  getRoles = async () => {
    await http.get("http://localhost:4000/api/roles/index").then(
      (response) => {
        this.setState({ roles: response.data });
      }
    );
  }
  
  getGame = async () => {
    await http.get("http://localhost:4000/api/games/"+this.getGameId()).then(
      (response) => {
        this.setState({ game: response.data });
      }
    );
  }

  selectRoles = function (){
    let { roles, game } = this.state;
    roles.forEach(role => {
      game.rolesId.forEach(roleId => {
        if (roleId === role._id){
          role.chosed = !role.chosed;
        } 
      });
    });
    this.setState({roles});
  }

  getGameId = function (){
    return this.props.location.pathname.split("/")[2];
  }

  renderButton(label) {
    return ;
  }
  handleChoice = role => {
    const roles = [...this.state.roles];
    let {rolesNumber} = this.state;
    const index = roles.indexOf(role);
    roles[index] = { ...roles[index] };
    rolesNumber = roles[index].chosed ? --rolesNumber : ++rolesNumber;
    roles[index].chosed = !roles[index].chosed;
    this.setState({ roles, rolesNumber });
  };

  handleValidate = async () => {
    // A vérifier, si le user est hote de la partie.
    try {
      const { game, roles } = this.state;
      let rolesId = [];
      //Ajout des roles ID
      roles.forEach(role => {
        if (role.chosed) {
          rolesId.push(role._id);
        }
      });
      game.rolesId = rolesId;
      const headers = {
        "x-auth-token":
          auth.getJwt(),
      };
      await http.put("http://localhost:4000/api/games/"+game._id, {
        rolesId: game.rolesId,
        name: game.name,
        playersNumber: game.playersNumber
      },
      { headers }
      ).then((response) => {
        const { state } = this.props.location;
        window.location = state
          ? state.from.pathname
          : `/games/${game._id}/start`;
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
    let {roles, rolesNumber} = this.state;
    return (
      <React.Fragment>
      <div className="container">
        <div className="row">
          {roles.map(role => (
            <ChoiceRoleCard key={role._id} role={role} chosed={role.chosed} onClick={() => this.handleChoice(role)} />
          ))}
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => this.handleValidate()}>Valider les rôles</button>
      </React.Fragment>
    );
  }
}
