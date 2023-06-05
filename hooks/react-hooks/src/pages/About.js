import React from 'react'

//context
import { useContext } from 'react'
import { SomeContext } from '../components/HookUseContext'

const About = () => {

  const { contextValue: value, newContext  } = useContext(SomeContext)

  return (
    <div>
      <h1>About</h1>
      <h2>useContext</h2>
      <p>Valor do context: {value} </p>
      <p>Valor do new context: {newContext} </p>
    </div>
  )
}

export default About