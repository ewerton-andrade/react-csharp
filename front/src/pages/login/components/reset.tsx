import { Fragment } from "react";
import { Form, FormProps, Typography } from "antd";

import { InputAntPassword, ButtonAnt } from "../styled";

type FormAccoutProps = FormProps & {
  reset: boolean;
};

const FormReset = (props: FormAccoutProps) => {
  const { Title } = Typography;

  return props.reset ? (
    <Fragment>
      <Title level={5}>Password reset, now log in.</Title>
    </Fragment>
  ) : (
    <Fragment>
      <Title level={3}>New Password</Title>
      <Title level={5}>To activate your account, confirm your email.</Title>
      <Form initialValues={{ password: "", confirm: "" }} {...props}>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: "Please input your Passowrd!" }]}
          style={{ margin: "0.5rem" }}
        >
          <InputAntPassword placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input your Passowrd!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
          style={{ margin: "0.5rem" }}
        >
          <InputAntPassword placeholder="Confirm Password" />
        </Form.Item>
        <ButtonAnt
          htmlType="submit"
          type="primary"
        >
          Reset
        </ButtonAnt>
      </Form>
    </Fragment>
  );
};

export default FormReset;
