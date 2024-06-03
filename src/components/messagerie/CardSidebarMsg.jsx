import React from "react";

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
        onClick={() => {
          setIdConv(id);
        }}
      >
        <h1>{title}</h1>
        <p>{professorPseudo}</p>
      </div>
    </>
  );
}

export default CardSidebarMsg;
