import { useLayoutEffect, useState, useEffect } from 'react'

const HookUseLayoutEffect = () => {
    const [name, setName] = useState("Cobra")

    useEffect(() => {
        console.log("2")

        setName("Mudou de novo! - 2")
    }, [])

    useLayoutEffect(() => {
        console.log("1")

        setName("Novo nome - 1")
    }, [])

    console.log(name);
  return (
    <div>
        <h2>HookUseLayoutEffect</h2>
        <p> {name} </p>
    </div>
  )
}

export default HookUseLayoutEffect