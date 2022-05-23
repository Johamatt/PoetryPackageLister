import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Modal = (props) => {
  const [pack, setPack] = useState(props.pack);
  const [packagelist, setPackagelist] = useState(props.packagelist.array);
  const [packagelistString, setPackagelistString] = useState([]);

  useEffect(() => {
    setPackagelistString(
      packagelist.map((a) => {
        return a.name;
      })
    );
  }, []);

  if (!props.show) {
    return null;
  }

  function searchLinkedDependecy(name) {
    packagelist.map((pack1) => {
      if (name === pack1.name) {
        setPack(pack1);
      }
    });
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{pack.name}</h4>
        </div>
        <div className="modal-body">
          <p>Name: {pack.name} </p>
          <p>Description: {pack.description}</p>
          <div>
            <h2>Dependencies: </h2>
            <div>
              <ul>
                {pack.dependencies.length !== 0 ? (
                  pack.dependencies.map((name) => {
                    if (!packagelistString.includes(name)) {
                        return (
                          <li className="modal-dependencies">{name}</li>
                        );
                      } else {
                        return (
                          <li
                            className="modal-dependencies"
                            onClick={() => searchLinkedDependecy(name)} 
                          > <i class="fa-solid fa-up-right-from-square"></i>
                            <a> {name}</a>
                          </li>
                        );
                      }
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
                    > <i class="fa-solid fa-up-right-from-square"></i>
                      <a> {a.name}</a>
                    </li>
                  );
                }
              })}
            </ul>
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
