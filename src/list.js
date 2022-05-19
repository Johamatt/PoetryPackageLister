import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "./Modal";

export default function List(props) {
  const [show, setShow] = useState(false);

  const [pack, setPack] = useState([]);

  function showModal(pack) {
    setPack(pack);
    setShow(true);
  }

  if (show) {
    return (
      <div>
        <Modal
          pack={pack}
          packagelist={props}
          show={true}
          onClose={() => setShow(false)}
        />
      </div>
    );
  }

  return (
    <div>
      <ul>
        {props.array.map((pack) => {
          return (
            <li
              className="list-group-item"
              key={pack.name}
              onClick={() => showModal(pack)}
            >
              {pack.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
