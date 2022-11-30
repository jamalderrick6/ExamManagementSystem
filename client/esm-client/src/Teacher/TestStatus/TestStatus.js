import React from "react";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import StudentStatus from "./StudentStatus";

function TestStatus(props) {
  console.log(props.selectedTest);
  const style = { background: "#0092ff", padding: "8px 0" };
  const students = props.selectedTest.submitBy;
  const className = props.selectedTest.className;
  const testName = props.selectedTest.testName;
  console.log("students", students);

  const DownloadResults = (data) => {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${testName}.csv`);
    a.click();
  };

  const CSVCreator = (data) => {
    let csvRows = [];
    const headers = ["First Name", "Last Name", "Minutes Taken", "Correct", "Wrong", "Skipped", "Verdict"]
    csvRows.push(headers.join(","));
    data.forEach(row => {
      let percent = (row.correct/row.totalMarks)*100
      let verdict = percent>=80? "PASS" : percent>=60? "FAIR": percent>=50? "AVERAGE": "FAIL"
      const values = [row.firstName, row.lastName, row.submitMinutes, row.correct, row.wrong, row.unanswered, verdict]
      csvRows.push(values)      
    });
    return csvRows.join("\n");
  };

  const GetResults = async function () {
    const data = [...students]

    const csvdata = CSVCreator(data);
    DownloadResults(csvdata);
  };

  return (
    <>
      <div className="container student__status">
        <Button disabled={!students.length} type="primary" onClick={GetResults}>
          Download Results
        </Button>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {students.length > 0 &&
            students.map((student, index) => (
              <StudentStatus
                className={className}
                testName={testName}
                student={student}
                key={index}
              />
            ))}
        </Row>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    selectedTest: state.selectedTest.selectedAssignedTestData,
  };
};

export default connect(mapStateToProps, null)(TestStatus);
