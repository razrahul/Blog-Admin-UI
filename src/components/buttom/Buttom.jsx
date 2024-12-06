import React, { useState, useEffect } from "react";
import "./Buttom.scss";

const ButtonWithPopup = ({ children, onConfirm, onCancel }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [Message , setMessage] = useState("")
  const [FirstOption, setFirstOption] = useState("");

  useEffect(() => {
    if (children === "Verify") {
      setMessage("Verify this user? After verification, the user will get access to blog uploads.");
      setFirstOption("Verify");
    } else if (children === "Public") {
      setMessage("You want to Private this user account ?");
      setFirstOption("Private");
    } else if (children === "unblock") {
      setMessage("Do you want to block this user?");
      setFirstOption("Block");
    }
  }, [children]); // Run this effect whenever `children` changes

  const handleConfirm = () => {
    setIsPopupOpen(false);
    if (onConfirm) onConfirm();
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    if (onCancel) onCancel();
  };

  // console.log(children)

  return (
    <div className="button-with-popup">
      <button className="trigger-button" onClick={() => setIsPopupOpen(true)}>
        {children}
      </button>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{Message}</p>
            <div className="popup-actions">
              <button className="confirm-button" onClick={handleConfirm}>
                {FirstOption}
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonWithPopup;
