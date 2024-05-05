import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { CgMoreVerticalR } from "react-icons/cg";
import { MoreOptionPopup } from "./index";
import { MdImageNotSupported } from "react-icons/md";

const FileContent = ({ activeTab }: any) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [visiblePopupIndex, setVisiblePopupIndex] = useState<number | null>(
    null
  );

  const togglePopupVisibility = (index: number) => {
    setVisiblePopupIndex(index === visiblePopupIndex ? null : index);
  };

  useEffect(() => {
    fetchData(); // Fetch files data on component mount
  }, [files]); // Only run once on mount

  const fetchData = () => {
    axios
      .get("http://localhost:5002/upload/getFileData")
      .then((res) => setFiles(res.data.data.reverse()))
      .catch((err) => setError(err.message));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative flex flex-col w-3/4 bg-white rounded-xl p-4 overflow-y-auto custom-scrollbar mt-1">
      <h2 className="text-2xl font-bold sticky -top-5 bg-white z-10 p-4">
        {activeTab}
      </h2>
      {activeTab === "My Drive" && (
        <div className="flex flex-wrap justify-between">
          {files.map((file, index) => (
            <div
            className="file-card w-[30%] h-56 p-2 rounded-lg bg-blue-50 border border-gray-200 shadow-sm mx-2 my-4 flex flex-col relative hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105"
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
                  onClick={() => togglePopupVisibility(index)}
                >
                  <CgMoreVerticalR size={20} />
                </div>
                <MoreOptionPopup
                  visiblePopupIndex={visiblePopupIndex}
                  index={index}
                  file={file}
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
          ))}
        </div>
      )}
      {activeTab === "Starred" && <h1>Starred</h1>}
      {activeTab === "Bin for My Drive" && <h1>Bin for My Drive</h1>}
    </div>
  );
};

export default FileContent;
