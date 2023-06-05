import {useState} from 'react'

const HookUseState = () => {
    //1 - useState
    let userName = "João"
    const [name, setName] = useState("Cobra")

    const changeName = () => {
        userName = "Pechuga"

        setName("Pollo")
    }

    //2 - useState e input
    const [age, setAge] = useState(18)

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(age)
    }

  return (
    <div>
        {/* 1 - useState */}
        <h2>useState</h2>
        <p>Variável: {userName} </p>
        <p>useState: {name} </p>
        <button onClick={changeName} > Teste</button>

        <br />
        
        {/* 2 - useState e input */}
        <h2>useState e input</h2>
        <form onSubmit={handleSubmit} >
            <input type="text" value={age} onChange={(e) => setAge(e.target.value) } />
        <button type="submit">Enviar</button>
        </form>
        <p>Você tem: {age} </p>
        <hr />
    </div>
  )
}

export default HookUseState