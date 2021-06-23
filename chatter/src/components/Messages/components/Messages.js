import React, { useContext, useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import TypingMessage from "./TypingMessage";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import "../styles/_messages.scss";
import INITIAL_BOTTY_MESSAGE from "../../../common/constants/initialBottyMessage";

const socket = io(config.BOT_SERVER_ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
});

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([
    { user: "bot", message: INITIAL_BOTTY_MESSAGE },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  socket.on(
    "bot-message",
    useCallback(
      (message) => {
        setIsTyping(false);
        setIsBotTyping(false);
        setLatestMessage("bot", message);
        setMessageList([...messageList, { user: "bot", message: message }]);
      },
      [messageList, setLatestMessage]
    )
  );

  socket.on(
    "bot-typing",
    useCallback(() => {
      setIsTyping(true);
      setIsBotTyping(true);
    }, [])
  );

  const sendMessage = useCallback(() => {
    socket.emit("user-message", message);

    setLatestMessage("me", message);
    setMessageList([...messageList, { user: "me", message: message }]);
    setMessage("");
  }, [message, messageList, setLatestMessage]);

  const onChangeMessage = useCallback((e) => setMessage(e.target.value), []);

  const generateMessageList = messageList.map((msg, index) => (
    <Message
      key={index}
      message={{ ...msg, id: index }}
      botTyping={isBotTyping}
    />
  ));

  useEffect(() => {
    document
      .getElementById("message-list")
      .scrollTo(0, document.getElementById("message-list").scrollHeight);
  }, [messageList]);

  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
        {generateMessageList}
        {isTyping && <TypingMessage />}
      </div>
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  );
}

export default Messages;
