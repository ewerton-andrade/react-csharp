import styled from "styled-components";

const TestMainContainer = styled.div`
  background-color: #050C66;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  display: flex;
`

const TestDivContainer = styled.div`
    border: "1px solid red";
    color: "#FFFFFF";
    fontSize: "100px"; 
    display: "flex"; 
    width: "75%"; 
    height: "50%"; 
    align-items: "center"; 
    justifyContent: "center";
`

export { TestMainContainer, TestDivContainer}