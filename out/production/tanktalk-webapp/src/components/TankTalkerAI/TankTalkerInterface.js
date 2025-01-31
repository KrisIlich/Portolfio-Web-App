import React, { useEffect, useRef, useState} from 'react';
import { saveAsPDF } from '../shared/SaveAsPDF';
import '../../assets/styles/TankTalkerInterface.css'
import {clear} from "@testing-library/user-event/dist/clear";

// functional component for displaying the conversation interface
const TankTalkerInterface = ({conversation, isTyping}) => {

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"});}
    const [chatStarted, setChatStarted] = useState(false);



    useEffect(() => {
        if (conversation.length > 0 && !chatStarted){
            setTimeout(() => setChatStarted(true), 10);
        }
    }, [conversation, chatStarted]);

    useEffect(scrollToBottom, [conversation, isTyping]);


    // mapping over the conversation array and rendering each message
    return (
        <div className='tanktalker-interface'>
            <div className={`messages-container ${chatStarted ? 'chat-started' : ''}`}>
                {conversation.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <p>{message.text}</p>
                    </div>
                ))}
                {isTyping && (
                    <div className={"message ai"}>
                        <div className={'typing-indicator'}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default TankTalkerInterface;

