// import React, { useState } from "react";
// import back from "../data/svg/back.svg";
// import "../resources/criticalquestion.css";
// import background from "../data/png/background.png";

// export default function CriticalQuestion(props) {
//   const [questions, setQuestions] = useState([]);
//   const handleChangeSelect = (index, z) => {
//     setQuestions((prevState) => {
//       const newSelected = [{ id: index, selected: z }];
//       const filterQs = prevState.filter((item) => item.id !== index);
//       return [...newSelected, ...filterQs];
//     });
//   };
//   console.log(questions);
//   const handleClick = () => {
//     props.unComponent();
//   };

//   const store = {
//     question: "cuộc đua xe chỉ được thực hiện khi nào?",
//     answer: [
//       "diễn ra trên đường phố không có người qua lại",
//       "được người dân ủng hộ",
//       "được cơ quan có thẩm quyền cấp phép",
//       "được sự cho phép của Đảng và Nhà nước",
//     ],
//     // img: background,
//   };
//   const listData = Array.from({ length: 10 }, () => store);
//   return (
//     <>
//       <div className="content-critical">
//         <div className="box-exam">
//           <div className="title-exam flex">
//             <img src={back} alt="" onClick={handleClick} />
//             <h3 className="bold">câu hỏi điểm liệt</h3>
//           </div>
//           <div className="content-infor">
//             <p>
//               Dưới đây là <b>20</b> câu điểm liệt dành cho hạng <b>A1</b>, trong
//               bài thi nếu làm sai sẽ bị đánh rớt
//             </p>
//           </div>
//         </div>
//         <div className="wrap-list-question">
//           <ul>
//             {listData.map((data, index) => (
//               <li key={index}>
//                 <div className="wrap-question">
//                   <div className="question-infor flex">
//                     <h5>Câu {index + 1}.&nbsp;</h5>
//                     <h5>{data.question}?</h5>
//                   </div>
//                   {data.img ? (
//                     <div className="img-illustration">
//                       <img src={data.img} alt="" />
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                   <div className="answer-infor">
//                     <ul>
//                       {data.answer.map((rep, z) => (
//                         <li
//                           key={z}
//                           className="flex"
//                           onClick={() => handleChangeSelect(index, z)}
//                         >
//                           <input
//                             type="checkbox"
//                             checked={questions.some(
//                               (item) => item.id === index && item.selected === z
//                             )}
//                           />
//                           <span>{z + 1}.&nbsp; </span>
//                           <p>{rep}.</p>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="btn-show">
//                     <button>Hiện đáp án</button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import back from "../data/svg/back.svg";
import "../resources/criticalquestion.css";
import background from "../data/png/background.png";
import QuestionsTemplate from "../component/QuestionsTemplate";

export default function CriticalQuestion(props) {
  const handleClick = () => {
    props.unComponent();
  };
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
  };
  const store1 = { ...store };
  store1.id = 4;

  const store2 = { ...store };
  store2.id = 3;

  const store3 = { ...store };
  store3.id = 2;

  const store4 = { ...store };
  store4.id = 1;

  const listData = [store, store1, store2, store3, store4];

  return (
    <>
      <div className="content-critical">
        <div className="box-exam">
          <div className="title-exam flex">
            <img src={back} alt="" onClick={handleClick} />
            <h3 className="bold">câu hỏi điểm liệt</h3>
          </div>
          <div className="content-infor">
            <p>
              Dưới đây là <b>20</b> câu điểm liệt dành cho hạng <b>A1</b>, trong
              bài thi nếu làm sai sẽ bị đánh rớt
            </p>
          </div>
        </div>
        <div>
          <QuestionsTemplate dataQuestion={listData} />
        </div>
      </div>
    </>
  );
}
