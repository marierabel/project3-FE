import React, { useState } from "react";
import apiHandler from "../../utils/apiHandler";

function MsgConv({ myMessages, conversationId, reload }) {
  const [msgContent, setMsgContent] = useState("");
  const [error, setError] = useState(null);

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
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
  }

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
