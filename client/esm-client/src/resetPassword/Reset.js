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
import "./Reset.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {accountCreated, resetPassword } from "../actions/authActions";
import { Link } from "react-router-dom";

function Reset(props) {
  const [showSelect, setShowSelect] = useState(false);
  const history = useHistory();
  const { Option } = Select;
  const { isLoading } = props;

  const submitForm = (values)  => {
    props.sendSignUpRequest(values);
    console.log(values);
  };

  const openNotification = (type) => {
    const args = {
      message: type==='success'?"Password reset passed": "Password reset failed.",
      description:
      type==='success'?
        "Congratulations, Password has been reset. Check email for new password.": props.sendPassResetError,
      duration: 3,
    };
    type==='success'?notification.open(args): notification.error(args);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (props.sendPassResetSuccess) {
      openNotification('success');
    }
    if(props.sendPassResetError){
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
        <Col className="reset__container">
          {/* <p className="sub-title__signup">🎓 EMS</p> */}
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
            <Input placeholder="abcd@gmail.com" />
          </Form.Item>
          <Form.Item>
              <Button
                type="primary"
                className="reset"
                htmlType="submit"
                loading={isLoading}
              >
                {!isLoading ? "Reset" : "Resetting..."}
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
    sendPassResetError: state.auth.sendPassResetError,
    sendPassResetSuccess: state.auth.sendPassResetSuccess,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendSignUpRequest: (values) => dispatch(resetPassword(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
