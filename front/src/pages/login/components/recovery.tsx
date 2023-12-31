import { Fragment } from "react";
import { Form, FormProps, Typography } from "antd";

import { InputAnt, ButtonAnt } from "../styled";

type FormAccoutProps = FormProps & {
  sent: boolean;
};

const FormRecovery = (props: FormAccoutProps) => {
  const { Title } = Typography;

  return props.sent ? (
    <Fragment>
      <Title level={5}>
        We have sent a link to your email to reset your password
      </Title>
    </Fragment>
  ) : (
    <Fragment>
      <Title level={3}>Recover Password</Title>
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
        <ButtonAnt htmlType="submit" type="primary">
          Send email
        </ButtonAnt>
      </Form>
    </Fragment>
  );
};

export default FormRecovery;
