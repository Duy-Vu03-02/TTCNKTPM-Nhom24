import React, { useState } from "react";
import "../resources/criticalquestion.css";
import background from "../data/png/background.png";
import QuestionsTemplate from "../component/QuestionsTemplate";
import { IoMdArrowBack } from "react-icons/io";

export default function CriticalQuestion(props) {
  const handleClick = () => {
    props.unComponent();
  };
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

  const store1 = { ...store };
  store1.id = 4;

  const store2 = { ...store };
  store2.id = 3;

  const store3 = { ...store };
  store3.id = 2;

  const store4 = { ...store };
  store4.id = 1;

  const listData = [store, store1, store2, store3, store4];

  return (
    <>
      <div className="content-critical">
        <div className="box-exam">
          <div className="title-exam flex">
            <IoMdArrowBack onClick={handleClick} className="icon-back" />
            <h3 className="bold">câu hỏi điểm liệt</h3>
          </div>
          <div className="content-infor">
            <p>
              Dưới đây là <b>20</b> câu điểm liệt dành cho hạng <b>A1</b>, trong
              bài thi nếu làm sai sẽ bị đánh rớt
            </p>
          </div>
        </div>
        <div>
          <QuestionsTemplate dataQuestion={listData} />
        </div>
      </div>
    </>
  );
}
