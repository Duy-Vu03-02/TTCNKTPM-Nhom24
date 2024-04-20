import React, { useEffect, useState } from "react";
import axios from "axios";
import "../resources/allknowledge.css";
import QuestionChapter from "../component/QuestionChapter";
import QuestionsTemplate from "../component/QuestionsTemplate";
import { IoMdArrowBack } from "react-icons/io";

export default function AllKnowledge(props) {
  const [listData, setListData] = useState([]);
  const [showLesson, setShowLesson] = useState({
    state: false,
    index: null,
    data: null,
  });

  useEffect(() => {
    const fetch = async () => {
      const url =
        "http://localhost/baocaothuctap/Server/API/controllers/allknowledge/titleChapter.php";
      const response = await axios.get(url);

      if (response.status === 200) {
        setListData(response.data);
      }
    };
    fetch();
  }, []);

  const handleClick = () => {
    props.unComponent();
  };
  const handleShowLesson = (data, index) => {
    setShowLesson({
      state: true,
      index: index,
      data: data,
    });
  };
  const handleBackLesson = () => {
    setShowLesson({
      state: false,
      index: null,
      data: null,
    });
  };
  return (
    <>
      <div className="component-ledge">
        {showLesson.state ? (
          <Lesson data={showLesson.data} arrowBack={handleBackLesson} />
        ) : (
          <div className="box-exam">
            <div className="title-exam flex">
              <IoMdArrowBack onClick={handleClick} className="icon-back" />
              <h3 className="bold">ôn tập lý thuyết hạng a1</h3>
            </div>
            <div className="lessons">
              <ul className="list-lesson flex">
                {listData.map((data, index) => (
                  <li key={index} onClick={() => handleShowLesson(data, index)}>
                    <div className="lesson">
                      <div>
                        <h3>{data.title}</h3>
                        <p>{data.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Lesson({ arrowBack, data }) {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const url =
        "http://localhost/baocaothuctap/Server/API/controllers/allknowledge/contentChapter.php";
      const response = await axios.get(url + "?id=" + data.id);

      if (response.status === 200) {
        setListData(response.data);
      }
    };
    fetch();
  }, []);

  const handleClick = () => {
    arrowBack();
  };

  return (
    <>
      <div>
        <div className="box-exam">
          <div className="title-exam flex">
            <IoMdArrowBack onClick={handleClick} className="icon-back" />
            <h3 className="bold">{data.title}</h3>
          </div>
        </div>
        <div className="conten-chapter">
          <QuestionChapter dataQuestion={listData} />
        </div>
      </div>
    </>
  );
}
