import React, { useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../resources/home.css";
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

export default function Home() {
  const [currentComponent, setCurrentComponent] = useState(null);
  const handleSetComponent = (index) => {
    setCurrentComponent(index + 1);
  };
  const handUnComponent = () => {
    setCurrentComponent(null);
  };
  const listComponent = [
    <ExamRandom unComponent={handUnComponent} />,
    <Exam unComponent={handUnComponent} />,
    <AllKnowledge unComponent={handUnComponent} />,
    <CriticalQuestion unComponent={handUnComponent} />,
    <QuestionsError unComponent={handUnComponent} />,
    <NoticeBoard unComponent={handUnComponent} />,
  ];
  var CurrentComponent = listComponent[currentComponent - 1];
  const listData = [
    {
      img: examRandom,
      content: "Thi thử đề ngẫu nhiên",
    },
    {
      img: exam,
      content: "Thi thử bộ đề tạo sẵn",
    },
    {
      img: allKnowledge,
      content: "Ôn tập toàn bộ câu hỏi",
    },
    {
      img: criticalQuestion,
      content: "Ôn tập câu điểm liệt",
    },
    {
      img: questionsError,
      content: "Câu hỏi bị sai nhiều",
    },
    {
      img: noticeBoard,
      content: "Biển báo giao thông",
    },
  ];

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        {currentComponent ? (
          CurrentComponent
        ) : (
          <ul className="list-component flex">
            {listData.map((data, index) => (
              <li key={index} onClick={() => handleSetComponent(index)}>
                <div className="component">
                  <div className="img-component">
                    <img src={data.img} alt={data.content} />
                  </div>
                  <div className="content-component">
                    <p>{data.content}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
