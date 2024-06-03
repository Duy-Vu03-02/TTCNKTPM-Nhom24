import React, { useState, useEffect } from "react";
import axios from "axios";
import "../resources/criticalquestion.css";
import QuestionsTemplate from "../component/QuestionsTemplate";
import { IoMdArrowBack } from "react-icons/io";

export default function CriticalQuestion(props) {
  const [listData, setListData] = useState([]);
  const [resTemplate, setResTemplate] = useState(false);
  const handleClick = () => {
    props.unComponent();
  };
  const handleRes = () => {
    setResTemplate(true);
  };

  useEffect(() => {
    const fetch = async () => {
      const url =
        "http://localhost/baocaothuctap/Server/API/controllers/criticalQuestion/criticalQuestion.php";
      const response = await axios.get(url);

      if (response.status === 200) {
        setListData(response.data);
      }
    };
    fetch();
  }, []);

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
              Dưới đây là <b>{listData.length}</b> câu điểm liệt dành cho hạng{" "}
              <b>A1</b>, trong bài thi nếu làm sai sẽ bị đánh rớt
            </p>
          </div>
        </div>
        <div>
          <QuestionsTemplate
            dataQuestion={listData}
            result={resTemplate}
            handleReq={handleRes}
          />
        </div>
      </div>
    </>
  );
}
