import { Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { Row, Col, Typography, notification } from "antd";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { loginUser } from "../actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Login(props) {
  const history = useHistory();
  const { Title } = Typography;
  const { isLoading } = props;

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const openNotification = () => {
    const args = {
      message: "Login Error",
      description: "Please enter correct credentials.",
      duration: 3,
    };
    notification.error(args);
  };

  useEffect(() => {
    if (props.isAuthenticated) {
      history.push("/");
    }
    if(props.loginError){
      openNotification()
    }
  }, [props]);

  const submitForm = (values) => {
    props.sendLoginRequest(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row justify="center" align="middle" className="hero">
        <Col xs={22} sm={22} md={6} lg={6} className="signin__container">
          <p className="sub-title">🎓 EMS</p>

          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={submitForm}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <div
              className="link"
              style={{
                textAlign: "center",
                fontWeight: 500,
                marginBottom: "15px",
              }}
            >
            </div>
            <Form.Item>
              <Button
                type="primary"
                className="sign__in"
                style={{ minWidth: "44px" }}
                loading={isLoading}
                htmlType="submit"
              >
                {!isLoading ? "Sign In" : "Logging In"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    loginError: state.auth.loginError
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendLoginRequest: (values) => dispatch(loginUser(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
