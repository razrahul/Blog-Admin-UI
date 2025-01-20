import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ConButton.scss"; // Import SCSS

const DeleteButton = ({
  children,
  onConfirm,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item?",
  buttonClass = "",
}) => {
  const [open, setOpen] = useState(false);

  // Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    onConfirm(); // Call delete logic
    handleClose();
  };

  return (
    <>
      {/* Delete Trigger Button */}
      <button className={`Condelete-btn ${buttonClass}`} onClick={handleOpen}>
        {children || "Delete"}
      </button>

      {/* Confirmation Modal */}
      {open && (
        <div className="buttton-overlay ">
          <div className="buttton">
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="buttton-actions">
              <button className="confirm-btn" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="cancel-btn" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
          </div>
        
      )}
    </>
  );
};

// Prop validation
DeleteButton.propTypes = {
  children: PropTypes.node,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonClass: PropTypes.string,
};

export default DeleteButton;
