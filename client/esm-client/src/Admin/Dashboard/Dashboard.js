import React from "react";
import { Row, Col } from "antd";
import Registration from "./Registration";
import ResetPassword from "./ResetPassword";
import "./Dashboard.css";

function Dashboard(props) {
  const trimLength = 8;
  // console.log(userInfo);

  return (
    <>
      <div className="container dashboard">
        <Row gutter={[48, 10]} justify="center">
          <Col className="gutter-row" xs={24} sm={24} md={9} xl={9}>
            <Registration trimLength={trimLength} />
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={9} xl={9}>
            <ResetPassword trimLength={trimLength} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
