import React from "react";

const Trigger = ({ buttonRef, showModal }) => {
  return (
    <button
      ref={buttonRef}
      onClick={showModal}
    >
      Add New Shipping Address
    </button>
  );
};

export default Trigger;
