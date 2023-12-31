import { Fragment } from "react";
import { Form, FormProps, Typography } from "antd";

import { InputAnt, InputAntPassword, ButtonAnt} from "../styled";

type FormAccoutProps = FormProps & {
  created: boolean;
};

const FomAccount = (props: FormAccoutProps) => {
  const { Title } = Typography;

  return props.created ? (
    <Title level={5}>
      Account created, now activate your account using the link sent to your
      email
    </Title>
  ) : (
    <Fragment>
      <Title level={3}>New Account</Title>
      <Form initialValues={{ remember: true }} {...props}>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input your Username!" },
            { type: "email", message: "Apenas emails" },
          ]}
        >
          <InputAnt placeholder="E-mail" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <InputAntPassword placeholder="Password" />
        </Form.Item>
        <ButtonAnt
          htmlType="submit"
          type="primary"
        >
          Create an account
        </ButtonAnt>
      </Form>
    </Fragment>
  );
};

export default FomAccount;
