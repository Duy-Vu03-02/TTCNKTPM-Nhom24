import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionTemplate from "../component/QuesitonTemplate";
import { IoBookOutline } from "react-icons/io5";
import "../resources/exam.css";
import { IoMdArrowBack } from "react-icons/io";

export default function Exam(props) {
  const [allExam, setAllExam] = useState([]);
  const [currentExam, setCurrentExam] = useState({
    state: false,
    index: null,
    data: null,
  });

  useEffect(() => {
    const fetch = async () => {
      const url =
        "http://localhost/baocaothuctap/Server/API/controllers/exam/exam.php";
      const data = await axios.get(url);
      if (data.status === 200) {
        setAllExam(data.data);
      }
    };
    fetch();
  }, []);
  const handleClick = () => {
    props.unComponent();
  };
  const handleShowExam = (data, index) => {
    setCurrentExam({
      index: index,
      data: data,
      state: true,
    });
  };
  const handleUnShow = () => {
    setCurrentExam({
      state: false,
      index: null,
    });
  };

  return (
    <>
      <div>
        <div>
          {!currentExam.state ? (
            <div className="box-exam">
              <div className="title-exam flex">
                <IoMdArrowBack onClick={handleClick} className="icon-back" />

                <h3 className="bold">danh sách đề thi hạng a1</h3>
              </div>
              <div>
                <ul className="wrap-list flex">
                  {/* nho fix lai */}
                  {allExam &&
                    allExam.length > 0 &&
                    allExam.map((data, index) => (
                      <li
                        key={index}
                        onClick={() => handleShowExam(data, index)}
                      >
                        <div className="exam-cart ">
                          <div className="flex">
                            <IoBookOutline className="book-icon" />
                            <p>đề số {index + 1}</p>
                          </div>
                          <p style={{ margin: "0 5px" }}>---</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ) : currentExam.data ? (
            <ExamTopic
              btnTopic={handleUnShow}
              dataQuestion={currentExam.data}
              index={currentExam.index}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

function ExamTopic({ btnTopic, dataQuestion, index }) {
  const handleTopic = () => {
    btnTopic(false);
  };
  return (
    <>
      <div>
        <div className="box-exam">
          <div className="title-exam flex">
            <IoMdArrowBack onClick={handleTopic} className="icon-back" />

            <h3 className="bold">đề số {index + 1} hạng a1</h3>
          </div>
          <div>
            <QuestionTemplate dataQuestion={dataQuestion} />
          </div>
        </div>
      </div>
    </>
  );
}
