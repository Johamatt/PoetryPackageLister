import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Modal = (props) => {
  const [pack, setPack] = useState(props.pack);
  const [packagelist, setPackagelist] = useState(props.packagelist.array);

  useEffect(() => {}, [searchDependecy]);

  if (!props.show) {
    return null;
  }

  function searchDependecy(dependency) {
    packagelist.map((pack1) => {
      if (dependency.includes(pack1.name)) {
        setPack(pack1);
      }
    });
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Package info</h4>
        </div>
        <div className="modal-body">
          <p>Name: {pack.name}</p>
          <p>Description: {pack.description}</p>

          <div>
            <h2>Packages Extra: </h2>
            {Object.keys(pack.extras).length !== 0 ? (
              Object.keys(pack.extras).map((key) => {
                return (
                  <div>
                    <ul>
                      <b>{key}: </b>
                      {pack.extras[key].map((dependency) => {
                        return (
                          <li
                            className="modal-dependencies"
                            onClick={() => searchDependecy(dependency)}
                          >
                            {/* // <a /> packages onClick name returns modal */}{" "}
                            {dependency},&nbsp;
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

            {Object.keys(pack.dependencies).length !== 0 ? (
              Object.keys(pack.dependencies).map((key) => {
                return (
                  <div>
                    <ul>
                      <b>{key}: </b>
                      {pack.dependencies[key].map((dependency) => {
                        return (
                          <li
                            className="modal-dependencies"
                            onClick={() => searchDependecy(dependency)}
                          >
                            {/* // <a /> packages onClick name returns modal */}{" "}
                            {dependency},&nbsp;
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
