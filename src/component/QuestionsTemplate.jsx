import React, { useState, useEffect } from "react";
import "../resources/component/questionstemplate.css";
import { IoMdClose } from "react-icons/io";

export default function QuestionsTemplate({ dataQuestion }) {
  const [listData, setListData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showScore, setShowScore] = useState({
    state: false,
    score: null,
  });
  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    var data = dataQuestion;
    data.forEach((element) => {
      element.selected = false;
    });
    setListData(data);
  }, [dataQuestion]);

  const handleResQuestion = () => {
    var count = 0;
    listData.forEach((element) => {
      if (element.selected === element.trueAnswer) count++;
    });
    setShowCorrect(true);
    setShowScore({ state: true, score: count * 10 });
  };

  const handleShowScore = (value) => {
    setShowScore({ state: value, score: 0 });
  };

  const handleChangeSelect = (index, z) => {
    // Luu tru dap an de checkbox
    setQuestions((prevState) => {
      const newSelected = [
        {
          id: index,
          selected: z,
        },
      ];
      const filterQuestion = prevState.filter((item) => item.id !== index);
      return [...filterQuestion, ...newSelected];
    });
    // Luu tru dap an de tinh diem
    handleCountToScore(index, z);
  };

  const handleCountToScore = (zindex, z) => {
    for (var item of listData) {
      if (item.id === zindex) {
        item.selected = z;
      }
    }
  };
  const handle = () => {};
  return (
    <>
      {listData ? (
        <div className="wrap-list-question">
          <ul>
            {listData.map((data, index) => (
              <li key={index} className={`${showScore.state ? "disable" : ""}`}>
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
                          className={`${
                            showCorrect && z === data.trueAnswer
                              ? "correct-answer"
                              : ""
                          } ${
                            showCorrect &&
                            z !== data.trueAnswer &&
                            z === data.selected
                              ? "wrong-answer"
                              : ""
                          }  flex`}
                          onClick={() => handleChangeSelect(data.id, z)}
                        >
                          <input
                            type="checkbox"
                            checked={questions.some(
                              (item) =>
                                item.id === data.id && item.selected === z
                            )}
                            onChange={handle}
                          />
                          <span>{z + 1}.&nbsp; </span>
                          <p>{rep}.</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="btn-show">
                    {/* <button>Hiện đáp án</button> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="btn-submit-complete">
            <button onClick={() => handleResQuestion()}>Nộp bài</button>
          </div>
        </div>
      ) : (
        ""
      )}
      {showScore.state ? (
        <div className="screen-mask">
          <div className="box-score">
            <IoMdClose
              className="icon-close"
              onClick={() => handleShowScore(false)}
            />
            <p>Điểm của bạn</p>
            <h3>{showScore.score}</h3>
            <button onClick={() => handleShowScore(false)}>Đóng</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
