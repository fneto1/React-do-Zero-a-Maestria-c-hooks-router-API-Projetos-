import { useState, useCallback, useEffect } from "react"

const List = ({getItems}) => {

  const [myItems, setMyItems] = useState([])

  useEffect(() => {

    console.log("Buscando itens do db...");

    setMyItems(getItems)

  }, [getItems] )

  return (
    <div>
      { myItems && myItems.map((item) =>(
        <p id={item} > {item} </p>
      )) }
    </div>
  )
}

export default List