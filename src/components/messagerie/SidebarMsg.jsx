import React, { useState, useEffect } from "react";
import CardSidebarMsg from "./CardSidebarMsg";
import "../../stylesheets/sidebarMsg.css";

function SidebarMsg({ setIdConv, allConversations }) {
  return (
    <>
      <div className="sidebarMsg">
        <p>My conversations</p>
        {allConversations.map((conv) => {
          return (
            <CardSidebarMsg
              lesson={conv.lesson}
              student={conv.student}
              title={conv.title}
              professorPseudo={conv.professorPseudo}
              id={conv._id}
              setIdConv={setIdConv}
            />
          );
          // return (
          //   <div>
          //     <h1>{conv.lesson}</h1>
          //     <p>{conv.student}</p>
          //   </div>
          // );
        })}
      </div>
    </>
  );
}

export default SidebarMsg;
