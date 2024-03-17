import React, { useState } from "react";
import back from "../data/svg/back.svg";
import "../resources/examRandom.css";
import background from "../data/png/background.png";
import QustionTemplate from "../component/QuesitonTemplate";

export default function ExamRandom(props) {
  const [showExam, setShowExam] = useState(false);

  const handleClick = () => {
    props.unComponent();
  };
  const handleShowExam = (value) => {
    setShowExam(value);
  };
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
  const store = {
    id: 5,
    question: "cuộc đua xe chỉ được thực hiện khi nào?",
    img: background,
    answer: [
      "diễn ra trên đường phố không có người qua lại",
      "được người dân ủng hộ",
      "được cơ quan có thẩm quyền cấp phép",
      "được sự cho phép của Đảng và Nhà nước",
    ],
    trueAnswer: 2,
  };
  const listData = Array.from({ length: 10 }, () => store);
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
          <div>
            <QustionTemplate dataQuestion={listData} />
          </div>
        </div>
      </div>
    </>
  );
}
