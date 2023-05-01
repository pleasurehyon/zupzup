import styled, { css } from "styled-components"
import { useEffect, useState, useRef, Children, cloneElement } from "react";

const SegmentControlStyle = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    height:4.4rem;
    margin-top:3rem;
    border:1px solid gray;
    border-radius:0.6rem;
    :before {
        content:'';
        width: var(--highlight-width);
        transform: translateX(var(--highlight-x-pos));
        position:absolute;
        top:-1px;
        left:-1px;
        bottom:-1px;
        right:-1px;
        border:1px solid red;
        border-radius:0.8rem;
        transition:transform 0.5s;
    }
    label {
        flex:1;
        text-align:center;
        position:relative;
        z-index:10;
    }
`

function SegmentControl({children, isDefault, groupname}){
    const controlRef = useRef();
    const [controlW, setControlW] = useState()
    const [controlL, setControlL] = useState()
    useEffect(() => {
        const { style } = controlRef.current;
        style.setProperty("--highlight-width", `${controlW * 0.1}rem`);
        style.setProperty("--highlight-x-pos", `${controlL * 0.1}rem`);  
    });
    return(
        <>
            <SegmentControlStyle ref={controlRef}>
                {Children.map(children, (child, index) =>
                    cloneElement(child, {setControlW, setControlL, isDefault, groupname, index})
                )}
            </SegmentControlStyle>
        </>
    )
}
export default SegmentControl