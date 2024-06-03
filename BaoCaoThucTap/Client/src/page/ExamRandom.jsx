import React, { useState, useEffect } from "react";
import axios from "axios";
import "../resources/examRandom.css";
import QuestionTemplate from "../component/QuesitonTemplate";
import { IoMdArrowBack } from "react-icons/io";

export default function ExamRandom(props) {
  const [showExam, setShowExam] = useState(false);
  const [option, setOption] = useState(null);
  const [contents, setContens] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const url =
        "http://localhost/baocaothuctap/Server/API/controllers/examRandom/examRandom.php";
      const data = await axios.get(url);

      if (data.status === 200) {
        setOption(data.data);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (option && option.content) {
      setContens(option.content);
    }
  }, [option]);

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
            <div>
              <div className="box-exam">
                <div className="title-exam flex">
                  <IoMdArrowBack
                    onClick={() => handleShowExam(false)}
                    className="icon-back"
                  />

                  <h3 className="bold">đề ngẫu nhiên hạng a1</h3>
                </div>
                <div>
                  <QuestionTemplate dataQuestion={option && option.data} />
                </div>
              </div>
            </div>
          ) : (
            <div className="box-exam">
              <div className="title-exam flex">
                <IoMdArrowBack onClick={handleClick} className="icon-back" />
                <h3 className="bold">thi đề ngẫu nhiên hạng a1</h3>
              </div>
              <div className="introduce-exam ">
                <p className="bold">Cấu trúc đề thi</p>
                <div>
                  <p>
                    Thời gian làm bài: <span className="bold">19 phút</span>
                  </p>
                  <p>
                    Tổng số câu hỏi:{" "}
                    <span className="bold">
                      {contents && contents.totalQuestion}
                    </span>
                  </p>
                  <p>
                    Điểm tối thiểu đat:{" "}
                    <span className="bold">
                      21/{contents && contents.totalQuestion}
                    </span>
                  </p>
                  <p>
                    Số câu điểm liệt:{" "}
                    <span className="bold">
                      {contents && contents.questionCritical}
                    </span>
                  </p>
                </div>

                <button
                  className="btn-start"
                  onClick={() => handleShowExam(true)}
                >
                  Bắt đầu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
