import React, { useState } from "react";
import back from "../data/svg/back.svg";
import "../resources/criticalquestion.css";

export default function CriticalQuestion(props) {
  const [questions, setQuestions] = useState([]);
  const handleChangeSelect = (index, z) => {
    setQuestions((prevState) => {
      const newSelected = [{ id: index, selected: z }];
      const filterQs = prevState.filter((item) => item.id !== index);
      return [...newSelected, ...filterQs];
    });
  };
  console.log(questions);
  const handleClick = () => {
    props.unComponent();
  };

  const store = {
    question: "cuộc đua xe chỉ được thực hiện khi nào?",
    answer: [
      "diễn ra trên đường phố không có người qua lại",
      "được người dân ủng hộ",
      "được cơ quan có thẩm quyền cấp phép",
      "được sự cho phép của Đảng và Nhà nước",
    ],
  };
  const listData = Array.from({ length: 10 }, () => store);
  return (
    <>
      <div className="content-critical">
        <div className="box-exam">
          <div className="title-exam flex">
            <img src={back} alt="" onClick={handleClick} />
            <h3 className="bold">câu hỏi điểm liệt</h3>
          </div>
          <div className="content-infor">
            <p>
              Dưới đây là <span className="bold">20</span> câu điểm liệt dành
              cho hạng <span className="bold">A1</span>, trong bài thi nếu làm
              sai sẽ bị đánh rớt
            </p>
          </div>
        </div>
        <div className="wrap-list-question">
          <ul>
            {listData.map((data, index) => (
              <li key={index}>
                <div className="wrap-question">
                  <div className="question-infor flex">
                    <h5>Câu {index + 1}.&nbsp;</h5>
                    <h5>{data.question}</h5>
                  </div>
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
                          <p>{rep}</p>
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
        </div>
      </div>
    </>
  );
}
