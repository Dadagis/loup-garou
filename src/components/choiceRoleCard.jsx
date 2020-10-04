import React from 'react'

const ChoiceRoleCard = props => {
    let {role} = props;
    let roleImage = "logo192.png";
    if (role.roleImageName != null) {
        roleImage = role.roleImage;
    }
    const cardStyle = {
        width: "10rem",
        margin: "1rem",
    }
    const color = (role.chosed ? "card bg-light" : "card bg-white");
    return (
        <div className={color} style={cardStyle} onClick={props.onClick}>
            <img className="card-img-top" src={ "../../images/"+roleImage} alt={"Card image cap "+role._id} />
            <div className="card-body">
                <h5 className="card-title">{role.name}</h5>
            </div>
        </div>
    )
}

export default ChoiceRoleCard;