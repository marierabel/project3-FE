import React from "react";
import MsgConv from "../components/messagerie/MsgConv";
import { useState, useEffect } from "react";
import apiHandler from "../utils/apiHandler";
import { Await, useParams } from "react-router-dom";

function ConversationPage() {
  const [myMessages, setMyMessages] = useState([]);

  const [error, setError] = useState(null);
  const { conversationId } = useParams();

  async function getMessages() {
    try {
      const response = await apiHandler.convMessages(conversationId);

      setMyMessages(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      <div>messages</div>
      <MsgConv
        myMessages={myMessages}
        conversationId={conversationId}
        reload={getMessages}
      />
    </>
  );
}

export default ConversationPage;
