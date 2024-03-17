import React, { useState, useEffect } from "react";

export default function QuesitonTemplate(props) {
  const [listData, setListData] = useState([]);
  const [currentQuestion, setCurrentQusetion] = useState(0);
  useEffect(() => {
    var data = props.dataQuestion;
    data.forEach((element, z) => {
      element.selected = null;
      element.index = z + 1;
    });
    setListData(data);
  }, []);

  return (
    <>
      <div className="question-template">
        <div>
          <div className="flex">
            <div className="left-temp"></div>
            <div className="right-temp"></div>
          </div>
          <div className="next-question"></div>
        </div>
      </div>
    </>
  );
}
