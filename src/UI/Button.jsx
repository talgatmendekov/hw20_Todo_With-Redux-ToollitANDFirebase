import React, { Children } from 'react'
import styled from 'styled-components'

const Button = (props) => {
  return (
    <StyledButton id={props.id} onClick={props.onClick}>{props.children}</StyledButton>
  )
}

const StyledButton = styled.button`
    border: 1px solid rgb(224, 224, 231);
    border-radius: 8px;
    background: rgb(34, 34, 36);
    color: red;
    padding: 0.25rem 1rem;
    cursor: pointer;
    margin-left: 10px;
    &:hover{
        background: rgb(221, 217, 224);
        color: rgb(202, 136, 49);
    }

`
export default Button