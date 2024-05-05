import { FaRegStar } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const MoreOptionPopup = ({ visiblePopupIndex, index, file }: any) => {
  return (
    <>
      {visiblePopupIndex === index && (
        <div className="file-popup absolute top-12 right-0 w-40 bg-white shadow-xl border border-gray-300 rounded-lg">
          <a
            href={`http://localhost:5002/uploads/${file.fileData}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-blue-500"
          >
            <button className="flex items-center  pl-3 w-full py-1 mb-1 border-b-2 hover:bg-gray-200">
              <MdZoomOutMap size={20} className="mr-2" /> Open File
            </button>
          </a>
          <button className="flex items-center  pl-3 w-full py-1 hover:bg-gray-200 border-b-2 hover:text-yellow-500">
            <FaRegStar size={20} className="mr-2" /> Add to Starred
          </button>
          <button className="flex items-center  pl-3 w-full py-1 mb-1 hover:bg-gray-200 hover:text-red-500">
            <RiDeleteBin6Line size={20} className="mr-2" /> Move to Bin
          </button>
        </div>
      )}
    </>
  );
};

export default MoreOptionPopup;
