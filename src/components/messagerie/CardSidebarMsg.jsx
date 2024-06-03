import React from "react";

function CardSidebarMsg({ lesson, student, id, setIdConv }) {
  return (
    <>
      <div
        onClick={() => {
          setIdConv(id);
        }}
      >
        <h1>{lesson}</h1>
        <p>{student}</p>
      </div>
    </>
  );
}

export default CardSidebarMsg;
