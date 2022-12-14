import React from "react";
import { Row, Col, Divider, Progress, Button } from "antd";
import { connect } from "react-redux";
import "./ShowResult.css";
import Chart from "react-google-charts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ShowResult(props) {
  const { userInfo } = props;
  const { testName, date } = props.selectedTest;
  const testInfo = props.selectedTest[0];
  let marks,
    name,
    rightAnswers,
    submitMinutes,
    totalMarks,
    wrongAnswers,
    totalAttempt;

  if (testInfo) {
    marks = testInfo.correct;
    // name = testInfo.name;
    rightAnswers = testInfo.correct;
    submitMinutes = testInfo.submitMinutes;
    totalMarks = testInfo.totalMarks;
    wrongAnswers = testInfo.wrong;
    totalAttempt = rightAnswers - -wrongAnswers;
  }

  const DownloadResults = () => {
    const input = document.getElementById('results-container');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        let pdfName = `${testName}-${date}.pdf`
        pdf.save(pdfName);
      })
    ;
  };
  const submitDate = new Date(date);
  const percent = Math.floor((marks / totalMarks) * 100);
  const verdict =
    percent >= 80
      ? "PASS"
      : percent >= 60
      ? "FAIR"
      : percent >= 50
      ? "AVERAGE"
      : "FAIL";
  return (
    <>
      <div className="container dashboard">
        <Button type="primary" onClick={DownloadResults}>
          Download Results
        </Button>
        <Row gutter={[48, 10]} justify="center">
          <Col className="gutter-row" xs={24} sm={24} md={14} xl={14}>
            <div id="results-container" className="result__wrapper">
              <div className="result__wrapper__header">
              <div className="result__heading">
                  <div className="result__test__name">User Name: </div>
                  <div className="result__test__name__field">{`${userInfo.firstName} ${userInfo.lastName} `}</div>
                </div>
                <div className="result__heading">
                  <div className="result__test__name">Test Name: </div>
                  <div className="result__test__name__field">{testName}</div>
                </div>
                <div className="result__heading">
                  <div className="result__test__name">Time Taken: </div>
                  <div className="result__test__name__field">
                    {submitMinutes ? submitMinutes : "XX"} minutes
                  </div>
                </div>
                <div className="result__heading">
                  <div className="result__test__name">
                    Test Submitted Date:{" "}
                  </div>
                  <div className="result__test__name__field">
                    {submitDate.toLocaleDateString("en-US")}
                  </div>
                </div>
              </div>
              <Divider />
              <div className="result__wrapper__body">
                <div className="percentage">
                  <div className="percentage__heading">Your Score</div>
                  <Progress percent={percent} status="active" />
                </div>
                <div className="marks__info">
                  <div className="marks__chart">
                    <Chart
                      width={"100%"}
                      height={"100%"}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ["Task", "Hours per Day"],
                        ["Correct", marks / 10],
                        ["Wrong", totalMarks / 10 - marks / 10],
                      ]}
                      options={{
                        title: "Marks Distribution",
                        // Just add this option
                        pieHole: 0.45,
                      }}
                      rootProps={{ "data-testid": "3" }}
                    />
                  </div>
                  <div className="marks">
                    <h2 className="inlarge">Marks</h2>
                    <div className="marksBox">
                      <div className="obtained__marks">
                        {marks} | {totalMarks}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="attempted">
                  <div className="total__attempted">
                    <div className="percentage">
                      <div className="percentage__heading">
                        Attempted: {totalAttempt}{" "}
                      </div>
                      <Progress
                        percent={Math.floor((totalAttempt / totalMarks) * 100)}
                        status="active"
                      />
                    </div>
                  </div>
                  <div className="correct__attempted">
                    <div className="percentage">
                      <div className="percentage__heading">
                        Correct Answers: {rightAnswers}
                      </div>
                      <Progress
                        percent={Math.floor((rightAnswers / totalMarks) * 100)}
                        status="active"
                      />
                    </div>
                  </div>

                  <div className="marks__verdict">
                    <div className="percentage">
                      <div className="percentage__heading">Verdict</div>
                      <div className={"verdict " + verdict.toLowerCase()}>
                        <span>{verdict}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user,
    selectedTest: state.selectedTest.selectedTestResultData,
  };
};

export default connect(mapStateToProps, null)(ShowResult);
