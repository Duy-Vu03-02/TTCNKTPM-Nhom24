import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../resources/component.css";
import examRandom from "../data/svg/examRandom.svg";
import exam from "../data/svg/exam.svg";
import allKnowledge from "../data/svg/allKnowledge.svg";
import criticalQuestion from "../data/svg/criticalQuestion.svg";
import questionsError from "../data/svg/questionsError.svg";
import noticeBoard from "../data/svg/noticeBoard.svg";

import AllKnowledge from "../page/AllKnowledge";
import CriticalQuestion from "../page/CriticalQuestion";
import Exam from "../page/Exam";
import ExamRandom from "../page/ExamRandom";
import NoticeBoard from "../page/NoticeBoard";
import QuestionsError from "../page/QuestionsError";
export default function Component() {
  const [currentComponent, setCurrentComponent] = useState(false);
  const listData = [
    {
      img: examRandom,
      content: "Thi thử đề ngẫu nhiên",
      reject: "/examrandom",
    },
    {
      img: exam,
      content: "Thi thử bộ đề tạo sẵn",
      reject: "/exam",
    },
    {
      img: allKnowledge,
      content: "Ôn tập toàn bộ câu hỏi",
      reject: "/allknowledge",
    },
    {
      img: criticalQuestion,
      content: "Ôn tập câu điểm liệt",
      reject: "/criticalquestion",
    },
    {
      img: questionsError,
      content: "Câu hỏi bị sai nhiều",
      reject: "/questionserror",
    },
    {
      img: noticeBoard,
      content: "Biển báo giao thông",
      reject: "/noticeboard",
    },
  ];

  const handleSetComponent = (index) => {
    setCurrentComponent(index);
  };

  return (
    <>
      {/* <ul className="list-component flex">
        {listData.map((data, index) => (
          <li key={index} onClick={handleSetComponent(index)}>
            <Link to={data.reject}>
              <div className="component">
                <div className="img-component">
                  <img src={data.img} alt={data.content} />
                </div>
                <div className="content-component">
                  <p>{data.content}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul> */}
    </>
  );
}
