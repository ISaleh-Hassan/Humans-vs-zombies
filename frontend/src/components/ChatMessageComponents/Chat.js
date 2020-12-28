import React, { useEffect, useState } from "react";
import Header from "../StylingComponents/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import ChatMessage from "./ChatMessage";

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

const Chat = (props) => {

    return (
        <>
            <section className="home">
                <div className="container">
                    <Header />
                    <ChatMessage />
                </div>
            </section>
        </>
    );
};

export default Chat;