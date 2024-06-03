import React, { useState, useEffect } from "react";
import CardSidebarMsg from "./CardSidebarMsg";
import apiHandler from "../../utils/apiHandler";

function SidebarMsg({ messageType, setIdConv }) {
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
  }, []);

  return (
    <>
      <div>SidebarMsg</div>
      {allConversations.map((conv) => {
        return (
          <CardSidebarMsg
            lesson={conv.lesson}
            student={conv.student}
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
    </>
  );
}

export default SidebarMsg;
