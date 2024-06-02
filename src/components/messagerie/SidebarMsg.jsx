import React from "react";
import cardSidebarMsg from "./CardSidebarMsg";

function SidebarMsg(myMessages) {
  return (
    <>
      <cardSidebarMsg myMessages={myMessages} />
      <div>SidebarMsg</div>
    </>
  );
}

export default SidebarMsg;
