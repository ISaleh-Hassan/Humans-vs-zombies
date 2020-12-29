import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import { CreateMessage, GetBundleOfChatMessages, DeleteChatMessage, UpdateChatMessage } from '../../utils/ChatMessageStorage';
import { GetPlayerData } from '../../utils/PlayerStorage';
import { ThemeProvider, ChatList, ChatListItem, Avatar, Column, Subtitle, Row, Title, IconButton, SendIcon } from '@livechat/ui-kit'


const ChatMessage = props => {

    let userId = localStorage.getItem('User ID');
    let gameId = localStorage.getItem('Game ID');
    let playerId = localStorage.getItem('Player ID');
    let squadId = localStorage.getItem('Squad ID');
    let playerFaction = localStorage.getItem('Faction');

    const [chatRoom, setChatRoom] = useState('ALL');
    const [refresh, setRefresh] = useState(false);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [validInput, setValidInput] = useState(false);
    const [messageToUpdateId, setMessageToUpdateId] = useState(0);
    const [isEditingMessage, setIsEditingMessage] = useState(false);
    const [messagesAndPlayersObjects, setmessagesAndPlayersObjects] = useState([]);

    useEffect(() => {
        if (userId !== 'null' && userId !== null) {
            if (playerId !== 'null' && playerId !== null) {
                if (gameId !== 'null' && gameId !== null) {
                    if (playerFaction !== 'null' && playerFaction !== null) {
                        let request = {
                            gameId: gameId,
                            playerId: playerId,
                            squadId: null,
                            faction: chatRoom
                        }
                        fetchMessages();
                    } else {
                        alert('Faction missing.');
                        props.history.push("/landing");
                    }
                } else {
                    alert('Game ID missing.');
                    props.history.push("/landing");
                }
            } else {
                alert('Player ID missing.');
                props.history.push("/landing");
            }
        } else {
            alert('User ID missing.');
            props.history.push("/landing");
        }
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [refresh])

    useInterval(() => {
        fetchMessages()
    }, 5000);

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

    async function fetchMessages() {
        let request;
        switch (chatRoom) {
            case 'ALL':
                request = {
                    gameId: gameId,
                    playerId: playerId,
                    squadId: null,
                    faction: 'ALL'
                }
                break;
            case 'FACTION':
                request = {
                    gameId: gameId,
                    playerId: playerId,
                    squadId: null,
                    faction: playerFaction
                }
                break;
            case 'SQUAD':
                request = {
                    gameId: gameId,
                    playerId: playerId,
                    squadId: squadId,
                    faction: playerFaction
                }
                break;
            default:
                break;
        }
        let messages = await GetBundleOfChatMessages(request);
        if (messages !== null) {
            setChatMessages(messages);
        } else {
            alert('Failed to fetch messages');
            setChatMessages([]);
        }
    }

    function selectChatRoom(ev) {
        let room = ev.target.value;
        setChatRoom(room);
        handleCancelEditingMessage()
        setRefresh(!refresh);
    }

    const onMsgChanged = ev => {
        let currentInput = ev.target.value;
        if (currentInput.length < 1) {
            setValidInput(false);
        }
        else {
            setValidInput(true);
        }
        setMessage(currentInput);
    }

    const prepareMessageObject = () => {
        let msgObject;
        let time = new Date().getTime();
        switch (chatRoom) {
            case 'ALL':
                msgObject = {
                    message: message,
                    faction: 'ALL',
                    gameId: gameId,
                    playerId: playerId,
                    squadId: 'null',
                    timestamp: time
                }
                break;
            case 'FACTION':
                msgObject = {
                    message: message,
                    faction: playerFaction,
                    gameId: gameId,
                    playerId: playerId,
                    squadId: 'null',
                    timestamp: time
                }
                break;
            case 'SQUAD':
                msgObject = {
                    message: message,
                    faction: playerFaction,
                    gameId: gameId,
                    playerId: playerId,
                    squadId: squadId,
                    timestamp: time
                }
                break;
            default:
                break;
        }
        return msgObject;
    }

    async function sendMessage() {
        let msg = prepareMessageObject();
        const response = await CreateMessage(msg);
        resetTextField()
        if (response !== null) {
            setRefresh(!refresh);
        } else {
            alert("Failed to send message! Failed to create.")
        }
    }

    function handleClickEnterToSendMessage(ev) {
        console.log(ev.keyCode)
        if (ev.keyCode === 13) {
            sendMessage();
        }
    }

    async function handleDeleteMessage(msgId) {
        const response = await DeleteChatMessage(msgId);
        if (response !== null) {
            setRefresh(!refresh);
        } else {
            alert("Failed to send message! Failed to delete.")
        }
    }

    function checkIfPlayerIsAuthor(msgAuthorId) {
        if (playerId === msgAuthorId.toString()) {
            return true;
        }
    }
    function handleEditMessage(msgId) {
        setMessageToUpdateId(msgId)
        setIsEditingMessage(true)
    }

    function handleUpdateMessage(msgId) {
        if (msgId === messageToUpdateId) {
            return true;
        }
    }

    function resetTextField() {
        const textField = document.getElementById("messageInput");
        textField.value = ""
    }

    async function sendUpdatedMessage() {
        let updatedMesageObj = {
            message: message,
            chatMessageId: messageToUpdateId
        }
        let response = await UpdateChatMessage(updatedMesageObj)

        if (response !== null) {
            setIsEditingMessage(false);
            setRefresh(!refresh);
            setMessageToUpdateId(0)
        } else {
            alert("Failed to edit message! Failed to delete.")
        }
    }

    function handleCancelEditingMessage() {
        setIsEditingMessage(false);
    }

    return (
        <>
            <ButtonGroup >
                <Button variant="dark"
                    onClick={selectChatRoom}
                    value="ALL" >Global</Button>
                <Button variant="dark"
                    onClick={selectChatRoom}
                    value="FACTION">Faction</Button>
                <Button variant="dark"
                    disabled={squadId === 'null'}
                    onClick={selectChatRoom}
                    value="SQUAD">Squad</Button>
            </ButtonGroup>
            <br />
            <ThemeProvider>
                <ChatList >
                    {chatMessages.map((chatMessage) =>
                        <ChatListItem key={chatMessage.chatMessageId}>
                            <Avatar imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg" />
                            <Column fill>
                                <Row justify>
                                    <Title ellipsis>{chatMessage.username}</Title>
                                    <Subtitle nowrap>{chatMessage.stringTimestamp}</Subtitle>
                                    {chatRoom === "ALL" ? <p>Hello All</p> :
                                     chatRoom === "FACTION" ? <p>Hello Faction</p> :
                                     chatRoom === "SQUAD" ? <p>Hello Squad</p> :null
                                    }
                                </Row>
                                <Subtitle >
                                    <div>
                                        {handleUpdateMessage(chatMessage.chatMessageId) && isEditingMessage ?
                                            <Form.Group>
                                                <Form.Control type="text"
                                                    placeholder="Edit your message..."
                                                    onChange={onMsgChanged}
                                                    defaultValue={chatMessage.message} />
                                                <Button variant="info"
                                                    size="sm"
                                                    onClick={sendUpdatedMessage}>Update</Button>
                                                <Button className="m-2"
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={handleCancelEditingMessage}>Cancel</Button>
                                            </Form.Group>
                                            : chatMessage.message
                                        }
                                    </div>
                                    <div>
                                        {checkIfPlayerIsAuthor(chatMessage.playerId) && !isEditingMessage ?
                                            <Subtitle >
                                                <Button id="sendMessage"
                                                    className="m-1"
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleEditMessage(chatMessage.chatMessageId)}> Edit</Button>
                                                <Button variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteMessage(chatMessage.chatMessageId)}> Delete</Button>
                                            </Subtitle>
                                            : null}
                                    </div>
                                </Subtitle>
                            </Column>
                        </ChatListItem>
                    )}
                </ChatList>

                <Form.Group>
                    <Form.Control onKeyUp={handleClickEnterToSendMessage} id="messageInput" type="text" placeholder="Enter a message" onChange={onMsgChanged} />
                    <IconButton disabled={!validInput} onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>
                </Form.Group>
            </ThemeProvider>
        </>
    );
};
export default ChatMessage;