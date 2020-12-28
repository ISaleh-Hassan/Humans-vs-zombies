import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import { CreateMessage, GetBundleOfChatMessages, DeleteChatMessage } from '../../utils/ChatMessageStorage';
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
    const [updateMessage, setUpdateMessage] = useState(false);


    // const [timestamp, setTimeStamp] = useState(getTime());
    // const [playerData, setPlayerData] = useState(null);
    // const [playerSquadId, setPlayerSquadId] = useState(localStorage.getItem('Squad ID'));
    // const [msgObject, setMsgObject] = useState(
    //     {
    //         gameId: localStorage.getItem('Game ID'),
    //         playerId: localStorage.getItem('Player ID'),
    //         squadId: localStorage.getItem('Squad ID'),
    //         message: '',
    //         faction: 'ALL',
    //         timestamp: timestamp
    //     })

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
                        fetchMessages(request);
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

    const prepareMessageObject = (ev) => {
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
        sendMessage(msgObject);
    }

    async function sendMessage(msg) {
        const response = await CreateMessage(msg);
        if (response !== null) {
            setRefresh(!refresh);
        } else {
            alert("Failed to send message! Failed to create.")
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

    function handleEditMessage(msgId) {
        setUpdateMessage(true);
        console.log(msgId)
    }

    function onEditedMsgChanged(ev) {
        console.log(ev.target.value)
    }
    return (
        <>
            <ButtonGroup >
                <Button variant="dark" onClick={selectChatRoom} value="ALL" >Global</Button>
                <Button variant="dark" onClick={selectChatRoom} value="FACTION">Faction</Button>
                <Button variant="dark" disabled={squadId === 'null'} onClick={selectChatRoom} value="SQUAD">Squad</Button>
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
                                </Row>
                                <Subtitle >
                                    <div>
                                        {!updateMessage ? chatMessage.message :
                                            <Form.Group>
                                                <Form.Control type="text"
                                                 placeholder="edit your message"
                                                  onChange={onEditedMsgChanged}
                                                   />                 
                                            </Form.Group>
                                        }
                                    </div>
                                </Subtitle>
                                <Subtitle >
                                    <button onClick={() => handleEditMessage(chatMessage.chatMessageId)}> Edit</button>
                                    <button onClick={() => handleDeleteMessage(chatMessage.chatMessageId)}>Delete</button>
                                </Subtitle>
                            </Column>
                        </ChatListItem>
                    )}
                </ChatList>

                <Form.Group>
                    <Form.Control type="text" placeholder="Enter a message" onChange={onMsgChanged} />
                    <IconButton disabled={!validInput} onClick={prepareMessageObject}>
                        <SendIcon />
                    </IconButton>
                </Form.Group>
            </ThemeProvider>
        </>
    );
};
export default ChatMessage;