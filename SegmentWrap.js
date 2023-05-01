import styled, { css } from "styled-components"
import Segment from "./SegmentWrap"
import { Children, cloneElement } from "react";


const SegmentWrapStyle = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    border:1px solid #ddd;
    border-radius:0.8rem;
    .segment_indigator {
        position:absolute;
        top:-1px;
        left:-1px;
        bottom:-1px;
        right:-1px;
        border-radius:0.8rem;
        transition:left 0.5s;
    }
`
const SegmentItemStyle = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  height:4.4rem;
  label{
    flex:1;
    z-index:1;
    position:relative;
    word-break:break-all;
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
        `
    }}
`

function SegmentWrap({children, name, defaultIndex, col}){
    return( 
        <>
            <SegmentWrapStyle col={col}>
                <SegmentItemStyle col={col}>
                    {Children.map(children, (child, index) =>
                        cloneElement(child, {name, defaultIndex})
                    )}
                    <div className="segment_indigator" />
                </SegmentItemStyle>
            </SegmentWrapStyle>
        </>
    )
}

export default SegmentWrap
