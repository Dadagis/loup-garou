import React from 'react';

function GameCard(props) {
    let {card} = props;
    let roleImage = "logo192.png";
    if (card.roleImageName != null) {
        roleImage = card.roleImageName;
    }
    const cardStyle = {
        width: "10rem",
        margin: "1rem",
    }
    const color = (card.chosed ? "card bg-light" : "card bg-white");
    return (
        <div className={color} style={cardStyle} onClick={props.onClick}>
            <img className="card-img-top" src={ "../../images/"+roleImage} alt={"Card image cap "+role._id} />
            <div className="card-body">
                {card.possibleFlip && card.flip && (
                    <h5 className="card-title">{role.name}</h5>
                )}
            </div>
        </div>
    )
}

export default GameCard;