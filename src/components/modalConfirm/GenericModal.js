import React from "react";

function GenericModal(props) {
  return (
    <React.Fragment>
      <div className="modal-container">
        <div className="modal-box">
          <div className="modal-content">{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GenericModal;
