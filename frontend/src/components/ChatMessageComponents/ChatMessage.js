import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button } from 'react-bootstrap';
import { GetAllChatMessages, CreateGlobalChatMessage, GetBundleOfChatMessages } from '../../utils/chatMessageStorge';

const ChatMessage = props => {

    const [chatMessage, setMsgText] = useState('');
    const [msgObject, setMsgObject] = useState({});
    const [allChatMessages, setAllChatMessages] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState([]);
    const [validInput, setValidInput] = useState(false);
    const [invalidInputMessage, setInvalidInputMessage] = useState('');



    useEffect(() => {
        let request = {
            gameId: 1,
            faction: 'ALL',
            squadId: null
        }

        GetBundleOfChatMessages(request)
            .then(response => response.json())
            .then(data => setAllChatMessages(data));

        // GetAllChatMessages()
        //     .then(response => response.json())
        //     .then(data => setAllChatMessages(data))
    }, []);


    function getAllChatMessages() {
        GetAllChatMessages()
            .then(response => response.json())
            .then(data => setAllChatMessages(data))
    }

    function getGloblaMessages() {
        setSelectedChatRoom(allChatMessages);
    }

    function getSquadMessages() {
        let squadMessages = [];
        for (let i = 0; i < allChatMessages.length; i++) {
            if (allChatMessages[i].squadId != null) {
                squadMessages.push(allChatMessages[i])
            }
        }
        setSelectedChatRoom(squadMessages)
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
        if (currentInput.length > 15) {
            setValidInput(false);
            setInvalidInputMessage('Message cannot exceed 15 characters in length.');
        } else {
            setValidInput(true);
        }
    }

    function createMessageObject(msg) {
        setMsgObject({
            chatMessage: msg,
            timestamp: getTime(),
        })
    }
    const sendMessage = () => {
        let messageData = {
            gameId: null,
            playerId: null,
            squadId: null,
            message: msgObject.chatMessage,
            faction: messageData.faction,
            timestamp: msgObject.timestamp
            
        }
        CreateGlobalChatMessage(msgObject, 2, 2);
        getAllChatMessages();
    }

    return (
        <>
            <ButtonGroup>
                <Button variant="secondary" onClick={getGloblaMessages} value="GLOBAL">Global</Button>
                <Button variant="secondary" onClick={getSquadMessages} value="SQUAD">Squad</Button>
            </ButtonGroup>
            <br />

            {selectedChatRoom.map((chatMessage) =>
                <li key={chatMessage.chatMessageId}>{chatMessage.message}</li>)}
            <input type="text" placeholder="Enter a message" onChange={onMsgChanged} />
            { !validInput ? <p>{invalidInputMessage}</p> : null}
            <Button disabled={!validInput} onClick={sendMessage}>Send</Button>
        </>
    );
};
export default ChatMessage;