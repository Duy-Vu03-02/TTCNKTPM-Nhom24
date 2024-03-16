import React, { useState } from "react";
import back from "../data/svg/back.svg";
import "../resources/examRandom.css";
import background from "../data/png/background.png";

export default function ExamRandom(props) {
  const [showExam, setShowExam] = useState(false);

  const handleClick = () => {
    props.unComponent();
  };
  const handleShowExam = (value) => {
    setShowExam(value);
  };
  console.log(showExam);
  return (
    <>
      <div>
        <div>
          {showExam ? (
            <Exam btnTopic={handleShowExam} />
          ) : (
            <BoxExam btnClick={handleClick} btnExam={handleShowExam} />
          )}
        </div>
      </div>
    </>
  );
}

function BoxExam(props) {
  const handleBtnClick = () => {
    props.btnClick();
  };
  const handleBtnExam = () => {
    props.btnExam(true);
  };
  return (
    <>
      <div className="box-exam">
        <div className="title-exam flex">
          <img src={back} alt="" onClick={handleBtnClick} />
          <h3 className="bold">thi đề ngẫu nhiên hạng a1</h3>
        </div>
        <div className="introduce-exam ">
          <p className="bold">Cấu trúc đề thi</p>
          <div>
            <p>
              Thời gian làm bài: <span className="bold">19 phút</span>
            </p>
            <p>
              Tổng số câu hỏi: <span className="bold">25</span>
            </p>
            <p>
              Điểm tối thiểu đat: <span className="bold">21/25</span>
            </p>
            <p>
              Số câu điểm liệt: <span className="bold">1</span>
            </p>
          </div>

          <button className="btn-start" onClick={handleBtnExam}>
            Bắt đầu
          </button>
        </div>
      </div>
    </>
  );
}

function Exam(props) {
  const handleTopic = () => {
    props.btnTopic(false);
  };

  return (
    <>
      <div>
        <div className="box-exam">
          <div className="title-exam flex">
            <img src={back} alt="" onClick={handleTopic} />
            <h3 className="bold">đề ngẫu nhiên hạng a1</h3>
          </div>
        </div>
      </div>
    </>
  );
}
