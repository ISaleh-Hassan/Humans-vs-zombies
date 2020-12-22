import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button, Form, Container } from 'react-bootstrap';
import { CreateMessage, GetBundleOfChatMessages } from '../../utils/chatMessageStorge';
import { ThemeProvider, ChatList, ChatListItem, Avatar, Column, Subtitle, Row, Title, IconButton, SendIcon } from '@livechat/ui-kit'
import { makeStyles } from '@material-ui/core';
import { GetPlayerData } from '../../utils/PlayerStorage';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

const ChatMessage = props => {

    const [validInput, setValidInput] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [timestamp, setTimeStamp] = useState(getTime());
    const [playerData, setPlayerData] = useState(null);
    const [msgObject, setMsgObject] = useState(
        {
            gameId: localStorage.getItem('Game ID'),
            playerId: localStorage.getItem('Player ID'),
            squadId: localStorage.getItem('Squad ID'),
            message: '',
            faction: 'ALL',
            timestamp: timestamp
        })
    const [allChatMessages, setAllChatMessages] = useState([]);

    useEffect(() => {
        setPlayerData(GetPlayerData(localStorage.getItem('Player ID')));
        getChatMessagesBySelectedChatRoom(msgObject)
    }, [msgObject.faction]);

    useEffect(() => {
        getChatMessagesBySelectedChatRoom(msgObject)
    }, [refresh]);

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
        if (localStorage.getItem('Squad ID') !== null) {
            let squadId = localStorage.getItem('Squad ID')
            setMsgObject((prevState) => ({
                ...prevState,
                squadId: squadId,
            }));
        }
    }, []);

    useInterval(() => {
        getTime();
        getChatMessagesBySelectedChatRoom(msgObject)
    }, 10000);

    function getSelectedChatRoom(ev) {
        let chatRoom = ev.target.value;
        switch (chatRoom) {
            case 'ALL':
                setMsgObject((prevState) => ({
                    ...prevState,
                    faction: 'ALL',
                    squadId: 'null'
                }));
                break;

            case 'SQUAD':
                setMsgObject((prevState) => ({
                    ...prevState,
                    faction: playerData.faction,
                    squadId: localStorage.getItem('Squad ID')
                }));
                break

            case 'FACTION':
                setMsgObject((prevState) => ({
                    ...prevState,
                    faction: 'HUMAN',
                    squadId: 'null'
                }));
                break;
            default:
                console.log("Default")
        }
        getChatMessagesBySelectedChatRoom(msgObject)
        setRefresh(!refresh);
        return chatRoom;
    }

    function getChatMessagesBySelectedChatRoom(request) {
        GetBundleOfChatMessages(request)
            .then(response => response.json())
            .then(data => setAllChatMessages(data));
    }

    function getTime() {
        let time = new Date().getTime();
        return time;
    }

    const onMsgChanged = ev => {
        let currentInput = ev.target.value;
        let time = getTime();
        setTimeStamp(getTime());
        createMessageObject(currentInput, time)
        if (currentInput.length < 2) {
            setValidInput(false);
        }
        else {
            setValidInput(true);
        }
    }

    function createMessageObject(msg, time) {
        setMsgObject((prevState) => ({
            ...prevState,
            message: msg,
            timestamp: time
        }));
    }

    const sendMessage =(ev) => {
        CreateMessage(msgObject)
        getChatMessagesBySelectedChatRoom(msgObject)
    }

    return (
        <>
            <Container >
                <ButtonGroup >
                    <Button variant="secondary" onClick={getSelectedChatRoom} value="ALL">Global</Button>
                    <Button variant="secondary" onClick={getSelectedChatRoom} value="FACTION">faction</Button>
                    <Button variant="secondary" disabled={msgObject.squadId === 'null'} onClick={getSelectedChatRoom} value="SQUAD">Squad</Button>
                </ButtonGroup>
                <br />
                <ThemeProvider>
                    <ChatList >
                        {allChatMessages.map((chatMessage) =>
                            <ChatListItem key={chatMessage.chatMessageId}>
                                <Avatar imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg" />
                                <Column fill>
                                    <Row justify>
                                        <Title ellipsis>{chatMessage.username}</Title>
                                        <Subtitle nowrap>{chatMessage.stringTimestamp}</Subtitle>
                                    </Row>
                                    <Subtitle >
                                        {chatMessage.message}
                                    </Subtitle>
                                </Column>
                            </ChatListItem>
                        )}
                    </ChatList>

                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter a message" onChange={onMsgChanged} />
                        <IconButton disabled={!validInput} onClick={sendMessage}>
                            <SendIcon />
                        </IconButton>
                    </Form.Group>
                </ThemeProvider>
            </Container>
        </>
    );
};
export default ChatMessage;