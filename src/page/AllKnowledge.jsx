import React, { useState } from "react";
import "../resources/allknowledge.css";
import QuestionChapter from "../component/QuestionChapter";
import background from "../data/png/background.png";
import { IoMdArrowBack } from "react-icons/io";

export default function AllKnowledge(props) {
  const [showLesson, setShowLesson] = useState({
    state: false,
    index: null,
    data: null,
  });

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

  const listData = [
    {
      title: "Chương 1. Khái niệm và quy tắc giao thông",
      content: "Hạng A1 gồm 83/166 câu. Số câu điểm liệt 18.",
    },
    {
      title: "Chương 2. Nghiệp vụ vận tải",
      content: "Hạng A1 gồm 0/26 câu. Số câu điểm liệt 0",
    },
    {
      title: "Chương 3. Văn hóa, đạo đức",
      content: "Hạng A1 gồm 5/21 câu. Số câu điểm liệt 0.",
    },
    {
      title: "Chương 4. Kỹ thuật lái xe",
      content: "Hạng A1 gồm 12/56 câu. Số câu điểm liệt 2.",
    },
    {
      title: "Chương 5. Cấu tạo và sửa chữa xe",
      content: "Hạng A1 gồm 0/35 câu. Số câu điểm liệt 0.",
    },
    {
      title: "Chương 6. Hệ thống biển báo",
      content: "Hạng A1 gồm 65/182 câu. Số câu điểm liệt 0.",
    },
    {
      title: "Chương 7. Giải các thế sa hình",
      content: "Hạng A1 gồm 35/114 câu. Số câu điểm liệt 0.",
    },
  ];

  return (
    <>
      <div className="component-ledge">
        {showLesson.state ? (
          <Lesson data={showLesson.data} arrowBack={handleBackLesson} />
        ) : (
          <div className="box-exam">
            <div className="title-exam flex">
              <IoMdArrowBack onClick={handleClick} className="icon-back" />
              <h3 className="bold">ôn tập lí thuyết hạng a1</h3>
            </div>
            <div className="lessons">
              <ul className="list-lesson flex">
                {listData.map((data, index) => (
                  <li key={index} onClick={() => handleShowLesson(data, index)}>
                    <div className="lesson">
                      <div>
                        <h3>{data.title}</h3>
                        <p>{data.content}</p>
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
  const store = {
    id: 5,
    question: "cuộc đua xe chỉ được thực hiện khi nào?",
    img: background,
    answer: [
      "diễn ra trên đường phố không có người qua lại",
      "được người dân ủng hộ",
      "được cơ quan có thẩm quyền cấp phép",
      "được sự cho phép của Đảng và Nhà nước",
    ],
    trueAnswer: 2,
    mustCorrect: false,
  };
  const store1 = { ...store };
  store1.id = 1;
  store1.mustCorrect = true;
  store1.img = null;
  const store2 = { ...store };
  store2.id = 2;
  const store3 = { ...store };
  store3.id = 3;
  const store4 = { ...store };
  store4.id = 4;
  const store5 = { ...store };
  store5.id = 5;
  const store6 = { ...store };
  store6.id = 6;
  store6.mustCorrect = true;
  const store7 = { ...store };
  store7.id = 7;
  const store8 = { ...store };
  store8.id = 8;
  store8.img = null;
  const store9 = { ...store };
  store9.id = 9;
  const store10 = { ...store };
  store10.id = 10;
  const store11 = { ...store };
  store11.id = 11;
  const store12 = { ...store };
  store12.img = null;
  store12.id = 12;
  const store13 = { ...store };
  store13.id = 13;
  const store14 = { ...store };
  store14.id = 14;
  const store15 = { ...store };
  store14.id = 15;
  const store16 = { ...store };
  store14.id = 16;
  const store17 = { ...store };
  store14.id = 17;
  const store18 = { ...store };
  store14.id = 18;
  const store19 = { ...store };
  store14.id = 19;
  const store20 = { ...store };
  store14.id = 20;
  const store21 = { ...store };
  store14.id = 21;
  const store22 = { ...store };
  store14.id = 22;
  const store23 = { ...store };
  store14.id = 23;
  const store24 = { ...store };
  store14.id = 24;

  // const listData = Array.from({ length: 25 }, () => store);
  const listData = [
    store,
    store1,
    store2,
    store3,
    store4,
    store5,
    store6,
    store7,
    store8,
    store9,
    store10,
    store11,
    store12,
    store13,
    store14,
    store15,
    store16,
    store17,
    store18,
    store19,
    store20,
    store21,
    store22,
    store23,
    store24,
  ];
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
