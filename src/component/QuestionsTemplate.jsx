import React, { useState, useEffect } from "react";
import "../resources/component/questionstemplate.css";
import { IoMdClose } from "react-icons/io";

export default function QuestionsTemplate(props) {
  const [listData, setListData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showScore, setShowScore] = useState({
    state: false,
    score: null,
  });

  useEffect(() => {
    var data = props.dataQuestion;
    for (var item in data) {
      data[item].selected = null;
    }
    setListData(data);
  }, [props.dataQuestion]);

  const handleResQuestion = () => {
    var count = 0;
    listData.forEach((element) => {
      if (element.selected === element.trueAnswer) count++;
    });
    setShowScore({ state: true, score: count * 10 });
  };
  const handleShowScore = (value) => {
    setShowScore({ state: value, score: 0 });
  };
  const handleChangeSelect = (index, z) => {
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
    listData[index].selected = z;
  };

  return (
    <>
      {listData ? (
        <div className="wrap-list-question">
          <ul>
            {listData.map((data, index) => (
              <li key={index}>
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
                          className="flex"
                          onClick={() => handleChangeSelect(index, z)}
                        >
                          <input
                            type="checkbox"
                            checked={questions.some(
                              (item) => item.id === index && item.selected === z
                            )}
                          />
                          <span>{z + 1}.&nbsp; </span>
                          <p>{rep}.</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="btn-show">
                    <button>Hiện đáp án</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="btn-submit-complete">
            <button onClick={handleResQuestion}>Nộp bài</button>
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
          <div></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
