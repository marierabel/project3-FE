import React from "react";
import MsgConv from "../components/messagerie/MsgConv";
import { useState, useEffect } from "react";
import apiHandler from "../utils/apiHandler";
import { useParams } from "react-router-dom";

function ConversationPage({ idConv, create }) {
  const [myMessages, setMyMessages] = useState([]);
  const [error, setError] = useState(null);
  const [display, setDisplay] = useState(true);
  const { conversationId } = useParams();

  async function getMessages() {
    try {
      const response = await apiHandler.convMessages(idConv || conversationId);

      setMyMessages(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    if (!idConv && !conversationId) {
      return;
    }
    getMessages();
  }, [idConv]);

  function CanWeDisplay() {
    if (idConv === "" && display === true) {
      setDisplay(false);
    } else if (idConv !== "" && display === false) {
      setDisplay(true);
    }
  }

  CanWeDisplay();

  console.log(idConv, display, "conversation");

  return (
    <>
      <div>messages</div>

      {display && (
        <>
          <MsgConv
            myMessages={myMessages}
            conversationId={idConv || conversationId}
            idConv={idConv}
            reload={getMessages}
            create={create}
          />
          <button>Book a lesson</button>
        </>
      )}
    </>
  );
}

export default ConversationPage;
