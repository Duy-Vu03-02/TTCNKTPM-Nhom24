import React, { useState, useEffect, useRef } from "react";
import "../resources/component/questionchapter.css";
import { IoMdCheckmark } from "react-icons/io";
import { GoDash } from "react-icons/go";
import { FaRegStar } from "react-icons/fa6";
import { FiSkipForward } from "react-icons/fi";
import { FiSkipBack } from "react-icons/fi";

export default function QuesitonTemplate({ dataQuestion }) {
  const [listData, setListData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quesitons, setQuestions] = useState([]);
  const [showAns, setShowAns] = useState([]);
  const [autoShowAns, setAutoShowAns] = useState({
    state: true,
    hightLine: false,
  });
  const [score, setScore] = useState({
    state: false,
    show: false,
    pass: false,
    countTrue: 0,
    countMustTrue: 0,
    countTrueMustTrue: 0,
  });
  const indexQuestion = useRef(0);

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
    setAutoShowAns((prevState) => {
      return {
        ...prevState,
        hightLine: false,
      };
    });
  };
  const handleSelected = (id, z) => {
    //handle checkbox - questions
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

    //handle change select - listdata
    for (var item of listData) {
      if (item.zindex === id) {
        item.selected = z;
      }
    }

    //heightLight
    setAutoShowAns((prevState) => {
      if (prevState.state) {
        return {
          state: true,
          hightLine: true,
        };
      }
    });
  };
  const handleAutoShowAns = () => {
    setAutoShowAns((prevState) => {
      if (prevState.state) {
        return {
          ...prevState,
          state: false,
        };
      } else {
        return {
          ...prevState,
          state: true,
        };
      }
    });
  };

  const handleChangeShowQs = (value) => {
    console.log(indexQuestion.current);
    if (value === true && indexQuestion.current < listData.length) {
      indexQuestion.current += 1;
      setCurrentQuestion(listData[indexQuestion.current]);
    } else if (value === false && indexQuestion.current > 0) {
      indexQuestion.current -= 1;
      setCurrentQuestion(listData[indexQuestion.current]);
    }
  };
  const handleSHowAns = (zindex, z) => {
    setShowAns((prevState) => {
      const check = prevState.includes((item) => item === zindex);
      if (check) {
        const filter = prevState.filter((item) => item !== zindex);
        return [...filter];
      } else {
        return [...prevState, zindex];
      }
    });

    handleSelected(zindex, z);
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
                        <ul className="wrap-ans">
                          {currentQuestion.answer.map((rep, z) => (
                            <li
                              key={z}
                              className={`${score.show ? "disable" : ""} 
                              ${
                                listData[indexQuestion.current].trueAnswer ===
                                  z &&
                                listData[indexQuestion.current].selected !==
                                  null
                                  ? "check-correct"
                                  : ""
                              }
                              ${
                                listData[indexQuestion.current].trueAnswer !==
                                  z &&
                                listData[indexQuestion.current].selected !==
                                  null &&
                                listData[indexQuestion.current].selected === z
                                  ? "check-wrong"
                                  : ""
                              }
                              ${autoShowAns.hightLine ? "disable" : ""}
                              ${
                                showAns.some(
                                  (item) => item === currentQuestion.zindex
                                ) && currentQuestion.trueAnswer === z
                                  ? "check-correct"
                                  : ""
                              }
                              last-ans flex`}
                              onClick={() =>
                                handleSelected(currentQuestion.zindex, z)
                              }
                            >
                              {console.log(showAns, currentQuestion.zindex)}
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
                        <div className="btn-handle flex">
                          <div className="btn-show">
                            <button
                              onClick={() =>
                                handleSHowAns(
                                  currentQuestion.zindex,
                                  currentQuestion.trueAnswer
                                )
                              }
                            >
                              Hiện đáp án
                            </button>
                          </div>
                          <div className="flex">
                            <div className="wrap-skip flex">
                              <FiSkipBack />
                              <button onClick={() => handleChangeShowQs(false)}>
                                Câu trước
                              </button>
                            </div>
                            <div className="wrap-skip flex">
                              <FiSkipForward />
                              <button onClick={() => handleChangeShowQs(true)}>
                                Câu tiếp
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="right-temp">
              <div className="wrap-btn-complete" style={{ borderTop: "none" }}>
                <div className={`btn-complete flex`}>
                  <div className="auto-next-qs" onClick={handleAutoShowAns}>
                    <input
                      className={autoShowAns.state ? "" : "un-auto-next-qs"}
                      type="button"
                      value={
                        autoShowAns.state
                          ? "Tự hiển thị đáp án"
                          : "Không hiển thị đáp án"
                      }
                    />
                    <div
                      className={`btn-auto-next-qs ${
                        autoShowAns.state ? "" : "un-auto-next-qs"
                      }`}
                    ></div>
                  </div>
                </div>
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
