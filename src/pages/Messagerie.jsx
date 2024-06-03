import React, { useState } from "react";
import SidebarMsg from "../components/messagerie/SidebarMsg";
import ConversationPage from "./Conversation";

function Messagerie() {
  const [messageType, setMessageType] = useState("professor");
  const [idConv, setIdConv] = useState("");

  //   function CanWeDisplay() {
  //     if (idConv === "" && display === true) {
  //       setDisplay(false);
  //     }
  //   }

  //   CanWeDisplay();

  return (
    <div>
      messagerie
      <SidebarMsg messageType={messageType} setIdConv={setIdConv} />
      <ConversationPage idConv={idConv} />
    </div>
  );
}

export default Messagerie;
