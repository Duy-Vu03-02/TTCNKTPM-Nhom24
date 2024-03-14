import React, { useState } from "react";
import back from "../data/svg/back.svg";
import "../resources/questionserror.css";

export default function QuesitionsError(props) {
  const handleClick = () => {
    props.unComponent();
  };
  return (
    <>
      <div>
        <div className="box-exam">
          <div className="title-exam flex">
            <img src={back} alt="" onClick={handleClick} />
            <h3 className="bold">top các câu sai</h3>
          </div>
        </div>
      </div>
    </>
  );
}
