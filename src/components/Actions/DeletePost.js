import { useState, useEffect, useRef } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearDeletedPost,
  getPosts,
} from "../../redux/features/slices/postSlice";
import {
  deletePostThunk,
  getPostThunk,
} from "../../redux/features/actions/postActions";

const DeletePost = ({ id }) => {
  const { deleteLoading, deleteError, deletedPost } = useSelector(getPosts);
  const [isOpen, setIsOpen] = useState(false);
  const hasToastShow = useRef(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const dispatch = useDispatch();
  const handleDelete = async (e) => {
    e.preventDefault();

    const res = await dispatch(deletePostThunk(id));

    if ((res.type = "post/deletePost/fulfilled")) {
      toast.success("Post deleted successfully");
      dispatch(clearDeletedPost());
      dispatch(getPostThunk());
    }
  };

  useEffect(() => {
    console.log("deleteError", deleteError);
    console.log("deletedPost", deletedPost);
    if (deleteError && !deletedPost) {
      toast.error(deleteError.message || "Delete failed!", {
        toastId: "success1",
      });
    }
  }, [deleteError]);

  useEffect(() => {
    if (isOpen) {
      hasToastShow.current = false;
    }
  }, [isOpen]);

  return (
    <>
      <button onClick={openModal} className="text-red-500 font-medium">
        <MdOutlineDeleteOutline size={24} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <div className="text-red-500 font-medium text-3xl flex justify-center cursor-pointer">
              <MdOutlineDeleteOutline />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">
                Are you sure you want to delete this item?
              </h2>
            </div>
            <div className="mt-6 flex justify-around">
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                {deleteLoading ? "loading..." : "Confirm"}
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePost;
