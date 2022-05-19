import React from "react";
import List from "./List";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  console.log(props.pack.extras);
  console.log(props.pack.extras);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Package info</h4>
        </div>
        <div className="modal-body">
          <p>Name: {props.pack.name}</p>
          <p>Description: {props.pack.description}</p>

          <div>
            {Object.keys(props.pack.extras).length !== 0 ? (
              Object.keys(props.pack.extras).map((key) => {
                console.log(props.pack.extras[key]);

                return (
                  <div >
                    <p >
                      <b>{key}:</b>
                    </p>
                    <ul>
                      {props.pack.extras[key].map((value) => {
                        return (

                            // <a /> packages onClick return modal


                          <li className="modal-dependencies">
                            {" "}
                            {value},&nbsp;
                          </li>

                        );
                      })}
                    </ul>
                  </div>
                );
              })
            ) : (
              <div />
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
