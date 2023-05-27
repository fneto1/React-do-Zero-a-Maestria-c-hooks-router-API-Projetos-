import styles from "./Cars.module.css"
import {useState} from 'react'

const Cars = () => {

  const [cars] = useState([
    {id: 1, modelo: "Uno", marca: "Fiat", cor: "Azul"},
    {id: 2, modelo: "Civic", marca: "Honda", cor: "Preto"},
    {id: 3, modelo: "Fox", marca: "VW", cor: "Branco"}
  ])

  return (
    <>
      {cars.map((car) => (
        <div className={styles.container}>
        <h1>{car.modelo}</h1>
        <h2>{car.marca}</h2>
        <h2>{car.cor}</h2>
        </div>
      ))}
    </>
  )
}

export default Cars