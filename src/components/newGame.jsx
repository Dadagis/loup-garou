import React from "react";
const Pusher = require("pusher");

export default function NewGame() {
  var pusher = new Pusher("e3e84ab3de7b94195578", {
    cluster: "eu",
  });

  var channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data) {
    alert(JSON.stringify(data));
  });

  return (
    <div>
      <h1>Nouvelle Partie</h1>
      <p>Vous êtes le créateur de la partie</p>
      <div>
        <h2>Liste des joueurs</h2>
      </div>
    </div>
  );
}
