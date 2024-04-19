import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../resources/component/questiontemplate.css";
import { IoMdCheckmark } from "react-icons/io";
import { LuClock } from "react-icons/lu";
import { GoDash } from "react-icons/go";
import { FaRegStar } from "react-icons/fa6";
import { UserContext } from "../Context/UserContext";

export default function QuesitonTemplate({ dataQuestion }) {
  const [listData, setListData] = useState([]);
  const [timeExam, setTimeExam] = useState(1140);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quesitons, setQuestions] = useState([]);
  const [questionsErr, setQuestionsErr] = useState([]); // qs err cua exam hien tai
  const [questionsCorrect, setQuestionsCorrect] = useState([]);
  const [autoNextQs, setAutoNextQs] = useState(true);
  const indexQuestion = useRef(1);
  const { userData } = useContext(UserContext);
  const [score, setScore] = useState({
    state: false,
    show: false,
    pass: false,
    countTrue: 0,
    countMustTrue: 0,
    countTrueMustTrue: 0,
  });

  useEffect(() => {
    if (dataQuestion.length !== 0 && dataQuestion !== null) {
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
    }
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

  // update to db
  useEffect(() => {
    const fetch = async () => {
      if (score.show && questionsErr.length !== 0) {
        // update ques err and correct
        const listErr = questionsErr.map((item) => item.id);
        const listCorrect = questionsCorrect.map((item) => item);
        const url =
          "http://localhost/BaoCaoThucTap/server/API/controllers/questionsError/updateQuestions.php";
        const res = await axios.get(
          url + "?listerr=" + listErr + "&listcorrect=" + listCorrect
        );
        console.log(res);
        //  update ques err by user
        const dataLocal = await JSON.parse(localStorage.getItem("acc"));
        if (dataLocal !== null) {
          if (dataLocal.email !== null || dataLocal.userID !== null) {
            const url =
              "http://localhost/BaoCaoThucTap/server/API/controllers/user/updateQsErrByUser.php";
            const data = {
              email: dataLocal.email,
              userID: dataLocal.userID,
              listID: listErr,
              provider: dataLocal.provider,
            };
            const response = await axios.get(
              url +
                "?provider=" +
                data.provider +
                "&email=" +
                data.email +
                "&userID=" +
                data.userID +
                "&listID=" +
                data.listID
            );
          }
        }
      }
    };
    fetch();
  }, [score.show]);

  useEffect(() => {
    const fetch = async () => {
      if (score.show) {
        const dataLocal = await JSON.parse(
          localStorage.getItem("question_err")
        );
        // set local khi rong
        if (dataLocal === null) {
          localStorage.setItem("question_err", JSON.stringify(questionsErr));
          return;
        }
        // Set local khi da co data
        else {
          var tempQsErr = questionsErr.map((item) => ({ ...item }));
          if (dataLocal !== null && dataLocal.length > 0) {
            dataLocal.forEach((element) => {
              var check = tempQsErr.find((item) => item.id === element.id);
              if (check) {
                element.count += 1;
                tempQsErr = tempQsErr.filter((item) => item.id !== element.id);
              }
            });

            const newDataLocal = [...tempQsErr, ...dataLocal];
            const filterNewDataLocal = newDataLocal.splice(0, 24);
            localStorage.setItem(
              "question_err",
              JSON.stringify(filterNewDataLocal)
            );
          }
        }
      }
    };
    fetch();
  }, [score.show]);

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

    //handle auto next question
    handleAutoNextQuestion();
  };

  const handleCalculatorScore = () => {
    handleTimeOut();
    var countTrue = 0;
    var countMustTrue = 0;
    var countTrueMustTrue = 0;
    listData.forEach((element) => {
      if (element.selected === element.trueAnswer) {
        countTrue++;
        setQuestionsCorrect((prevState) => {
          return [...prevState, element.id];
        });
      }
      // Neu sai luu vao state qsErr
      else {
        if (questionsErr.length === 0 && questionsErr === null) {
          questionsErr([{ id: element.id, count: 1 }]);
        } else {
          setQuestionsErr((prevState) => {
            var check = prevState.find((item) => item.id === element.id);

            if (check) {
              const newQsErr = [{ id: check.id, count: check.count + 1 }];
              const qsErrFilter = prevState.filter(
                (item) => item.id !== element.id
              );
              return [...newQsErr, ...qsErrFilter];
            } else {
              const newQsErr = [{ id: element.id, count: 1 }];
              return [...newQsErr, ...prevState];
            }
          });
        }
      }
      if (element.mustCorrect === true) {
        countMustTrue++;
        if (element.selected === element.trueAnswer) {
          countTrueMustTrue++;
        }
      }
    });

    // Show ket qua
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
          countTrue >= 21
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
      }, 800);

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
                      <div
                        className="question-infor flex"
                        style={{ paddingBottom: "15px" }}
                      >
                        <h5>
                          Câu {currentQuestion.zindex + 1}
                          .&nbsp;
                        </h5>
                        <h5>{currentQuestion.question}</h5>
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
                              className={`${score.show ? "disable" : ""}
                              ${
                                score.show && currentQuestion.trueAnswer === z
                                  ? "check-correct"
                                  : ""
                              }
                              ${
                                score.show &&
                                currentQuestion.selected === z &&
                                currentQuestion.trueAnswer !==
                                  currentQuestion.selected
                                  ? "check-wrong"
                                  : ""
                              }
                              flex`}
                              onClick={() =>
                                handleSelected(currentQuestion.id, z)
                              }
                            >
                              <input
                                type="checkbox"
                                checked={quesitons.some(
                                  (item) =>
                                    item.id === currentQuestion.id &&
                                    item.selected === z
                                )}
                                onChange={handle}
                              />
                              <span>&nbsp; </span>
                              <p>{rep}</p>
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
