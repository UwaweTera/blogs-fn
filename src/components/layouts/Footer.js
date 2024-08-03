import React from "react";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <div>
      <section className="footer border-t">
        <div className=" w-[95%] sm:w-[85%]  mx-auto flex justify-between items-center py-5">
          <div>
            &copy; 2024 By <span className="font-semibold">Terah</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Blogs</h2>
          </div>
          <div className="flex items-center">
            <div>
              <a href="https://github.com/UwaweTera" target="_blank">
                <FaGithub size={23} />
              </a>
            </div>
            <div className="ml-3">
              <a
                href="https://www.linkedin.com/in/uwawe-terah/"
                target="_blank"
              >
                <CiLinkedin size={23} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
