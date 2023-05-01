import { useState, useRef, useEffect} from "react"
import styled, { css } from "styled-components"

function Segment2({name, id, title, groupname, index, setControlW, setControlL}){
    const segmentRef = useRef();
    const [activeIndex, setActiveIndex] = useState();
    useEffect(() => {
        if(index === activeIndex){
            const {offsetWidth, offsetLeft} = segmentRef.current
            setControlW(offsetWidth)
            setControlL(offsetLeft)
        }
        
    },[activeIndex]);
    
    return( 
      <>
        <input type="radio" className="" name={groupname} id={id} value={id} 
            onChange={
                (e)=>{
                setActiveIndex(index)
                const {offsetWidth, offsetLeft} = segmentRef.current
                    setControlW(offsetWidth)
                    setControlL(offsetLeft)
                }
            }  
        />
        <label for={id} ref={segmentRef}>{title}</label>
      </>
    )
}

export default Segment2