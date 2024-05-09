import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ItemCard } from "./index";
import { globalContextProvider } from "../Context/GlobalContext";
import { GETBINFILEDATA, GETUSERS } from "../../constants/api";
import { toast } from "react-toastify";

const FileContent = ({ activeTab }: any) => {
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [binFiles, setBinFiles] = useState([]);
  const [visiblePopupIndex, setVisiblePopupIndex] = useState<number | null>(
    null
  );
  const { filesDataArray, setFilesDataArray } = useContext(
    globalContextProvider
  );
  const togglePopupVisibility = (index: number) => {
    setVisiblePopupIndex(index === visiblePopupIndex ? null : index);
  };
  const fetchData = () => {
    axios
      .get("http://localhost:5002/upload/getFileData")
      .then((res) => setFiles(res.data.data.reverse()))
      .catch((err) => setError(err.message));
  };
  const fetchBinData = async () => {
    try {
      const response = await axios.get(GETBINFILEDATA);
      const binData = response.data.data;
      setBinFiles(binData);
    } catch (error) {
      toast.error("Error fetching bin data⚠️");
      console.error("Error fetching bin data:", error);
    }
  };
  const fetchUsers = () => {
    axios
      .get(GETUSERS)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => err);
  };
  useEffect(() => {
    fetchData();
    fetchUsers();
    fetchBinData();
  }, []);

  useEffect(() => {
    setFilesDataArray({
      ...filesDataArray,
      activeUsers: users.allUsersData,
      filesData: files,
    });
  }, [users, files]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative flex flex-col w-3/4 h-[90vh] bg-white rounded-xl p-4 overflow-y-auto custom-scrollbar mt-1">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold sticky -top-5 bg-white z-10 p-1">
          {activeTab}
        </h2>
        {activeTab === "Bin for My Drive" && (
          <button className="bg-red-500 text-white font-bold font-mono p-2 rounded-lg">
            Empty Bin
          </button>
        )}
      </div>
      {activeTab === "My Drive" && (
        <div className="flex flex-wrap justify-evenly">
          {files.map((file, index) => (
            <ItemCard
              file={file}
              id={index}
              visiblePopupIndex={visiblePopupIndex}
              togglePopupVisibility={togglePopupVisibility}
            />
          ))}
        </div>
      )}
      {activeTab === "Starred" && <h1>Starred</h1>}
      {activeTab === "Bin for My Drive" && (
        <div className="flex flex-wrap justify-evenly">
          {binFiles.map((file, index) => (
            <ItemCard
              file={file}
              id={index}
              visiblePopupIndex={visiblePopupIndex}
              togglePopupVisibility={togglePopupVisibility}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileContent;
