import { Link } from "react-router-dom";
import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

export const LoginModal = ({ setIsLogin, onClose }) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg relative w-[80%] sm:w-[60%] md:w-[40%]">
          <div className="mt-4 text-center">
            <h2 className="textlg sm:text-2xl font-medium">
              Login or signup before post comment
            </h2>
          </div>
          <div className="mt-6 ">
            <div className="flex items-center justify-center space-x-6 text-[17px]">
              <Link
                to="/login"
                className="hover:font-medium no-underline"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className=" bg-primary text-white rounded-full py-2 px-6 hover:opacity-75 no-underline"
              >
                Signup
              </Link>
            </div>
          </div>
          <div
            className="absolute top-3 right-5 cursor-pointer hover:opacity-75"
            onClick={onClose}
          >
            <AiOutlineClose size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};
