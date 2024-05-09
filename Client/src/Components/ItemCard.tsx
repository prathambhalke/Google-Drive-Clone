import { FaFilePdf } from "react-icons/fa";
import { CgMoreVerticalR } from "react-icons/cg";
import { MdImageNotSupported } from "react-icons/md";
import MoreOptionPopup from "./Popups/MoreOptionPopup";

const ItemCard = ({file,id, togglePopupVisibility, visiblePopupIndex} : any) => {
  return (
    <div
    className="file-card w-[20%] h-56 p-2 rounded-lg bg-blue-50 border border-gray-200 shadow-sm mx-2 my-4 flex flex-col relative hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105"
    key={id}
  >
    <div className="p-1 flex justify-between items-start">
      <div
        className="font-bold text-lg mb-2 truncate"
        title={file.origFileName}
      >
        {file.origFileName}
      </div>
      <div
        className="ml-4 mb-8 cursor-pointer"
        onClick={() => togglePopupVisibility(id)}
      >
        <CgMoreVerticalR size={20} />
      </div>
      <MoreOptionPopup
        visiblePopupIndex={visiblePopupIndex}
        index={id}
        file={file}
        UniqueFileID={file._id}
      />
    </div>
    <div className="flex justify-center items-center overflow-hidden">
      {file.fileData.endsWith(".pdf") ? (
        <a
          href={`http://localhost:5002/uploads/${file.fileData}`}
          target="_blank"
          title="Click to Open the PDF"
        >
          <FaFilePdf size={100} className="mr-2 text-red-500" />
        </a>
      ) : file.fileData.endsWith(".jpeg") ||
        file.fileData.endsWith(".jpg") ||
        file.fileData.endsWith(".png") ? (
        <a
          href={`http://localhost:5002/uploads/${file.fileData}`}
          target="_blank"
          title="Click to Open the Image"
        >
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:5002/uploads/${file.fileData}`}
            alt="Your Image"
          />
        </a>
      ) : (
        <div>
          <MdImageNotSupported
            size={100}
            className="mr-2 text-red-200"
          />
        </div>
      )}
    </div>
  </div>
  )
}

export default ItemCard