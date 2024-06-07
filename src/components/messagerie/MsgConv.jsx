import React, { useEffect, useState, useContext } from "react";
import apiHandler from "../../utils/apiHandler";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "../../stylesheets/msgConv.css";

function MsgConv({
  myMessages,
  conversationId,
  reload,
  create,
  oneConv,
  setAppointment,
  appointment,
  messageType,
}) {
  const [msgContent, setMsgContent] = useState("");
  const [error, setError] = useState(null);
  const { user, refetchUser } = useContext(AuthContext);
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

  async function sayYesValidation() {
    if (user._id === oneConv.student) {
      try {
        const response = await apiHandler.updateAppointment(conversationId, {
          studValidation: true,
        });
        setAppointment(response.data);
        refetchUser();
      } catch (error) {
        setError(error.message);
      }
    } else if (user._id === oneConv.professorId) {
      try {
        const response = await apiHandler.updateAppointment(conversationId, {
          profValidation: true,
        });
        setAppointment(response.data);
        refetchUser();
      } catch (error) {
        setError(error.message);
      }
    }
  }

  function hideValidation(validation) {
    if (!oneConv) {
      return false;
    }
    return (
      (user._id === oneConv.student && validation.studValidation) ||
      (user._id === oneConv.professorId && validation.profValidation)
    );
  }

  function olderThan3d(createdAt) {
    return Date.now() - new Date(createdAt).valueOf() > 5000;
  }

  useEffect(() => {
    const reloadMsg = setInterval(() => {
      reload();
    }, 50000);
  }, []);

  return (
    <div className="msgConv">
      {myMessages &&
        myMessages.messages.map((msg) => {
          return (
            <div
              className={
                msg.author === user._id
                  ? "userMsg"
                  : msg.author === "665ee345239f0115301f2f48"
                  ? "botMsg"
                  : "otherMsg"
              }
            >
              {msg.content}
            </div>
          );
        })}
      {myMessages &&
        myMessages.validations[0] &&
        olderThan3d(myMessages.validations[0].createdAt) &&
        !hideValidation(myMessages.validations[0]) && (
          <>
            <div className="confirmation">
              <p>Can you confirm that the appointment took place?</p>
              <button onClick={() => sayYesValidation()}>Yes!</button>
              <button>No...</button>
            </div>
          </>
        )}
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
