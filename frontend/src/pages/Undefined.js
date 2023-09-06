import React, { useState } from "react";

function Undefined() {
  const [number, setNumber] = useState({
    first: 0,
    second: 0,
  });

  const [number2, setNumber2] = useState(0);

  return (
    <main>
      <h1>Not Found</h1>
      <p
        onClick={() =>
          setNumber((prevState) => ({
            ...prevState,
            first: prevState.first + 1,
          }))
        }
      >
        Increase1
      </p>
      <p
        onClick={() =>
          setNumber((prevState) => ({
            ...prevState,
            first: prevState.first - 1,
          }))
        }
      >
        Decrease1
      </p>
      <p onClick={() => setNumber({ ...number, second: number.second + 1 })}>
        Increase2
      </p>
      <p onClick={() => setNumber({ ...number, second: number.second - 1 })}>
        Decrease2
      </p>
      <p onClick={() => setNumber2((prevState) => prevState + 1)}>increase3</p>
      <p>{number.first}</p>
      <p>{number.second}</p>
      <p>{number2}</p>
    </main>
  );
}

export default Undefined;
