import React, { useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { HiOutlineClipboardList, HiClipboardCopy } from "react-icons/hi";
import { fetchClasses } from "../../actions/classesActions";
import { connect } from "react-redux";
import { Skeleton } from "antd";
import Reset from "../../resetPassword/Reset";
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

function ResetPassword(props) {
  let { classesList, isLoading, studentClassName, trimLength, classes } = props;
  if (classesList)
    classesList =
      classesList.length > trimLength
        ? classesList.slice(-trimLength).reverse()
        : classesList;

  useEffect(() => {
    props.fetchClasses();
  }, []);
  console.log(props);

  return (
    <>
      <div className="left__header red__header">
        <p className="left__header__text">
          {<HiOutlineClipboardList />}Reset Password
        </p>
      </div>
      <div className="left__body">
        {/* <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          // onFinish={submitForm}
          // onFinishFailed={onFinishFailed}
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
          </Form> */}
          <Reset/>

      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.tests.isLoadingTest,
    tests: state.tests.test,
    classesList: state.classesData.classes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchClasses: () => dispatch(fetchClasses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
