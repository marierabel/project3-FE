import React, { useEffect, useState } from "react";
import apiHandler from "../../utils/apiHandler";
import { useNavigate } from "react-router-dom";

function MsgConv({ myMessages, conversationId, reload, create }) {
  const [msgContent, setMsgContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleOnChange(e) {
    setMsgContent(e.target.value);
  }

  async function handleSendMessage(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      try {
        await apiHandler.createMessage({ content: msgContent }, conversationId);
        await reload();
        setMsgContent("");
        if (create) {
          navigate("/users/messagerie");
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
  }

  // useEffect(() => {
  //   const reloadMsg = setInterval(() => {
  //     reload();
  //   }, 50000);
  // }, []);

  return (
    <div>
      {myMessages &&
        myMessages.map((msg) => {
          return <div>{msg.content}</div>;
        })}
      <textarea
        onChange={handleOnChange}
        onKeyUp={handleSendMessage}
        name="content"
        id="content"
        value={msgContent}
      ></textarea>
    </div>
  );
}

export default MsgConv;
