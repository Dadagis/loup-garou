import React from 'react'

const ChoiceRoleCard = ({ role, chosed }) => {
    let roleImage = "logo192.png";
    if (role.roleImageName != null) {
        roleImage = role.roleImage;
    }
    const cardStyle = {
        width: "10rem",
        margin: "1rem"
    }
    return (
        <div className="card" style={cardStyle}>
            <img class="card-img-top" src={ "../../images/"+roleImage} alt="Card image cap"/>
            <div class="card-body">
                <h5 class="card-title">{role.name}</h5>
                {chosed && (
                <p class="card-text">{role.description}</p>
                )}
                
            </div>
        </div>
    )
}

export default ChoiceRoleCard;