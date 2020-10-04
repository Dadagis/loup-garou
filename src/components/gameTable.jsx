import React from 'react';
import GameCard from './gameCard';

function GameTable(props) {
    let {cards} = props;
    handleChoice = role => {
        const roles = [...this.state.roles];
        let {rolesNumber} = this.state;
        const index = roles.indexOf(role);
        roles[index] = { ...roles[index] };
        rolesNumber = roles[index].chosed ? --rolesNumber : ++rolesNumber;
        roles[index].chosed = !roles[index].chosed;
        this.setState({ roles, rolesNumber });
      };

    return (
        <div className="container">
        <div className="row">
          {cards.map(card => (
            <GameCard key={card._id} card={card} onClick={() => this.handleChoice(role)} />
          ))}
        </div>
      </div>
    )
}

export default GameTable;
