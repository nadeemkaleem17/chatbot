import React, { useState } from "react";
import "./InputText.css";
export const InputText = ({ handleSendMessage }) => {
  const [input, setInput] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsButtonEnabled(e.target.value.trim() !== "");
  };

  const onSendMessage = () => {
    if (input.trim()) {
      console.log("input: ", input);
      handleSendMessage(input);
      setInput("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="chat-input-container chat-input position-fixed bottom-0 start-0 w-100">
      <div className="text-area-parent-div d-flex align-items-center position-relative">
        <textarea
          className="text-area form-control"
          id="remarks"
          rows="4"
          placeholder="Message Chatbot..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ backgroundColor: "#f2f2f2" }}
        ></textarea>

        <button
          className={`send-button position-absolute ${
            !isButtonEnabled ? "disabled not-enabled-style" : "enabled-style"
          }`}
          onClick={onSendMessage}
          disabled={!isButtonEnabled}
        >
          <i className="fa-solid fa-circle-arrow-up"></i>
        </button>
      </div>
    </div>
  );
};
