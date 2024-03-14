import React from "react";
import Header from "../component/Header";
import back from "../data/svg/back.svg";
import { IoBookOutline } from "react-icons/io5";
import "../resources/exam.css";
import Footer from "../component/Footer";

export default function Exam(props) {
  const listData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const handleClick = () => {
    props.unComponent();
  };

  return (
    <>
      <div>
        <div>
          <div className="box-exam">
            <div className="title-exam flex">
              <img src={back} alt="" onClick={handleClick} />
              <h3 className="bold">danh sách đề thi hạng a1</h3>
            </div>
            <div>
              <ul className="wrap-list flex">
                {listData.map((data, index) => (
                  <li key={index}>
                    <div className="exam-cart ">
                      <div className="flex">
                        <IoBookOutline className="book-icon" />
                        <p>đề số 1</p>
                      </div>
                      <p style={{ margin: "0 5px" }}>---</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
