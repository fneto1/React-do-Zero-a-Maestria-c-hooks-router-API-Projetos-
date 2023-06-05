import { useEffect, useState } from 'react'

const HookUseEffect = () => {
    //1 - useEffect sem array de dependencias
    useEffect(() => {
        console.log("Estou sendo executado");
    })

    const [number, setNumber] = useState(1)

    const changeSomething = () => {
        setNumber(number + 1)
    }

    //2 - useEffect com o array de dependencias vazio

    useEffect(() => {
        console.log("Estou sendo executado apenas uma vez");
    }, [])

    //3 - useEffect com o array de dependencias preenchido
    const [anotherNumber, setAnotherNumber] = useState(0)

    useEffect(() => {
        if (anotherNumber > 0) {
            console.log("Sou executado apenas quando o anotherNumber muda!");
        }
    }, [anotherNumber])

    const changeAnotherNumber = () => {
        setAnotherNumber(anotherNumber + 1)
    }

    //4 - cleanup do useEffect
    useEffect(() => {

/*         const timer = setTimeout(() => {
            console.log("Hello world");

            setAnotherNumber(anotherNumber + 1)
        }, 2000) */

        //return () => clearTimeout(timer)

    }, [anotherNumber])

    return (
        <div>
            <h1>useEffect</h1>
            <p> {number} </p>
            <button onClick={changeSomething} >Change</button>
            <br />
            <p> Outro número: {anotherNumber} </p>
            <button onClick={changeAnotherNumber} >Change</button>

            <hr />
        </div>
    )
}

export default HookUseEffect