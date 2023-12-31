import { Fragment } from "react";
import { Form, FormProps, Typography } from "antd";

import { InputAnt, ButtonAnt } from "../styled";

type FormAccoutProps = FormProps & {
  activated: boolean;
};

const FormConfirm = (props: FormAccoutProps) => {
  const { Title } = Typography;

  return props.activated ? (
    <Fragment>
      <Title level={5}>Active account, now log in.</Title>
    </Fragment>
  ) : (
    <Fragment>
      <Title level={3}>Account activation</Title>
      <Title level={5}>To activate your account, confirm your email.</Title>
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
        <ButtonAnt
          htmlType="submit"
          type="primary"
        >
          Activate
        </ButtonAnt>
      </Form>
    </Fragment>
  );
};

export default FormConfirm;
