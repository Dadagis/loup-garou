import React from 'react';

const GameInstruction = props => {
    let {role} = props;

    return (
        <footer class="footer mt-auto py-3">
            <div class="container">
                <span class="text-muted">{role.instruction}</span>
            </div>
        </footer>
    )
}

export default GameInstruction;