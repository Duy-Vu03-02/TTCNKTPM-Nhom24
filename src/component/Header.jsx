import React from "react";
import logo from "../data/png/logo.png";
import { Link } from "react-router-dom";
import "../resources/header.css";

export default function Header() {
  return (
    <>
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
          <button>Đăng nhập</button>
        </div>
      </div>
    </>
  );
}
