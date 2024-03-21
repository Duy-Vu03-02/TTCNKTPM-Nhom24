import React, { useState, useEffect, useRef } from "react";
import "../resources/component/questiontemplate.css";
import { IoMdCheckmark } from "react-icons/io";
import { LuClock } from "react-icons/lu";
import { GoDash } from "react-icons/go";

export default function QuesitonTemplate({ dataQuestion }) {
  const [listData, setListData] = useState([]);
  const [currentQuestion, setCurrentQusetion] = useState(0);

  useEffect(() => {
    var data = dataQuestion;
    data.forEach((element, z) => {
      element.selected = null;
      element.index = z + 1;
    });
    setListData(data);
  }, [dataQuestion]);

  const handleShowQuestion = (index) => {
    setCurrentQusetion(index);
  };

  return (
    <>
      <div className="question-template">
        <div>
          <div className="conten-domain flex">
            <div className="left-temp">
              {listData[currentQuestion] ? (
                <div className="wrap-list-question">
                  <li key={listData[currentQuestion].id}>
                    <div className="wrap-question">
                      <div className="question-infor flex">
                        <h5>Câu {listData[currentQuestion].id}.&nbsp;</h5>
                        <h5>{listData[currentQuestion].question}?</h5>
                      </div>
                      {listData[currentQuestion].img ? (
                        <div className="img-illustration">
                          <img src={listData[currentQuestion].img} alt="" />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="answer-infor">
                        <ul>
                          {listData[currentQuestion].answer.map((rep, z) => (
                            <li key={z} className="flex">
                              <input type="checkbox" />
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
                <Clock timer={1200} className="cpn" />
              </div>
              <div className="wrap-btn-complete">
                <div className="btn-complete flex">
                  <IoMdCheckmark className="icon-check" />
                  <button>nộp bài</button>
                </div>
              </div>
              <div className="show-list">
                <ul className="wrap-list-qs flex">
                  {listData.map((data, index) => (
                    <li
                      key={index}
                      className={`item-select ${
                        index === currentQuestion ? "item-select-active" : ""
                      } flex`}
                      onClick={() => handleShowQuestion(index)}
                    >
                      <div className="btn-select flex">
                        <GoDash className="icon-dash" />
                        <p>{index + 1}</p>
                      </div>
                    </li>
                  ))}
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

function Clock({ timer }) {
  const [timeRemaining, setTimeRemaining] = useState({
    minute: Math.floor(timer / 60),
    second: Math.floor(timer % 60),
  });
  const interval = useRef(null);
  useEffect(() => {
    interval.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime.second === 0) {
          if (prevTime.minute < 1) {
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
