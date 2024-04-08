import React, { useState, useEffect } from "react";
import "../resources/questionserror.css";
import { FiUser } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import background from "../data/png/background.png";
import QuestionsTemplate from "../component/QuestionsTemplate";
import { IoMdArrowBack } from "react-icons/io";

export default function QuesitionsError(props) {
  const [qsUser, setQsUser] = useState(true);
  const [resTemplate, setResTemplate] = useState([false, false]);
  const [quesitonsUser, setQuestionsUser] = useState([]);
  const [quesitonsPeople, setQuestionsPeople] = useState([]);

  useEffect(() => {
    const fetch = async () => {};
  }, []);

  const data = {
    id: 2,
    question:
      "khi đang lên dốc người ngồi trên xe mô tô có được phép kéo theo người đang điều khiển xe đạp hay không",
    answer: [
      "chỉ được phép nếu cả hai đội mũ bảo hiểm",
      "không được phép",
      "chỉ được phép thực hiện trên đường thật vắng",
      "chỉ được phép khi người đi xe đạp đã quá mệt",
    ],
    trueAnswer: 3,
  };
  const listData = Array.from({ length: 10 }, () => data);

  const data1 = {
    id: 1,
    question: "các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ",
    img: background,
    answer: [
      "xe của bạn, mô tô, xe con",
      "xe con, xe của bạn, mô tô",
      "mô tô, xe con, xe của bạn",
      "chỉ được phép khi người đi xe đạp đã quá mệt",
    ],
    trueAnswer: 2,
  };
  const listData1 = Array.from({ length: 10 }, () => data1);

  const YourQuestionsError = (
    <QuestionsTemplate
      dataQuestion={listData}
      result={resTemplate[0]}
      handleReq={() => handleRes(0)}
    />
  );
  const PeopleQuestionsError = (
    <QuestionsTemplate
      dataQuestion={listData1}
      result={resTemplate[1]}
      handleReq={() => handleRes(1)}
    />
  );
  console.log(resTemplate);
  const handleRes = (index) => {
    setResTemplate((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const handleChangeType = (value) => {
    setQsUser(value);
  };
  const handleClick = () => {
    props.unComponent();
  };

  return (
    <>
      <div className="content-questionserror">
        <div className="box-exam">
          <div className="title-exam flex">
            <IoMdArrowBack onClick={handleClick} className="icon-back" />
            <h3 className="bold">top các câu sai</h3>
          </div>
          <div className="nav-list flex">
            <div
              className={`your-nav  flex ${qsUser ? "user-active" : ""}`}
              onClick={() => handleChangeType(true)}
            >
              <FiUser className="icon-user" />
              <p>Riêng bạn</p>
            </div>
            <div
              className={`people-nav flex ${qsUser ? "" : "user-active"}`}
              onClick={() => handleChangeType(false)}
            >
              <FiUsers className="icon-user" />
              <p className={qsUser ? "" : "user-active"}>Mọi người</p>
            </div>
            <hr className={qsUser ? "" : "hr-active"} />
          </div>
          <div className="title-intro">
            <p className={`infor-user ${qsUser ? "" : "none"}`}>
              Dưới đây là <b>10</b> câu hay sai nhất thuộc hạng <b>A1</b> của
              bạn.
            </p>
            <p className={`infor-people ${qsUser ? "none" : ""}`}>
              Dưới đây là <b>50</b> câu hay sai nhất thuộc hạng <b>A1</b> trên
              toàn hệ thống.
            </p>
          </div>
        </div>
        <div>{qsUser ? YourQuestionsError : PeopleQuestionsError}</div>
      </div>
    </>
  );
}
