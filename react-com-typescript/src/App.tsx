import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Greetings, { Cores } from "./components/Greetings";
import { type } from "os";

function App() {
  //1 - variaveis
  const name: string = "Cobra";
  const age: number = 27;
  const isWorking: boolean = false;

  //types
  type textOrNull = string | null;

  const myText: textOrNull = "Testando os types";
  let anotherText: textOrNull = null;

  //anotherText = "Meu texto";

  //2 - funções
  const saudacao = (name: string): string => {
    return `Olá, ${name}`;
  };

  return (
    <div className="App">
      <h1>TypeScript com React</h1>
      <h4>Nome: {name}</h4>
      <h5>Idade: {age} </h5>
      {isWorking ? (
        <p>Sim, está trabalhando.</p>
      ) : (
        <p>No momento não está trabalhando.</p>
      )}
      <p>{saudacao(name)}</p>
      <Greetings
        name="Wandão"
        tags={["saudação", "estudos", "typescript", "react"]}
        cores={Cores.AZ}
      />

      <h3> {myText} </h3>
      <h3> {anotherText} </h3>
    </div>
  );
}

export default App;
