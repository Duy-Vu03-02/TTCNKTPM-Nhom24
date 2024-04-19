import React, { useState, useEffect } from "react";
import "../resources/questionserror.css";
import { FiUser } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import background from "../data/png/background.png";
import QuestionsTemplate from "../component/QuestionsTemplate";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";

export default function QuesitionsError(props) {
  const [qsUser, setQsUser] = useState(true);
  const [resTemplate, setResTemplate] = useState([false, false]);
  const [quesitonsUser, setQuestionsUser] = useState([]);
  const [quesitonsPeople, setQuestionsPeople] = useState([]);
  const [listDataUser, setListDataUser] = useState([]);
  const [listDataPeople, setListDataPeople] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await JSON.parse(localStorage.getItem("question_err"));
      if (data !== null && data.length > 0) {
        let listId = data.map((item) => item.id);
        listId = listId.length > 25 ? listId.splice(0, 25) : listId;
        const urlUser =
          "http://localhost/BaoCaoThucTap/Server/API/controllers/questionError/getQuestionsErrorForUser.php";
        const responseUser = await axios.get(urlUser + "?action=" + listId);
        if (responseUser.status === 200) {
          setListDataUser(responseUser.data);
        }
      }

      const urlPeople =
        "http://localhost/BaoCaoThucTap/Server/API/controllers/questionError/getQuestionsErrorForPeople.php";
      const responsePeople = await axios.get(urlPeople);
      if (responsePeople.status === 200) {
        setListDataPeople(responsePeople.data);
      } else if (responsePeople.status === 204) {
        setListDataPeople([]);
      }
    };
    fetch();
  }, []);

  const YourQuestionsError = (
    <QuestionsTemplate
      dataQuestion={listDataUser}
      result={resTemplate[0]}
      handleReq={() => handleRes(0)}
    />
  );
  const PeopleQuestionsError = (
    <QuestionsTemplate
      dataQuestion={listDataPeople}
      result={resTemplate[1]}
      handleReq={() => handleRes(1)}
    />
  );

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
              Dưới đây là <b>{listDataUser.length}</b> câu hay sai nhất thuộc
              hạng <b>A1</b> của bạn.
            </p>
            <p className={`infor-people ${qsUser ? "none" : ""}`}>
              Dưới đây là <b>{listDataPeople.length}</b> câu hay sai nhất thuộc
              hạng <b>A1</b> trên toàn hệ thống.
            </p>
          </div>
        </div>
        <div>{qsUser ? YourQuestionsError : PeopleQuestionsError}</div>
      </div>
    </>
  );
}
