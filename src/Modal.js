import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Modal = (props) => {
  const [pack, setPack] = useState(props.pack);
  const [packagelist, setPackagelist] = useState(props.packagelist.array);

  const [reverseDependencies, setReverseDependencies] = useState([]);

  if (!props.show) {
    return null;
  }

  function searchLinkedDependecy(dependency) {
    packagelist.map((pack1) => {
      if (dependency === pack1.name) {
        // TODO: Include all optional dependencies as well, but
        // make clickable only those that are installed
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
            <h2>Dependencies: </h2>

            <div>
              <ul>
                {pack.dependencies.length !== 0 ? (
                  pack.dependencies.map((key) => {
                    return (
                      <li
                        className="modal-dependencies"
                        onClick={() => searchLinkedDependecy(key)}
                      >
                        {key},&nbsp;
                      </li>
                    );
                  })
                ) : (
                  <div />
                )}
              </ul>
            </div>
          </div>

          <h3>Reverse-Dependencies</h3>
          <div>
            <ul>
              {packagelist.map((a) => {
                if (a.dependencies.includes(pack.name)) {
                return (
                  <li
                    className="modal-dependecies"
                    onClick={() => searchLinkedDependecy(a.name)}
                  >
                    {a.name}, &nbsp;
                  </li>
                );
                }})}
            </ul>
          </div>

          {/* packagelist.map((a) => {
                if (a.dependencies.includes(pack.name)) {
                return (a.name);
                }
                }) */}
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
