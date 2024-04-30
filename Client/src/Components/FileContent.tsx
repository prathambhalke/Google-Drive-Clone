import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";

const FileContent = ({ activeTab }: any) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5002/upload/getFileData")
      .then((res) => setFiles(res.data.data))
      .catch((err) => setError(err.message)); // Handle error
  }, [activeTab]); // Only fetch files when activeTab changes

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap w-3/4 bg-white rounded-xl p-7 overflow-y-auto">
      {files.map((file, index) => (
        <div key={index} className="w-48 h-64 p-4 rounded border border-red-200 shadow-lg mx-4 my-4 flex flex-col justify-between">
          <div className="p-1">
            <div className="font-bold text-lg mb-2 truncate">
              {file.origFileName}
            </div>
          </div>
          <div className="flex justify-center items-center">
            {file.fileData.endsWith(".pdf") ? (
              <a href={`http://localhost:5002/uploads/${file.fileData}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline flex items-center">
                <FaFilePdf size={30} className="mr-2" />
                PDF: {file.origFileName}
              </a>
            ) : file.fileData.endsWith(".jpeg") || file.fileData.endsWith(".jpg") || file.fileData.endsWith(".png") ? (
              <a href={`http://localhost:5002/uploads/${file.fileData}`} target="_blank" rel="noopener noreferrer">
                <img className="w-full h-full object-cover" src={`http://localhost:5002/uploads/${file.fileData}`} alt="Your Image" />
              </a>
            ) : (
              <div>{file.origFileName}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileContent;
