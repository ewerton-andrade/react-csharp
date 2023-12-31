import { Form, FormProps } from "antd";

import { InputAnt, InputAntPassword, ButtonAntLogin } from "../styled";

const FormLogin = (props: FormProps) => {
  return (
    <Form
      name="normal_login"
      className="login-form"
      {...props}
      style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "Please input your Username!" },
          { type: "email", message: "Apenas emails" },
        ]}
        style={{ margin: "0.5rem" }}
      >
        <InputAnt placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Passowrd!" }]}
        style={{ margin: "0.5rem" }}
      >
        <InputAntPassword placeholder="Password" />
      </Form.Item>
      <Form.Item style={{ margin: "0.5rem" }}>
        <ButtonAntLogin htmlType="submit" className="login-form-button">
          Entrar
        </ButtonAntLogin>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
