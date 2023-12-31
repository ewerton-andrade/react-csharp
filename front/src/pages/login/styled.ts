import styled from "styled-components";
import { Input, Button } from "antd";

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #ddd;
  @media (max-width: 760px) {
    display: Inline;
    height: 100vh;
    background-color: #ddd;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* Maintain aspect ratio and cover the entire container */
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #050c66;
  @media (max-width: 760px) {
    height: 25vh; /* 25% of the viewport height */
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border: none;
  padding: 10px;
  border-radius: 4px;
`;

const LoginRightContainer = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 760px) {
    width: 100vw;
    height: 75vh; /* 25% of the viewport height */
  }
`;

const InputAnt = styled(Input)`
  width: 100%;
  height: 3.25rem;
  padding: 0.84rem 1rem;
  font-size: 1.1rem;
  border-radius: 0.4rem;
  font-family: "Poppins", sans-serif;
`;

const InputAntPassword = styled(Input.Password)`
  width: 100%;
  height: 3.25rem;
  padding: 0.84rem 1rem;
  font-size: 1.1rem;
  border-radius: 0.4rem;
  font-family: "Poppins", sans-serif;
`;

const ButtonAntLogin = styled(Button)`
  width: 100%;
  height: 3.25rem;
  padding: 0.84rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.4rem;
  background-color: #1877f2;
  color: #fff;
  font-family: "Poppins", sans-serif;
`;

const ButtonAntAccount = styled(Button)`
  height: 3.25rem;
  padding: 0.84rem 1rem;
  font-size: 1rem;
  border-radius: 0.4rem;
  background-color: #42b72a;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ContentRight = styled.div`
  width: 70%;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const ContentButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonAnt = styled(Button)`
  background-color: #4096ff;
  height: 2.5rem;
  top: 8px;
`;

export {
  LoginContainer,
  ImageContainer,
  LoginRightContainer,
  InputField,
  LoginButton,
  Image,
  InputAnt,
  InputAntPassword,
  ButtonAntLogin,
  ButtonAntAccount,
  ContentRight,
  ContentButton,
  ButtonAnt,
};
