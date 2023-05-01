import { useState, useEffect } from "react"

function Segment({name, id, title, index, defaultIndex = 0}){
  const [radio, setRadio] = useState(defaultIndex)
  const handleRadio = (index) => {
    setRadio(index)
  }

  useEffect(() => {
   
    
  },[radio]);
  
  return( 
      <>
        <input 
          type="radio" 
          name={name} 
          id={id} 
          value={id} 
          checked={radio === index} 
          onChange={ ()=> setRadio(index) } 
        />
        <label for={id}>{title}</label>
      </>
  )
}

export default Segment