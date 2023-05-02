import { useState } from "react"

function Segment({groupname, id, title, segmentChked, setSegmentChked, idx}){
  return( 
      <>
        <input 
          type="radio" 
          name={groupname} 
          id={id} 
          value={id} 
          checked={segmentChked === idx} 
          onChange={ ()=> setSegmentChked(idx) } 
        />
        <label for={id}>{title}</label>
      </>
  )
}

export default Segment