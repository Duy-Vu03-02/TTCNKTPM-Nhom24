import React from "react";
import { Link } from "react-router-dom";
import { FaRegCopyright } from "react-icons/fa6";
import { FaRegFaceSmile } from "react-icons/fa6";
export default function Footer() {
  return (
    <>
      <div className="flex">
        <FaRegCopyright className="copyright" />
        <p className="footer">2024 onthigplx.vn</p>
        <FaRegFaceSmile className="copyright" />
        <p className="footer">
          Website được tạo bởi <Link>Nhóm 24</Link>
        </p>
      </div>
    </>
  );
}
