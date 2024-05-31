import { FaRegStar } from "react-icons/fa";
import { MdZoomOutMap } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineRestore } from "react-icons/md";
import {
  DELETESELECTEDBINFILEDATA,
  REMOVESTARREDFILEDATA,
  RESTOREFILE,
  UPLOADBINFILEDATA,
  UPLOADSTARREDFILEDATA,
} from "../../../constants/api";
import axios from "axios";
import { globalContextProvider } from "../../Context/GlobalContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const MoreOptionPopup = ({
  visiblePopupIndex,
  index,
  file,
  UniqueFileID,
}: any) => {
  const { filesDataArray, setFilesDataArray } = useContext(
    globalContextProvider
  );

  const foundRequiredFile = filesDataArray.filesData.filter(
    (item: any) => item._id === UniqueFileID
  );

  const uploadBinFile = async () => {
    axios
      .post(UPLOADBINFILEDATA, ...foundRequiredFile)
      .then((res) => {
        toast.dark(
          `${foundRequiredFile[0].origFileName}\nadded to Bin successfully! 📄`
        );
        console.log("res", res);
      })
      .catch((err) => {
        toast.error("failed to add to bin");
        console.log(err);
      });
  };

  const uploadStarredFile = async () => {
    axios
      .post(UPLOADSTARREDFILEDATA, ...foundRequiredFile)
      .then((res) => {
        toast.dark(
          `${foundRequiredFile[0].origFileName}\nadded to Starred successfully! 📄`
        );
        console.log("res", res);
      })
      .catch((err) => {
        toast.info("failed to add to Starred");
        console.log(err);
      });
  };

  const deleteBinFile = (UniqueFileID: number) => {
    axios
      .delete(DELETESELECTEDBINFILEDATA, {
        data: { selectedFileIds: UniqueFileID },
      })
      .then((res) => {
        toast.dark("File deleted from bin successfully");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed to delete file from bin");
        console.log(err);
      });
  };

  const removeStarredFile = (UniqueFileID: number) => {
    console.log(UniqueFileID);
    axios
      .delete(REMOVESTARREDFILEDATA, {
        data: { selectedFileIds: UniqueFileID },
      })
      .then((res) => {
        toast.dark("removed from Starred");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed to delete file from bin");
        console.log(err);
      });
  };

  const RestoreFile = (UniqueFileID: number) => {
    axios
      .post(RESTOREFILE, { data: { selectedFileIds: UniqueFileID } })
      .then((res) => {
        toast.dark("File Restored successfully");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed to Restore File");
        console.log(err);
      });
  };

  const { currentActiveTab } = filesDataArray;
  return (
    <>
      {visiblePopupIndex === index && (
        <div className="file-popup absolute top-12 right-0 w-40 bg-white shadow-xl border border-gray-300 rounded-lg">
          {currentActiveTab !== "Bin for My Drive" && (
            <a
              href={file.fileData}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-500"
            >
              <button className="flex items-center  pl-3 w-full py-1 mb-1 border-b-2 hover:bg-gray-200">
                <MdZoomOutMap size={20} className="mr-2" /> Open File
              </button>
            </a>
          )}

          {currentActiveTab === "Starred" ? (
            <button
              className="flex items-center  pl-3 w-full py-1 hover:bg-gray-200 border-b-2 hover:text-yellow-500"
              onClick={() => removeStarredFile(UniqueFileID)}
            >
              <FaRegStar size={20} className="mr-2" /> Remove from Starred
            </button>
          ) : currentActiveTab === "Bin for My Drive" ? (
            <button
              className="flex items-center  pl-3 w-full py-1 hover:bg-gray-200 border-b-2 hover:text-yellow-500"
              onClick={() => RestoreFile(UniqueFileID)}
            >
              <MdOutlineRestore size={20} className="mr-2" /> Restore
            </button>
          ) : (
            <button
              className="flex items-center  pl-3 w-full py-1 hover:bg-gray-200 border-b-2 hover:text-yellow-500"
              onClick={uploadStarredFile}
            >
              <FaRegStar size={20} className="mr-2" /> Add to Starred
            </button>
          )}

          {currentActiveTab === "Bin for My Drive" ? (
            <button
              className="flex items-center  pl-3 w-full py-1 mb-1 hover:bg-gray-200 hover:text-red-500"
              onClick={() => deleteBinFile(UniqueFileID)}
            >
              <RiDeleteBin6Line size={20} className="mr-2" /> Delete forever
            </button>
          ) : (
            currentActiveTab !== "Starred" && (
              <button
                className="flex items-center  pl-3 w-full py-1 mb-1 hover:bg-gray-200 hover:text-red-500"
                onClick={uploadBinFile}
              >
                <RiDeleteBin6Line size={20} className="mr-2" /> Add to Bin
              </button>
            )
          )}
        </div>
      )}
    </>
  );
};

export default MoreOptionPopup;
