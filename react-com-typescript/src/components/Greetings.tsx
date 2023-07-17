import React, { useState, ChangeEvent } from "react";

type Props = {
  name: string;
  tags: string[];
  cores: Cores;
};

export enum Cores {
  AZ = "Azul",
  PT = "Preto",
  BR = "Branco",
}

const Greetings = ({ name, tags, cores }: Props) => {
  const [cor, setCor] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCor(e.target.value);
  };

  return (
    <div>
      <h1>Esse é o poder do componente: {name}</h1>
      {tags.map((tag) => (
        <span> #{tag} </span>
      ))}

      <p>{cor}</p>
      <input type="text" onChange={handleChange} />
      <h4>{cores}</h4>
    </div>
  );
};

export default Greetings;
