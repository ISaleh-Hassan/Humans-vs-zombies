import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { getPlayerInfo } from "../../utils/gamedbstorage";
import HeaderOutside from '../StylingComponents/HeaderOutside';
import { FetchAllGames } from '../../utils/GameStorage';

const CurrentGames = (props) => {

    const BUTTON_STYLES = {
        width: '110px',
        height: '40px',
        margin: '2px',
        padding: '1px'
    }
    
    const [games, setGames] = useState([]);
    const [gameFilter, setGameFilter] = useState('ALL');

    useEffect(() => {
        fetchGames();
        getPlayerInfo();
    }, []);

    useEffect(() => {

    }, [gameFilter])

    async function fetchGames() {
        const games = await FetchAllGames();
        if (games != null) {
            setGames(games);
        } else {
            setGames([]);
        }
    }


    const [currentUser, setCurrentUser] = useState([]);
    
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    async function fetchCurrentUser() {
        const token = localStorage.getItem('jwt');
        const userId = localStorage.getItem('User ID');
        const response = await fetch('/api/fetch/useraccount/' + userId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        if (response.status === 200) {
            let body = await response.json();
            setCurrentUser(body);
        } else {
            alert("Could not find user object.")
            setCurrentUser({});
        }
    };


  function handleAdminAccess() {
    if (currentUser.userType === 'ADMINISTRATOR') {
        props.history.push('/admin')
    } else {
        alert('You do not have access to the admin menu')
    }
  }


  function handleAdminCreateGameAccess() {
    if (currentUser.userType === 'ADMINISTRATOR') {
        props.history.push('/creategame')
    } else {
        alert('You do not have permission to create a new game')
    }
  }


    function handlePreview(id) {
        localStorage.setItem("Game ID", id);
        props.history.push("/landing");
    }

    const onFilterButtonClicked = ev => {
        let filter = ev.target.value;
        setGameFilter(filter);
    }

    return (
        <>
            <section className="home">
                <div className="container">
                    <HeaderOutside />
                    
                    <h1>Current Games</h1>
                    <span>
                        <Button type="button" variant="primary" onClick={onFilterButtonClicked} value="ALL" size="sm">ALL</Button>
                        <Button type="button" variant="warning" onClick={onFilterButtonClicked} value="PREPARATION" size="sm">PREPARATION</Button>
                        <Button type="button" variant="success" onClick={onFilterButtonClicked} value="IN_PROGRESS" size="sm">IN PROGRESS</Button>
                        <Button type="button" variant="dark" onClick={onFilterButtonClicked} value="COMPLETED" size="sm">COMPLETED</Button>
                    </span>
                    <table>
                        <thead>
                            <tr>
                                <th>Game</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Players</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((g) =>
                                <tr key={g.gameId}>
                                    {g.gameState === gameFilter || gameFilter === 'ALL' ? <td>{g.name}</td> : null}
                                    {g.gameState === gameFilter || gameFilter === 'ALL' ? <td>{g.stringStart}</td> : null}
                                    {g.gameState === gameFilter || gameFilter === 'ALL' ? <td>{g.stringEnd}</td> : null}
                                    {g.gameState === gameFilter || gameFilter === 'ALL' ? <td>{g.numberOfRegisteredPlayers}/{g.maxNumberOfPlayers}</td> : null}
                                    {g.gameState === gameFilter || gameFilter === 'ALL' ? <td>
                                        {g.gameState === 'PREPARATION' ? <Button type="button" variant="warning" disabled={g.gameState === 'COMPLETED'} onClick={() => handlePreview(g.gameId)}>Preview</Button> : null}
                                        {g.gameState === 'IN_PROGRESS' ? <Button type="button" variant="success" disabled={g.gameState === 'COMPLETED'} onClick={() => handlePreview(g.gameId)}>Preview</Button> : null}
                                        {g.gameState === 'COMPLETED' ? <Button type="button" variant="dark" disabled={g.gameState === 'COMPLETED'} onClick={() => handlePreview(g.gameId)}>Preview</Button> : null}
                                    </td> : null}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <br/>
                    <div>
                        <Button variant="dark" style={BUTTON_STYLES} onClick={() => props.history.push("/")}>Profile</Button>
                        {currentUser.userType === 'ADMINISTRATOR' ? <Button variant="dark" style={BUTTON_STYLES} onClick={handleAdminAccess}>Admin</Button> : null}
                        {currentUser.userType === 'ADMINISTRATOR' ? <Button variant="dark" style={BUTTON_STYLES} onClick={handleAdminCreateGameAccess}>Create Game</Button> : null }
                        
                    </div>
                </div>
            </section>
        </>
    );
};

export default CurrentGames;