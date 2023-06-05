import { useReducer, useState } from "react"

const HookUseReducer = () => {

    //1 - useReducer

    const [number, dispatch] = useReducer((state, action) => {
        return Math.random(state)
    })

    // 2 - useReducer - action

    const initialTasks = [
        {id: 1, text:"fazer a tarefa 01"},
        {id: 2, text:"fazer a tarefa 02"}
    ]

    const taskReducer = (state, action) => {
        switch(action.type){
            case "ADD":
                const newTask = {
                    id: Math.random(),
                    text: taskText
                }

                setTaskText("")

                return [...state, newTask]

            case "DELETE":
                return state.filter((task) => task.id !== action.id)
            
            default:
                return state
        }

    }

    //adicionando novas tasks (states) com o reducer
    const [taskText, setTaskText] = useState("")

    const [tasks, dispatchTasks] = useReducer(taskReducer, initialTasks) //taskReducer: função que irá alterar o estado (state), initialTasks: state inicial


    const handleSubmit = (e) => {
        e.preventDefault()

        dispatchTasks({ type: "ADD" })
    }

    const removeTask = (id) => {
        dispatchTasks({ type: "DELETE", id })
    }

  return (
    <div>
        <h2>useReducer</h2>
        <p>Número: {number} </p>
        <button onClick={dispatch} >Alterar número</button>

        <br />

        <h2>useReducer com action</h2>
        <h3>Tarefas:</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setTaskText(e.target.value)} value={taskText} />
            <button type="submit">Cadastrar</button>
        </form>
        
        {tasks.map((task) => (
            <li key={task.id} onDoubleClick={() => removeTask(task.id)} > {task.text} </li>
        ))}

    </div>
  )
}

export default HookUseReducer