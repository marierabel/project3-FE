import React, { useState, useEffect } from "react";
import SidebarMsg from "../components/messagerie/SidebarMsg";
import ConversationPage from "./Conversation";
import "../stylesheets/messagerie.css";
import apiHandler from "../utils/apiHandler";

function Messagerie() {
  const [messageType, setMessageType] = useState("student");
  const [idConv, setIdConv] = useState("");
  const [allConversations, setAllConversations] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function getAllConversations() {
      try {
        const response = await apiHandler.getConversations(messageType);

        setAllConversations(response.data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
    getAllConversations();
  }, [messageType]);

  function messageTypeChange() {
    messageType === "student"
      ? setMessageType("professor")
      : setMessageType("student");
    console.log(messageType);
  }

  console.log(messageType);

  return (
    <div className="messagerie">
      My messages
      <div
        className="togglebtn"
        onClick={() => {
          messageTypeChange();
          //   getAllConversations(messageType);
        }}
      >
        <div className="flexToggle">
          <div
            className={
              messageType === "professor"
                ? "navetteProfessor"
                : "navetteStudent"
            }
          ></div>
          <div
            className={
              messageType === "student" ? "labelColorChecked" : "labelColor"
            }
          >
            Student
          </div>
          <div
            className={
              messageType === "professor" ? "labelColorChecked" : "labelColor"
            }
          >
            Professor
          </div>
        </div>
      </div>
      <div className="convFrame">
        <SidebarMsg
          messageType={messageType}
          setIdConv={setIdConv}
          allConversations={allConversations}
        />
        <ConversationPage idConv={idConv} messageType={messageType} />
      </div>
    </div>
  );
}

export default Messagerie;
