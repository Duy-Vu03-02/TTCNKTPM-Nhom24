import React from "react";
import back from "../data/svg/back.svg";
import "../resources/noticeboard.css";
import { IoChevronBackOutline } from "react-icons/io5";

export default function NoticeBoard(props) {
  const listData = [
    {
      title: "biển báo cấm",
      count: 61,
    },
    {
      title: "biển báo nguy hiểm",
      count: 83,
    },
    {
      title: "biển báo hiệu lệnh",
      count: 51,
    },
    {
      title: "biển báo chỉ dẫn",
      count: 25,
    },
    {
      title: "biển báo phụ",
      count: 11,
    },
  ];
  const handleClick = () => {
    props.unComponent();
  };

  return (
    <>
      <div>
        <div className="box-exam">
          <div className="title-exam flex">
            <img src={back} alt="" onClick={handleClick} />
            <h3 className="bold">ôn tập lí thuyết hạng a1</h3>
          </div>
          <div className="groups-title">
            <ul className="wrap-groups">
              {listData.map((data, index) => (
                <li key={index}>
                  <div className="title-group flex">
                    <IoChevronBackOutline className="back-icon" />
                    <span>[{data.count}]</span>
                    <p>{data.title}</p>
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
