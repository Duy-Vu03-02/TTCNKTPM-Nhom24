import React, { useEffect, useState, useContext } from "react";
import logo from "../data/png/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../resources/component/header.css";
import { FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FaFacebook } from "react-icons/fa";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

export default function Header() {
  // data conext
  const { userData, setUserData } = useContext(UserContext);
  const [boxLogin, setBoxLogin] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const [dataLocal, setDataLocal] = useState(null);
  const [showSetting, setShowSetting] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    name: "",
    email: "",
    avatar: "",
    userID: "",
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await JSON.parse(localStorage.getItem("showLogin"));
      if (res === false) {
        setCheckBox(true);
        setBoxLogin(false);
      } else {
        setCheckBox(false);
        setBoxLogin(true);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const data = await JSON.parse(localStorage.getItem("acc"));
      if (data != null) {
        const url =
          "http://localhost/BaoCaoThucTap/Server/API/controllers/user/loginUser.php";
        const response = await axios.post(url, data);
        if (response.status === 200) {
          const resData = response.data;
          const temp = {
            provider:
              resData.facebook == null || resData.facebook === ""
                ? "email"
                : "facebook",
            name: resData.name,
            email: resData.email ? resData.email : null,
            picture: resData.picture ? resData.picture : null,
            userID: resData.userID != null ? resData.userID : null,
            facebook: resData.facebook != null ? resData.facebook : null,
          };
          setDataLocal(temp);
          setUserData(temp);
          setBoxLogin(false);
          setCheckBox(true);
          localStorage.setItem("showLogin", JSON.stringify(false));
          localStorage.setItem("acc", JSON.stringify(temp));
          if (resData.questionerr) {
            let listID = JSON.parse(resData.questionerr);
            listID = listID.map((item) => ({ id: item, count: 1 }));
            listID = listID.length > 25 ? listID.splice(0, 25) : listID;
            localStorage.setItem("question_err", JSON.stringify(listID));
          }
        }
      }
    };
    fetch();
  }, []);

  const storeLocal = (data) => {
    if (data != null) {
      localStorage.setItem("acc", JSON.stringify(data));
    }
  };

  const fetchDb = async (data) => {
    if (data != null) {
      const url =
        "http://localhost/BaoCaoThucTap/Server/API/controllers/user/loginUser.php";
      const response = await axios.post(url, data);
      if (response.status === 200) {
        const resData = response.data;
        const temp = {
          provider:
            resData.facebook == null || resData.facebook === ""
              ? "email"
              : "facebook",
          name: resData.name,
          email: resData.email ? resData.email : null,
          picture: resData.picture ? resData.picture : null,
          userID: resData.userID != null ? resData.userID : null,
          facebook: resData.facebook != null ? resData.facebook : null,
        };
        setBoxLogin(false);
        setCheckBox(true);
        setDataLocal(temp);
        setUserData(temp);
        localStorage.setItem("showLogin", JSON.stringify(false));
        storeLocal(temp);
        if (resData.questionerr) {
          let listID = JSON.parse(resData.questionerr);
          listID = listID.map((item) => ({ id: item, count: 1 }));
          listID = listID.length > 25 ? listID.splice(0, 25) : listID;
          localStorage.setItem("question_err", JSON.stringify(listID));
          window.history.go();
        }
      }
    }
  };

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
  const handleLogout = () => {
    localStorage.clear();
    window.history.go();
  };
  const handleShowSetting = (value) => {
    setShowSetting(value);
  };
  const handleChangeUpdate = (e) => {
    setDataUpdate((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUpdateUser = async () => {
    const data = {
      provider: dataLocal.provider,
      oldEmail: dataLocal.email,
      oldUserID: dataLocal.userID,
      username: dataUpdate.name === "" ? dataLocal.name : dataUpdate.name,
      picture: dataUpdate.avatar === "" ? dataLocal.picture : dataUpdate.avatar,
      userID: dataUpdate.userID === "" ? dataLocal.userID : dataUpdate.userID,
    };
    if (dataUpdate.email === null || dataUpdate.email === "") {
      if (dataLocal.provider === "facebook") {
        data.email = null;
      } else {
        data.email = dataLocal.email;
      }
    } else {
      data.email = dataUpdate.email;
    }
    const url =
      "http://localhost/BaoCaoThucTap/Server/API/controllers/user/updateInfoUser.php";
    const response = await axios.post(url, data);
    if (response.status === 200) {
      setUserData(data);
    }

    setShowSetting(false);
  };

  const handle = () => {};
  return (
    <>
      <div className="header-content">
        <div className={`${showSetting ? "screen-mask" : ""}`}></div>
        {showSetting ? (
          <div className="box-setting-user">
            <div className="header-setting flex">
              <div className="flex">
                <FiSettings className="icon-setting" />
                <h4>Quản lý tài khoản</h4>
              </div>
              <div>
                <IoMdClose
                  className="icon-close"
                  onClick={() => handleShowSetting(false)}
                />
              </div>
            </div>
            <div className="content-setting flex">
              <div className="info-user">
                <img src={dataLocal.picture} alt="" />
                <p>{dataLocal.name}</p>
              </div>
              <div className="change-info">
                <h4>Cập nhật thông tin cá nhân</h4>
                <div className="change-detail">
                  <div className="change-name flex">
                    <p>Họ và tên: </p>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChangeUpdate}
                      placeholder={dataLocal.name}
                    />
                  </div>
                  <div className="change-email flex">
                    <p>Email: </p>
                    <input
                      type="text"
                      name="email"
                      onChange={handleChangeUpdate}
                      placeholder={
                        dataLocal.email ? dataLocal.email : "Nhập email"
                      }
                      disabled={userData.email ? true : false}
                    />
                  </div>
                  <div className="change-avartar flex">
                    <p>Avatar: </p>
                    <input
                      type="text"
                      name="avatar"
                      onChange={handleChangeUpdate}
                      placeholder="Nhập url avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-setting">
              <div className="btn-close">
                <button onClick={handleUpdateUser}>Cập nhật</button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="header flex">
          <div className="left-header flex">
            <img src={logo} alt="logo" />
            <Link to="http://localhost/BaoCaoThucTap/Server/admin/adminCommon/Login.php">
              Admin
            </Link>
            <Link to="/">Tin Tức</Link>
            <Link to="/">Xốp hơi</Link>
            <Link to="/">PE foam</Link>
          </div>
          <div className="right-header flex">
            <button>Hạng GPLX: A1</button>
            {dataLocal === null ? (
              <button onClick={() => handleBoxLogin(true)}>Đăng nhập</button>
            ) : (
              <div className="user-info flex">
                <img src={dataLocal.picture} alt="img-avatar" />
                <p>{dataLocal.name}</p>
                <div className="box-logout">
                  <div className="flex" onClick={() => handleShowSetting(true)}>
                    <FiSettings className="icon-setting" />
                    <p>Quản lý tài khoản</p>
                  </div>
                  <div className="flex" onClick={handleLogout}>
                    <FiLogOut className="icon-logout" />
                    <p>Đăng xuất</p>
                  </div>
                </div>
              </div>
            )}
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
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse.credential !== null) {
                        const decode = jwtDecode(credentialResponse.credential);
                        const resData = {
                          provider: "email",
                          name: decode.name,
                          email: decode.email ? decode.email : null,
                          picture: decode.picture ? decode.picture : null,
                          userID: null,
                        };
                        fetchDb(resData);
                      }
                    }}
                    onError={() => {
                      setBoxLogin(true);
                    }}
                  />
                </div>
                <div className="btn-face flex">
                  <FacebookLogin
                    appId="701802418590275"
                    autoLoad={false}
                    fields="name,email,picture"
                    icon={
                      <FaFacebook
                        style={{
                          background: "#3b5998",
                          color: "white",
                          margin: "0 5px",
                          fontSize: "25px",
                        }}
                      />
                    }
                    callback={(response) => {
                      if (
                        response.status !== "unknown" &&
                        response.data !== null
                      ) {
                        const resData = {
                          provider: "facebook",
                          name: response.name,
                          email: null,
                          picture: response.picture
                            ? response.picture.data.url
                            : null,
                          userID: response.userID,
                        };
                        fetchDb(resData);
                      } else {
                        setCheckBox(true);
                      }
                    }}
                    cssClass="my-facebook-button-class"
                  />
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
