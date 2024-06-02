import React from "react";

function cardSidebarMsg(myMessages) {
  return (
    <>
      {myMessages.map((message) => {
        return (
          <div key={message._id}>
            <h2>{message.title}</h2>
            <h3>{message.envoy}</h3>
            <p>{message.content}</p>
          </div>
        );
      })}
      <div>cardSidebarMsg</div>
    </>
  );
}

export default cardSidebarMsg;
