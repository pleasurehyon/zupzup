import styled, { css } from "styled-components"
import Segment from "./SegmentWrap"
import { Children, cloneElement, useState } from "react";


const SegmentWrapStyle = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    border:1px solid #ddd;
    border-radius:0.8rem;
    .d-flex{
        flex:1;
        display:flex;
        align-items:center;
        min-height:4.4rem;
        label{
            z-index:1;
            position:relative;
            flex:1;
            word-break:break-all;
        }
        .segment_indigator {
            position:absolute;
            top:-1px;
            left:-1px;
            bottom:-1px;
            right:-1px;
            border-radius:0.8rem;
            transition:left 0.5s;
        }
        ${props => props.col && css`
            > input:checked ~ .segment_indigator {
                width: ${props => `calc(100% / ${props.col})`};
                border:1px solid red;      
            }
            > input:nth-of-type(1):checked ~ .segment_indigator {
                left:-1px;
            } 
            > input:nth-of-type(2):checked ~ .segment_indigator {
                left:${'calc(100% /' + props.col + ')'}
            }
            > input:nth-of-type(3):checked ~ .segment_indigator {
                left:calc(100% / ${props.col} * 2)
            }
            > input:nth-of-type(4):checked ~ .segment_indigator {
                left:calc(100% / ${props.col} * 3)
            }
        `}
    }
`

function SegmentWrap({children, groupname, defaultIndex}){
    const [segmentChked, setSegmentChked] = useState(defaultIndex);
    const col = children.length;
    return( 
        <>
            <SegmentWrapStyle col={col}>
                <div className="d-flex">
                    {Children.map(children, (child, idx) =>
                        cloneElement(child, {groupname, idx, defaultIndex, segmentChked, setSegmentChked})
                    )}
                    <div className="segment_indigator" />
                </div>
            </SegmentWrapStyle>
        </>
    )
}

export default SegmentWrap
