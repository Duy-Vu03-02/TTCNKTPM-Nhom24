import React from "react";
import back from "../data/svg/back.svg";
import "../resources/allknowledge.css";
import { IoMdArrowBack } from "react-icons/io";

export default function AllKnowledge(props) {
  const handleClick = () => {
    props.unComponent();
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
        <div className="box-exam">
          <div className="title-exam flex">
            <IoMdArrowBack onClick={handleClick} className="icon-back" />
            <h3 className="bold">ôn tập lí thuyết hạng a1</h3>
          </div>
          <div className="lessons">
            <ul className="list-lesson flex">
              {listData.map((data, index) => (
                <li key={index}>
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
      </div>
    </>
  );
}
