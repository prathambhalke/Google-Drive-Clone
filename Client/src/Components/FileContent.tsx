import axios from "axios";
import { useEffect, useState } from "react";
import tesImg from "../../../Server/uploads/1714245455264ma.jpeg";
const FileContent = ({ activeTab }: any) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5002/upload/getFileData")
      .then((res) => setData(res.data.data))
      .catch((err) => err);
  }, []);
  return (
    <div className="flex  flex-wrap w-[75%] bg-white rounded-xl p-7">
      {/* Content based on active tab */}
      {activeTab === "myDrive" && (
        <>
          <div className="w-[200px] h-max p-2 rounded border border-red-200 shadow-lg mx-9">
            <div className="p-1">
              <div className="font-bold text-md mb-2 text-ellipsis">
                Image Name
              </div>
            </div>
            <img className="w-full" src={tesImg} alt="Your Image" />
          </div>
          
        </>
      )}
      {activeTab === "starred" && <div className="p-4">Starred Content</div>}
      {activeTab === "bin" && <div className="p-4">Bin Content</div>}
      {/* Add more content for other tabs as needed */}
    </div>
  );
};

export default FileContent;
