import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Select,
  notification,
} from "antd";
import "./Signup.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUser, accountCreated } from "../actions/authActions";
import { Link } from "react-router-dom";

function Signup(props) {
  const [showSelect, setShowSelect] = useState(false);
  const history = useHistory();
  const { Option } = Select;
  const { isLoading } = props;

  const submitForm = (values) => {
    props.sendSignUpRequest(values);
    console.log(values);
  };

  const openNotification = (type) => {
    const args = {
      message: type==='success'?"Account Created": "Account Creation Failed.",
      description:
      type==='success'?
        "Congratulations, Now you are part of our family. Please login to continue.": props.signupError,
      duration: 3,
    };
    type==='success'?notification.open(args): notification.error(args);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (props.accountCreated) {
      openNotification('success');
      props.sendUserAccountCreated();
    }
    if(props.signupError){
      openNotification('error');
    }
  }, [props]);

  const handleSelect = (select, optionData) => {
    console.log(optionData);
    if (["teacher", "admin"].includes(optionData.value)) {
      setShowSelect(true);
    } else {
      setShowSelect(false);
    }
  };
  return (
    <>
      <Row className="hero">
        <Col className="signup__container">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={submitForm}
            onFinishFailed={onFinishFailed}
          >
            <div className="element__wrapper">
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="abcd@gmail.com" />
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
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
              ]}
            >
              <Input type="tel" placeholder="7275XXXXXX" />
            </Form.Item>

            <div className="element__wrapper">
              <Form.Item
                name="role"
                rules={[
                  {
                    message: "Please input your role!",
                  },
                ]}
              >
                <Select defaultValue="Role" onSelect={handleSelect}>
                <Option value="admin">Admin</Option>
                  <Option value="student">Student</Option>
                  <Option value="teacher">Teacher</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="section"
                rules={[
                  {
                    message: "Please input your section!",
                  },
                ]}
              >
                <Select defaultValue="Section" disabled={showSelect}>
                  <Option value="A">Applied Computer Technology</Option>
                  <Option value="B">Introduction to Psychology</Option>
                  <Option value="C">Business Management</Option>
                  <Option value="D">Computer Organization</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="className"
                rules={[
                  {
                    message: "Please input your email!",
                  },
                ]}
              >
                <Select defaultValue="Class" disabled={showSelect}>
                  <Option value="IX">Room I</Option>
                  <Option value="XI">Room II</Option>
                    <Option value="XII">Room III</Option>
                </Select>
              </Form.Item>
            </div>
            {/* <div
              className="link"
              style={{
                textAlign: "center",
                fontWeight: 500,
                marginBottom: "15px",
              }}
            >
              <Link to="/sigin">Already have account? Signin</Link>
            </div> */}
            <Form.Item>
              <Button
                type="primary"
                className="sign__up"
                htmlType="submit"
                loading={isLoading}
              >
                {!isLoading ? "Sign Up" : "Creating Account"}
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
    accountCreated: state.auth.accountCreated,
    signupError: state.auth.signupError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendSignUpRequest: (values) => dispatch(signUpUser(values)),
    sendUserAccountCreated: () => dispatch(accountCreated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);