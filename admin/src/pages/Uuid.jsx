import React from "react";
import { v4 as uuidv4 } from "uuid";

function Uuid() {
  const person = [
    { id: uuidv4(), name: "John", age: 32 },
    { id: uuidv4(), name: "John", age: 34 },
  ];
  return (
    <div>
      Uuid
      {person.map((data, i) => (
        <div key={uuidv4()}>
          <h2>{data.id}</h2>
          <h2>{data.name}</h2>
          <h2>{data.age}</h2>
        </div>
      ))}
    </div>
  );
}

export default Uuid;
