import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button, Form, Container } from 'react-bootstrap';
import { CreateMessage, GetBundleOfChatMessages } from '../../utils/chatMessageStorge';
import { ThemeProvider, ChatList, ChatListItem, Avatar, Column, Subtitle, Row, Title, IconButton, SendIcon } from '@livechat/ui-kit'


const ChatMessage = props => {

    const [chatMessage, setMsgText] = useState('');
    const [validInput, setValidInput] = useState(false);
    const [invalidInputMessage, setInvalidInputMessage] = useState('');
    const [playerId, setPlayerId] = useState(localStorage.getItem('Player ID'));
    const [gameId, setGameId] = useState(localStorage.getItem('Game ID'));
    const [squadId, setSquadId] = useState(0);
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
        if (localStorage.getItem('Squad ID') !== null) {
            setSquadId(localStorage.getItem('Squad ID'))
            setMsgObject((prevState) => ({
                ...prevState,
                squadId: squadId,
            }));
        }
    }, []);

    useInterval(() => {
        getChatMessagesBySelectedChatRoom(msgObject)
    }, 1000);

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
        if (currentInput.length < 2) {
            setValidInput(false);
        }
        else {
            setValidInput(true);
        }
    }

    function createMessageObject(msg) {
        setMsgObject((prevState) => ({
            ...prevState,
            message: msg,
        }));
    }

    const sendMessage = (ev) => {
        CreateMessage(msgObject)
        getChatMessagesBySelectedChatRoom(msgObject)
    }

    return (
        <>
            <Container >
                <ButtonGroup >
                    <Button variant="secondary" onClick={getSelectedChatRoom} value="ALL">Global</Button>
                    <Button variant="secondary" onClick={getSelectedChatRoom} value="FACTION">faction</Button>
                    <Button variant="secondary" onClick={getSelectedChatRoom} value="SQUAD">Squad</Button>
                </ButtonGroup>
                <br />
                <ThemeProvider>
                    <ChatList >
                        {allChatMessages.map((chatMessage) =>
                            <ChatListItem key={chatMessage.chatMessageId}>
                                <Avatar imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg" />
                                <Column fill>
                                    <Row justify>
                                        <Title ellipsis>{'Michael'}</Title>
                                        <Subtitle nowrap>{'14:31 PM'}</Subtitle>
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
                        {!validInput ? <p>{invalidInputMessage}</p> : null}
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