import React from 'react'


export default function list(props) {



    const packagelist = props.array.map((pack) =>
    <li>{pack.name}</li>
  );

  return (
        <ul>{packagelist}</ul>

  )
  
}



