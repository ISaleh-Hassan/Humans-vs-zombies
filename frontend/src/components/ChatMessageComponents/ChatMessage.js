import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button } from 'react-bootstrap';
import { CreateMessage, GetBundleOfChatMessages } from '../../utils/chatMessageStorge';


const ChatMessage = props => {

    const [chatMessage, setMsgText] = useState('');
    const [validInput, setValidInput] = useState(false);
    const [invalidInputMessage, setInvalidInputMessage] = useState('');
    const [playerId, setPlayerId] = useState(localStorage.getItem('Player ID'));
    const [gameId, setGameId] = useState(localStorage.getItem('gameId'));
    const [squadId, setSquadId] = useState(null);
    const [msgObject, setMsgObject] = useState(
        {
            gameId: gameId,
            playerId: playerId,
            squadId: squadId,
            message: chatMessage,
            faction: 'ALL',
            timestamp: getTime()
        })
    const [allChatMessages, setAllChatMessages] = useState([]);

    useEffect(() => {
        getChatMessagesBySelectedChatRoom(msgObject)
    }, [msgObject.faction]);

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    useEffect(() => {
        if (localStorage.getItem('squadId') !== '') {
            setSquadId(localStorage.getItem('squadId'))
            setMsgObject((prevState) => ({
                ...prevState,
                squadId: squadId,
            }));
        }
    }, []);

    useInterval(() => {
        getChatMessagesBySelectedChatRoom(msgObject)
    }, 3000);

    function getSelectedChatRoom(ev) {
        let chatRoom = ev.target.value;
        let selectedRoom;
        switch (chatRoom) {
            case 'ALL':
                selectedRoom = 'ALL'
                break;

            case 'SQUAD':
                selectedRoom = 'ZOMBIE'
                break

            case 'FACTION':
                selectedRoom = 'HUMAN'
                break;
            default:
                console.log("Default")
        }
        createMessagesObjectByChatRoom(selectedRoom);
        getChatMessagesBySelectedChatRoom(msgObject)

        return chatRoom;
    }

    function createMessagesObjectByChatRoom(selectedRoom) {
        setMsgObject((prevState) => ({
            ...prevState,
            faction: selectedRoom
        }));
    }

    function getChatMessagesBySelectedChatRoom(request) {
        GetBundleOfChatMessages(request)
            .then(response => response.json())
            .then(data => setAllChatMessages(data));
    }

    function getTime() {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return date;
    }

    const onMsgChanged = ev => {
        let currentInput = ev.target.value;
        setMsgText(currentInput);
        createMessageObject(currentInput)
        if (currentInput.length < 3) {
            setValidInput(false);
        }
        else if (currentInput.length > 15) {
            setValidInput(false);
            setInvalidInputMessage('Message cannot exceed 15 characters in length.');
        } else {
            setValidInput(true);
        }
    }

    function createMessageObject(msg) {
        setMsgObject((prevState) => ({
            ...prevState,
            message: msg,
        }));
    }

    const sendMessage = () => {
        CreateMessage(msgObject)
        getChatMessagesBySelectedChatRoom(msgObject)
    }

    return (
        <>

            <ButtonGroup>
                <Button variant="secondary" onClick={getSelectedChatRoom} value="ALL">Global</Button>
                <Button variant="secondary" onClick={getSelectedChatRoom} value="FACTION">faction</Button>
                <Button variant="secondary" disabled={!squadId} onClick={getSelectedChatRoom} value="SQUAD">Squad</Button>
            </ButtonGroup>
            <br />

            {allChatMessages.map((chatMessage) =>
                <div>
                    <li key={chatMessage.chatMessageId}>
                        {chatMessage.message}
                    </li>
                </div>
            )}

            <input type="text" placeholder="Enter a message" onChange={onMsgChanged} />
            <Button disabled={!validInput} onClick={sendMessage}>Send</Button>

            { !validInput ? <p>{invalidInputMessage}</p> : null}


        </>
    );
};
export default ChatMessage;