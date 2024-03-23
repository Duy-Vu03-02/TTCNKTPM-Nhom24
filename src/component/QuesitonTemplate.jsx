import React, { useState, useEffect, useRef } from "react";
import "../resources/component/questiontemplate.css";
import { IoMdCheckmark } from "react-icons/io";
import { LuClock } from "react-icons/lu";
import { GoDash } from "react-icons/go";
import { FaRegStar } from "react-icons/fa6";

export default function QuesitonTemplate({ dataQuestion }) {
  const [listData, setListData] = useState([]);
  const [timeExam, setTimeExam] = useState(1200);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quesitons, setQuestions] = useState([]);
  const [autoNextQs, setAutoNextQs] = useState(true);
  const [score, setScore] = useState({
    state: false,
    show: false,
    pass: false,
    countTrue: 0,
    countMustTrue: 0,
    countTrueMustTrue: 0,
  });
  const indexQuestion = useRef(1);

  useEffect(() => {
    setCurrentQuestion(dataQuestion[0]);
    const fetch = async () => {
      var data = await dataQuestion;
      data.forEach((item, index) => {
        item.selected = null;
        item.zindex = index;
      });
      setListData(data);
    };
    fetch();
  }, [dataQuestion]);

  useEffect(() => {
    if (quesitons.length === listData.length && quesitons.length > 0) {
      setScore((prevState) => {
        return {
          ...prevState,
          state: true,
        };
      });
    }
  }, [quesitons]);

  const handleShowQuestion = (data, index) => {
    setCurrentQuestion(data);
    indexQuestion.current = index;
  };
  const handleSelected = (id, z) => {
    //handle checkbox
    setQuestions((prevSelected) => {
      const newSelect = [
        {
          id: id,
          selected: z,
        },
      ];
      const filterSelected = prevSelected.filter((item) => item.id !== id);
      return [...newSelect, ...filterSelected];
    });

    //handle change select listdata
    for (var item of listData) {
      if (item.zindex === id) {
        item.selected = z;
      }
    }

    // handle Auto next question
    handleAutoNextQuestion();
  };
  const handleCalculatorScore = () => {
    handleTimeOut();
    var countTrue = 0;
    var countMustTrue = 0;
    var countTrueMustTrue = 0;
    listData.forEach((element) => {
      console.log(element);
      if (element.selected === element.trueAnswer) countTrue++;
      if (element.mustCorrect === true) {
        countMustTrue++;
        if (element.selected === element.trueAnswer) {
          countTrueMustTrue++;
        }
      }
    });

    setScore((prevState) => {
      return {
        ...prevState,
        state: true,
        show: true,
        countTrue: countTrue,
        countMustTrue: countMustTrue,
        countTrueMustTrue: countTrueMustTrue,
        pass:
          countMustTrue === countTrueMustTrue &&
          countMustTrue > 0 &&
          countTrue >= 10
            ? true
            : false,
      };
    });
  };

  const handleAutoNextQuestion = () => {
    if (autoNextQs && indexQuestion.current < listData.length) {
      const timeout = setTimeout(() => {
        setCurrentQuestion(listData[indexQuestion.current]);
        indexQuestion.current += 1;
      }, 1000);
      return () => clearTimeout(timeout);
    }
  };
  const handleTimeOut = () => {
    setTimeExam(0);
  };
  const handleChangeAutoNext = () => {
    autoNextQs ? setAutoNextQs(false) : setAutoNextQs(true);
  };
  const handle = () => {};
  return (
    <>
      <div className="question-template">
        <div>
          <div className="conten-domain flex">
            <div className="left-temp">
              {currentQuestion ? (
                <div className="wrap-list-question">
                  <li key={currentQuestion.zindex}>
                    <div className="wrap-question">
                      <div className="question-infor flex">
                        <h5>
                          Câu {currentQuestion.zindex + 1}
                          .&nbsp;
                        </h5>
                        <h5>{currentQuestion.question}?</h5>
                      </div>
                      {currentQuestion.img ? (
                        <div className="img-illustration">
                          <img src={currentQuestion.img} alt="" />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="answer-infor">
                        <ul>
                          {currentQuestion.answer.map((rep, z) => (
                            <li
                              key={z}
                              className={`${score.show ? "disable" : ""} flex`}
                              onClick={() =>
                                handleSelected(currentQuestion.zindex, z)
                              }
                            >
                              <input
                                type="checkbox"
                                checked={quesitons.some(
                                  (item) =>
                                    item.id === currentQuestion.zindex &&
                                    item.selected === z
                                )}
                                onChange={handle}
                              />
                              <span>{z + 1}.&nbsp; </span>
                              <p>{rep}.</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="right-temp">
              <div className="timer flex">
                <LuClock className="icon-clock" />
                <Clock
                  timer={timeExam}
                  timeOut={handleTimeOut}
                  className="cpn"
                />
              </div>
              <div className="wrap-btn-complete">
                {!score.show ? (
                  <div className={`btn-complete flex`}>
                    <div
                      className="auto-next-qs"
                      onClick={handleChangeAutoNext}
                    >
                      <input
                        className={autoNextQs ? "" : "un-auto-next-qs"}
                        type="button"
                        value={
                          autoNextQs ? "Tự động nhảy câu" : "Không tự nhảy câu"
                        }
                      />
                      <div
                        className={`btn-auto-next-qs ${
                          autoNextQs ? "" : "un-auto-next-qs"
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`${score.state ? "" : "btn-not-allowed"} flex`}
                    >
                      <IoMdCheckmark className="icon-check" />
                      <button
                        onClick={handleCalculatorScore}
                        className={score.state ? "" : "btn-not-allowed"}
                      >
                        nộp bài
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="result-exam">
                    <div className="title-result-exam">
                      <h3>{score.pass ? "đạt" : "không đạt"}</h3>
                    </div>
                    <div className="detial-result-exam">
                      <p>
                        Điểm đạt được: {score.countTrue}/{listData.length}
                      </p>
                      <p>
                        Số câu điểm liệt sai:{" "}
                        {score.countMustTrue - score.countTrueMustTrue}/
                        {score.countMustTrue}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="show-list">
                <ul className="wrap-list-qs flex">
                  {currentQuestion && listData
                    ? listData.map((data, index) => (
                        <li
                          key={index}
                          className={`item-select ${
                            index === currentQuestion.zindex
                              ? "item-select-active"
                              : ""
                          }
                          ${data.selected !== null ? "item-select-ok" : ""}
                          
                          flex`}
                          onClick={() => handleShowQuestion(data, index)}
                        >
                          <div
                            className={`btn-select
                            ${
                              score.show
                                ? data.selected === data.trueAnswer
                                  ? "result-question-true"
                                  : "result-question-false"
                                : ""
                            }
                          flex`}
                          >
                            {listData[index].selected === null ? (
                              <GoDash className="icon-dash" />
                            ) : listData[index].mustCorrect && score.show ? (
                              <FaRegStar className="icon-dash" />
                            ) : (
                              <IoMdCheckmark className="icon-dash" />
                            )}
                            <p>{index + 1}</p>
                          </div>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </div>
          <div className="next-question"></div>
        </div>
      </div>
    </>
  );
}

function Clock({ timer, timeOut }) {
  const [timeRemaining, setTimeRemaining] = useState({
    minute: 0,
    second: 0,
  });
  const interval = useRef(null);

  useEffect(() => {
    setTimeRemaining({
      minute: Math.floor(timer / 60),
      second: Math.floor(timer % 60),
    });
  }, [timer]);

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime.second === 0) {
          if (prevTime.minute < 1) {
            timeOut();
            clearInterval(interval.current);
            return {
              minute: 0,
              second: 0,
            };
          } else {
            return {
              minute: prevTime.minute - 1,
              second: 59,
            };
          }
        } else {
          return {
            second: prevTime.second - 1,
            minute: prevTime.minute,
          };
        }
      });
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  return (
    <>
      <div className="cpn">
        {timeRemaining.minute < 10
          ? "0" + timeRemaining.minute
          : timeRemaining.minute}
        :
        {timeRemaining.second < 10
          ? "0" + timeRemaining.second
          : timeRemaining.second}
      </div>
    </>
  );
}
