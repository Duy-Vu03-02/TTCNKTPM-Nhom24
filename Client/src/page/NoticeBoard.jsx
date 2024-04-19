import React, { useEffect, useState } from "react";
import axios from "axios";
import "../resources/noticeboard.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";

export default function NoticeBoard(props) {
  const [listData, setListData] = useState([]);
  const [show, setShow] = useState({
    state: ["5"],
    index: [],
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(
        "http://localhost/BaoCaoThucTap/Server/API/controllers/noticeBoard/titleNoticeBoard.php"
      );
      if (data.status === 200) {
        setListData(data.data);
      }
    };
    fetch();
  }, []);

  const handleClick = () => {
    props.unComponent();
  };
  const handleShow = (id) => {
    setShow((prevState) => {
      const check = prevState.state.some((item) => item === id);
      if (check) {
        const filteredState = prevState.state.filter((item) => item !== id);
        return {
          ...prevState,
          state: filteredState,
        };
      } else {
        return {
          ...prevState,
          state: [...prevState.state, id],
        };
      }
    });
  };
  console.log(listData);
  return (
    <>
      <div>
        <div className="box-exam">
          <div className="title-exam flex">
            <IoMdArrowBack onClick={handleClick} className="icon-back" />
            <h3 className="bold">biển báo giao thông</h3>
          </div>
          <div className="groups-title">
            <ul className="wrap-groups">
              {listData &&
                listData.map((data, index) => (
                  <li key={index}>
                    <div
                      className="title-group flex"
                      onClick={() => handleShow(data.id)}
                    >
                      <IoChevronBackOutline
                        className={`back-icon ${
                          show.state.some((item) => item === data.id)
                            ? "back-icon-active"
                            : ""
                        }`}
                      />
                      <span>[{data.count}]</span>
                      <p>{data.title}</p>
                    </div>
                    <div
                      className={`${
                        show.state.some((item) => item === data.id)
                          ? "block"
                          : "none"
                      }`}
                    >
                      {show.state.some((item) => item === data.id) ? (
                        <ShowType indexData={data.id} />
                      ) : (
                        ""
                      )}
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

function ShowType({ indexData }) {
  const [listdata, setListdata] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(
        `http://localhost/baocaothuctap/Server/API/controllers/noticeBoard/contentNoticeBoard.php?index=${indexData}`
      );
      if (data.status === 200) {
        setListdata(data.data);
      }
    };
    fetch();
  }, [indexData]);

  return (
    <>
      <div className="flex">
        <ul className="wrap-list-notice">
          {listdata.map((data, index) => (
            <li key={index} className="flex">
              <div className="notice-img">
                <img src={data.img} alt={data.title} />
              </div>
              <div className="notice-content">
                <h3>{data.title}</h3>
                <p>{data.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
