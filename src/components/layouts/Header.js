import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { auth } from "../../redux/features/slices/authSlice";
import { FaRegEdit } from "react-icons/fa";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useSelector(auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userAuth = localStorage.getItem("userAuth");

    if (token && userAuth) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userAuth));
    }
  }, []);

  useEffect(() => {
    if (loginUser) {
      setIsAuthenticated(true);
      setUser(loginUser.user);
    }
  }, [loginUser]);

  const handleLogout = () => {
    // Clear localStorage and reset state
    localStorage.removeItem("token");
    localStorage.removeItem("userAuth");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex item-center justify-between pt-5 ">
      <div>
        <h1 className="font-semibold text-2xl text-primary">
          <Link to={"/"}>Articles</Link>
        </h1>
      </div>
      {isAuthenticated && (
        <div>
          <ul className="flex">
            <li className="mx-2">
              <Link to={"/dashboard"}>
                <span className="font-medium text-md hover:text-primary">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="mx-2">
              <Link to={"/dashboard/article"}>
                <span className="font-medium text-md hover:text-primary">
                  Articles
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
      {isAuthenticated ? (
        <div className="flex items-center ">
          <div className="mr-3">
            <Link to={"/createPost"} className="block flex items-center">
              <span>
                <FaRegEdit size={23} />
              </span>
              <span className="ml-1">Write</span>
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <div tabindex="0" role="button" className="m-1">
              <div className="w-10  h-10 rounded-full mx-3 border flex items-center justify-center cursor-pointer">
                <FaUser />
              </div>
            </div>
            <ul
              tabindex="0"
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <span className="font-medium text-md">{user?.email}</span>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className=" font-medium text-md hover:text-primary transition duration-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <Link
            to={"/login"}
            className="mx-3 text-md hover:text-primary transition duration-500"
          >
            Login
          </Link>
          <Link
            to={"/signup"}
            className="text-md hover:opacity-75 transition duration-500 bg-primary rounded-full px-5 py-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
