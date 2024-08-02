import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../redux/features/actions/postActions";
import { getPosts } from "../../redux/features/slices/postSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { formatDate } from "../../utils";

export const Home = () => {
  const { loading, posts, error } = useSelector(getPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className=" border border-white relative h-[50vh] main-container">
        <div className="mt-5">
          <p className="font-semibold text-lg text-primary text-center">
            INSIGHTS
          </p>
          <h1 className="font-serif text-5xl font-semibold my-2 text-center">
            Constructive Thinking
          </h1>
          <p className="text-lg text-center">
            Ideas at the intersection of bland strategy, digital design, and
            social impact
          </p>
        </div>

        <div className="border shadow h-[65vh] w-[95%] absolute top-[50%] p-10">
          {loading ? (
            <p>loading...</p>
          ) : posts?.length ? (
            <Slider {...settings} className="h-[100%] ">
              {posts.map((post, index) => (
                <div key={index} className="">
                  <div className=" flex flex-col md:flex-row items-center justify-between ">
                    <div>
                      <p className="font-medium mb-3">ARTICLE</p>
                      <h1 className="font-serif text-3xl font-semibold capitalize">
                        {post.title}
                      </h1>
                      <p className="text-lg my-3">{post.content}</p>
                      <div>
                        <Link
                          to={`/posts/${post.id}`}
                          className="px-4 py-2 bg-gray-400  text-lg block text-white w-20 flex items-center justify-center hover:bg-gray-500 transation duration-500"
                        >
                          Read
                        </Link>
                      </div>
                    </div>
                    <div className=" md:h-[50vh] w-[50%]">
                      <img src={post.image} alt={post.title} className="w-[100%] h-[100%] object-cover rounded"/>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
      <div className="bg-[#f8f8f8] pt-[300px] pb-5">
        <div className="main-container">
          <div>
            {loading ? (
              <p>loading...</p>
            ) : posts?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-3">
                {posts.map((post, index) => (
                  <Link
                    to={`/posts/${post.id}`}
                    key={index}
                    className="flex flex-col w-full "
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full rounded-[1rem] h-[16rem] "
                    />
                    <div className="py-4 flex flex-col justify-center items-center">
                      <h2 className="text-[16px] font-bold">{post.title}</h2>
                      <p className="text-[#848484] text-justify text-[12px]">
                        {post.content}
                      </p>
                    </div>
                    <div className="flex justify-between px-5">
                      <div className="flex items-center">
                        <div class="avatar">
                          <div class="w-8 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                          </div>
                        </div>
                        <div className="ml-2">
                          <div>
                            By{" "}
                            <span className="capitalize">
                              {post.author.username}
                            </span>
                          </div>
                          {/* <div>{formatDate(post.updatedAt)}</div> */}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FaRegComment />{" "}
                        <span className="mx-2">{post?.comments?.length}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No posts found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
