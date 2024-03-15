import React, { useState } from "react";
import back from "../data/svg/back.svg";
import "../resources/questionserror.css";
import { FiUser } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import background from "../data/png/background.png";

export default function QuesitionsError(props) {
  const [qsUser, setQsUser] = useState(true);
  const handleChangeType = (value) => {
    setQsUser(value);
  };
  const handleClick = () => {
    props.unComponent();
  };
  console.log(qsUser);
  return (
    <>
      <div className="content-questionserror">
        <div className="box-exam">
          <div className="title-exam flex">
            <img src={back} alt="" onClick={handleClick} />
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
        <div>{qsUser ? <User /> : <Gobal />}</div>
      </div>
    </>
  );
}

function User() {
  const [questions, setQuestions] = useState([]);
  const data = {
    question:
      "khi đang lên dốc người ngồi trên xe mô tô có được phép kéo theo người đang điều khiển xe đạp hay không",
    answer: [
      "chỉ được phép nếu cả hai đội mũ bảo hiểm",
      "không được phép",
      "chỉ được phép thực hiện trên đường thật vắng",
      "chỉ được phép khi người đi xe đạp đã quá mệt",
    ],
  };
  const listData = Array.from({ length: 10 }, () => data);

  const handleChangeSelect = (index, z) => {
    setQuestions((prevState) => {
      const newSelected = [{ id: index, selected: z }];
      const selectedFilter = prevState.filter((item) => item.id !== index);
      return [...selectedFilter, ...newSelected];
    });
  };
  console.log(questions);
  return (
    <>
      <div className="wrap-list-question">
        <ul>
          {listData.map((data, index) => (
            <li key={index}>
              <div className="wrap-question">
                <div className="question-infor flex">
                  <h5>Câu {index + 1}.&nbsp;</h5>
                  <h5>{data.question}?</h5>
                </div>
                {data.img ? (
                  <div className="img-illustration">
                    <img src={data.img} alt="" />
                  </div>
                ) : (
                  ""
                )}
                <div className="answer-infor">
                  <ul>
                    {data.answer.map((rep, z) => (
                      <li
                        key={z}
                        className="flex"
                        onClick={() => handleChangeSelect(index, z)}
                      >
                        <input
                          type="checkbox"
                          checked={questions.some(
                            (item) => item.id === index && item.selected === z
                          )}
                        />
                        <span>{z + 1}.&nbsp; </span>
                        <p>{rep}.</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="btn-show">
                  <button>Hiện đáp án</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Gobal() {
  const [questions, setQuestions] = useState([]);
  const data = {
    question: "các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ",
    img: background,
    answer: [
      "xe của bạn, mô tô, xe con",
      "xe con, xe của bạn, mô tô",
      "mô tô, xe con, xe của bạn",
      "chỉ được phép khi người đi xe đạp đã quá mệt",
    ],
    ansTrue: 1212,
    ansFalse: 1144,
  };
  const listData = Array.from({ length: 10 }, () => data);

  const handleChangeSelect = (index, z) => {
    setQuestions((prevState) => {
      const newSelected = [{ id: index, selected: z }];
      const selectedFilter = prevState.filter((item) => item.id !== index);
      return [...selectedFilter, ...newSelected];
    });
  };
  console.log(questions);
  return (
    <>
      <div className="wrap-list-question">
        <ul>
          {listData.map((data, index) => (
            <li key={index}>
              <div className="wrap-question">
                <div className="question-infor flex">
                  <h5>Câu {index + 1}.&nbsp;</h5>
                  <h5>{data.question}?</h5>
                </div>
                {data.img ? (
                  <div className="img-illustration">
                    <img src={data.img} alt="" />
                  </div>
                ) : (
                  ""
                )}
                <div className="answer-infor">
                  <ul>
                    {data.answer.map((rep, z) => (
                      <li
                        key={z}
                        className="flex"
                        onClick={() => handleChangeSelect(index, z)}
                      >
                        <input
                          type="checkbox"
                          checked={questions.some(
                            (item) => item.id === index && item.selected === z
                          )}
                        />
                        <span>{z + 1}.&nbsp; </span>
                        <p>{rep}.</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="btn-show">
                  <button>Hiện đáp án</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
