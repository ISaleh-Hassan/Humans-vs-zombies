import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button } from 'react-bootstrap';
import { CreateMessage, GetBundleOfChatMessages } from '../../utils/chatMessageStorge';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


const ChatMessage = props => {

    const [chatMessage, setMsgText] = useState('');
    const [validInput, setValidInput] = useState(false);
    const [invalidInputMessage, setInvalidInputMessage] = useState('');
    const [playerId, setPlayerId] = useState(2);
    const [gameId, setGameId] = useState(2);
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
    const classes = useStyles();

    useEffect(() => {
        getChatMessagesBySelectedChatRoom(msgObject)
    }, [msgObject.faction]);

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
            faction: selectedRoom,
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
                <Button variant="secondary" onClick={getSelectedChatRoom} value="SQUAD">Squad</Button>
            </ButtonGroup>
            <br />

            {allChatMessages.map((chatMessage) =>
                <li key={chatMessage.chatMessageId}>{chatMessage.message}</li>)}
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Ali Connors
                             </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <input type="text" placeholder="Enter a message" onChange={onMsgChanged} />
            { !validInput ? <p>{invalidInputMessage}</p> : null}

            <Button disabled={!validInput} onClick={sendMessage}>Send</Button>
        </>
    );
};
export default ChatMessage;