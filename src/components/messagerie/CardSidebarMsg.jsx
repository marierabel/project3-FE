import React from "react";
import "../../stylesheets/cardSidebarMsg.css";

function CardSidebarMsg({
  lesson,
  student,
  id,
  setIdConv,
  professorPseudo,
  title,
}) {
  return (
    <>
      <div
        className="cardMsg"
        onClick={() => {
          setIdConv(id);
        }}
      >
        <h1>{title}</h1>
        <p>from {professorPseudo}</p>
      </div>
    </>
  );
}

export default CardSidebarMsg;
