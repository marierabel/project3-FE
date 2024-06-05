import React from "react";
import MsgConv from "../components/messagerie/MsgConv";
import { useState, useEffect } from "react";
import apiHandler from "../utils/apiHandler";
import { useParams } from "react-router-dom";

function ConversationPage({ idConv, create }) {
  const [myMessages, setMyMessages] = useState(null);
  const [error, setError] = useState(null);
  const [display, setDisplay] = useState(true);
  const [oneConv, setOneConv] = useState();
  const [appointment, setAppointment] = useState();
  const { conversationId } = useParams();

  async function getMessages() {
    try {
      const response = await apiHandler.convMessages(idConv || conversationId);

      setMyMessages(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function getOneConversation() {
    try {
      const response = await apiHandler.getOneConversation(
        idConv || conversationId
      );

      setOneConv(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    if (!idConv && !conversationId) {
      return;
    }
    getMessages();
    getOneConversation();
  }, [idConv]);

  function canWeDisplay() {
    if (idConv === "" && display === true) {
      setDisplay(false);
    } else if (idConv !== "" && display === false) {
      setDisplay(true);
    }
  }

  async function createAptm() {
    try {
      const response = await apiHandler.createAppointment(
        idConv || conversationId
      );
      setAppointment(response.data);
    } catch (error) {
      setError(error.message);
    }
    try {
      await apiHandler.createMessage(
        {
          content:
            "An appointment has been booked, congratulations! You'll recieve in few days a validation message asking you if the lesson actually took place. It has to be confirmed by the two parts for your thickets can be updated :)",
        },
        idConv || conversationId
      );
      getMessages();
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  canWeDisplay();

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
            oneConv={oneConv}
            setAppointment={setAppointment}
            appointment={appointment}
          />
          <button
            onClick={() => {
              createAptm();
            }}
          >
            Book a lesson
          </button>
        </>
      )}
    </>
  );
}

export default ConversationPage;
