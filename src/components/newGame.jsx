import React, { Component } from "react";
import http from "../services/httpService";
import auth from "../services/authService";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Fragment } from "react";

export default class NewGame extends Component {
  state = {
    game: {},
    roles: [],
    gameRoles: [],
    interval: "",
    copied: "Copier",
  };

  componentDidMount = async () => {
    await this.getGame();
    await this.getRoles();
    this.getGameRoles();
    this.refreshGame();
    this.setPlayers();
  };

  getGame = async function () {
    try {
      const headers = {
        "x-auth-token": auth.getJwt(),
      };

      const gameId = this.props.location.pathname.split("/")[2];

      await http
        .get(`http://localhost:4000/api/games/${gameId}`, { headers })
        .then((response) => {
          this.setState({ game: response.data });
        });
    } catch (error) {}
  };
  refreshGame = async function () {
    var interval = setInterval(async () => {
      this.getGame();
    }, 1000);
    this.setState({ interval });
  };

  getRoles = async function () {
    await http.get("http://localhost:4000/api/roles/index").then((response) => {
      this.setState({ roles: response.data });
    });
  };

  getGameRoles = function () {
    const { roles, game } = this.state;
    let gameRoles = [];
    console.log(game);
    game.rolesId.forEach((roleId) => {
      roles.forEach((role) => {
        if (roleId === role._id) {
          gameRoles.push(role);
        }
      });
    });
    this.setState({ gameRoles });
  };

  setPlayers = async () => {
    const gameId = this.props.location.pathname.split("/")[2];
    const currentUser = await auth.getCurrentUser();
    const headers = {
      "x-auth-token": auth.getJwt(),
    };
    http
      .patch(
        `http://localhost:4000/api/games/${gameId}/join`,
        {
          userId: currentUser._id,
        },
        { headers }
      )
      .then((response) => {
        console.log(response);
      });
  };

  componentWillUnmount = function () {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.interval);
  };

  renderButton(label) {
    let style = label === "Copié !" ? "btn btn-success" : "btn btn-primary";
    return <button className={style}>{label}</button>;
  }

  render() {
    const { gameRoles, game } = this.state;
    const { players } = this.state.game;
    const id = this.props.location.pathname.split("/")[2];
    const pinStyle = {
      backgroundColor: "#0496ff",
      color: "white",
      fontWeight: "bold",
      borderRadius: "9999px",
      display: "flex",
      height: "3rem",
      width: "3rem",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "xx-large",
    };
    return (
      <div>
        <h1>Salon d'avant partie</h1>
        <div>
          <p>
            Voici le code à partager avec vos amis : <strong>{id}</strong>
          </p>
          <CopyToClipboard
            text={id}
            onCopy={() => this.setState({ copied: "Copié !" })}
          >
            {this.renderButton(this.state.copied)}
          </CopyToClipboard>
        </div>
        <p>Vous êtes le créateur de la partie vous devez choisir les rôles</p>
        <h2>Rôles</h2>
        <div className="d-flex">
          {gameRoles.map((role) => (
            <Fragment key={role._id}>
              <div className="d-flex flex-column align-items-center mx-2">
                <span style={pinStyle}>{role.name[0]}</span>
                <span>{role.name}</span>
              </div>
            </Fragment>
          ))}
        </div>
        <div>
          <h3>Liste des joueurs</h3>
          <ul></ul>
        </div>
      </div>
    );
  }
}
