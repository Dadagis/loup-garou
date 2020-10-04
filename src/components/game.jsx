import React from 'react';
import GameTable from './gameTable';
import GameInstruction from './gameInstruction';
import { useState, useEffect } from 'react';

function Game(props) {
    [cards, setCards] = useState([]);
    [role, setRole] = useState({});
    [timerValue, setTimerValue] = useState(0);

    useEffect(() => {
        getCards();
        getRole();
    }, [cards, role]);

    useEffect(() => {
        refreshTimerValue();
        cleanTimer();
    }, [timerValue]);

    async function getCards(){
        await http.get("http://localhost:4000/api/roles/index").then(
      (response) => {
        setCards(response.data);
      }
    );
    }
    
    async function getRole(){
        await http.get("http://localhost:4000/api/roles/index").then(
      (response) => {
        setRole(response.data);
      }
    );
    }
    async function refreshTimerValue() {
        setInterval(async () => {
          setTimerValue(timerValue-1);
        }, 1000);
      }

    return (
        <Fragment>
            <GameTable cards={cards}/>
            <GameTimer timerValue={timerValue}/>
            <GameInstruction role={role}/>
        </Fragment>
    );
}

export default Game;