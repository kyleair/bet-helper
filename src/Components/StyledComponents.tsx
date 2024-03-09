import React from 'react'
import styled from 'styled-components';

interface Props{
    className?: string;
    fontSize?: any;
    fontWeight?: number;
    color?: string;
    children: React.ReactNode;
}
const PageText:React.FC <Props> = ({className, children}) => {
    return (
       <span className={className}>{children}</span>
    );
}

export const Text = styled(PageText)`
    color:${(props)=>props.color ? props.color :"#000000" };
    font-size: ${(props)=>props.fontSize ? props.fontSize  : "1em"}; 
    font-weight: ${(props)=>props.fontWeight ? props.fontWeight  : "400"};
`;

export const Button = styled.button<{ $secondary?: boolean; }>`
  background: ${props => props.$secondary ? "white" : "#0038a8"};
  color: ${props => props.$secondary ? "#0038a8" : "white"};

  font-size: 1em;
  font-weight: 550;
  margin: 0 1em;
  padding: 0.25em 1em;
  border: 2px solid #0038a8;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 8px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: auto;
    padding: 8px;
    align-items: center;
`;

export const TextButton = styled.button`
background:  #ffffff;
color: #0038a8;
border: none;
font-size: 1em;
  font-weight: 550;
  margin: 0 1em;
  padding: 0.25em 1em;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;