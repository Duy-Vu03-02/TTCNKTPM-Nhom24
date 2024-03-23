import React, { useState } from "react";
import "../resources/examRandom.css";
import background from "../data/png/background.png";
import QuestionTemplate from "../component/QuesitonTemplate";
import { IoMdArrowBack } from "react-icons/io";

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
          <IoMdArrowBack onClick={handleBtnClick} className="icon-back" />
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
    mustCorrect: false,
  };
  const store1 = { ...store };
  store1.id = 1;
  store1.mustCorrect = true;
  store1.img = null;
  const store2 = { ...store };
  store2.id = 2;
  const store3 = { ...store };
  store3.id = 3;
  const store4 = { ...store };
  store4.id = 4;
  const store5 = { ...store };
  store5.id = 5;
  const store6 = { ...store };
  store6.id = 6;
  store6.mustCorrect = true;
  const store7 = { ...store };
  store7.id = 7;
  const store8 = { ...store };
  store8.id = 8;
  store8.img = null;
  const store9 = { ...store };
  store9.id = 9;
  const store10 = { ...store };
  store10.id = 10;
  const store11 = { ...store };
  store11.id = 11;
  const store12 = { ...store };
  store12.img = null;
  store12.id = 12;
  const store13 = { ...store };
  store13.id = 13;
  const store14 = { ...store };
  store14.id = 14;
  const store15 = { ...store };
  store14.id = 15;
  const store16 = { ...store };
  store14.id = 16;
  const store17 = { ...store };
  store14.id = 17;
  const store18 = { ...store };
  store14.id = 18;
  const store19 = { ...store };
  store14.id = 19;
  const store20 = { ...store };
  store14.id = 20;
  const store21 = { ...store };
  store14.id = 21;
  const store22 = { ...store };
  store14.id = 22;
  const store23 = { ...store };
  store14.id = 23;
  const store24 = { ...store };
  store14.id = 24;

  // const listData = Array.from({ length: 25 }, () => store);
  const listData = [
    store,
    store1,
    store2,
    store3,
    store4,
    store5,
    store6,
    store7,
    store8,
    store9,
    store10,
    store11,
    store12,
    store13,
    store14,
    store15,
    store16,
    store17,
    store18,
    store19,
    store20,
    store21,
    store22,
    store23,
    store24,
  ];

  const handleTopic = () => {
    props.btnTopic(false);
  };

  return (
    <>
      <div>
        <div className="box-exam">
          <div className="title-exam flex">
            <IoMdArrowBack onClick={handleTopic} className="icon-back" />

            <h3 className="bold">đề ngẫu nhiên hạng a1</h3>
          </div>
          <div>
            <QuestionTemplate dataQuestion={listData} />
          </div>
        </div>
      </div>
    </>
  );
}
