import React, { useEffect, useState } from "react";
import logo from "../data/png/logo.png";
import { Link } from "react-router-dom";
import "../resources/component/header.css";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookBoxFill } from "react-icons/ri";

export default function Header() {
  const [boxLogin, setBoxLogin] = useState("");
  const [checkbox, setCheckBox] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const res = await JSON.parse(localStorage.getItem("showLogin"));
      if (res === false) {
        setCheckBox(true);
        setBoxLogin(false);
      } else {
        setBoxLogin(true);
      }
    };
    fetch();
  }, []);
  const handleCheckBox = () => {
    checkbox ? setCheckBox(false) : setCheckBox(true);
    handleDontShow(checkbox);
  };
  const handleBoxLogin = (value) => {
    setBoxLogin(value);
  };
  const handleDontShow = (value) => {
    localStorage.setItem("showLogin", JSON.stringify(value));
  };

  const handle = () => {};
  return (
    <>
      <div className="header-content">
        <div className="header flex">
          <div className="left-header flex">
            <img src={logo} alt="logo" />
            <Link to="/">Trang chủ</Link>
            <Link to="/">Tin Tức</Link>
            <Link to="/">Xốp hơi</Link>
            <Link to="/">PE foam</Link>
          </div>
          <div className="right-header flex">
            <button>Hạng GPLX: A1</button>
            <button onClick={() => handleBoxLogin(true)}>Đăng nhập</button>
          </div>
        </div>
        {boxLogin ? (
          <div className="screen-mask">
            <div className="box-login">
              <div className="bar-login flex">
                <p className="bold">Tài khoản</p>
                <IoMdClose
                  className="icon-close"
                  onClick={() => handleBoxLogin(false)}
                />
              </div>
              <div className="choie-login">
                <p>
                  Hãy đăng nhập để lưu kết quả ôn tập của bạn và đồng bộ trên
                  các thiết bị của bạn.
                </p>
                <div className="btn-gg flex">
                  <FcGoogle className="icon-gg " />
                  <span>Sign in with Google</span>
                </div>
                <div className="btn-face flex">
                  <RiFacebookBoxFill className="icon-face" />
                  <span>Sign in with Facebook</span>
                </div>
                <div className="dont-show flex" onClick={handleCheckBox}>
                  <input
                    type="checkbox"
                    onChange={handle}
                    checked={checkbox ? true : false}
                  />
                  <p>Không tự động hiển thị trên thiết bị này.</p>
                </div>
              </div>
              <div className="btn-close">
                <button onClick={() => handleBoxLogin(false)}>Close</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
