import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ItemCard } from "./index";
import { globalContextProvider } from "../Context/GlobalContext";
import addtobin from "../../public/Images/addtobin.svg";
import addtoStarred from "../../public/Images/addtostarred.svg";
import addtodrive from "../../public/Images/addtodrive.svg";
import { Spinner } from "./Spinner";

import {
  DELETEBINFILEDATA,
  GETBINFILEDATA,
  GETSTARREDFILEDATA,
  GETUSERS,
} from "../../constants/api";
import { toast } from "react-toastify";

const FileContent = ({ activeTab }: any) => {
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState({ status: "OK✅", allUsersData: [] });
  const [error, setError] = useState(null);
  const [binFiles, setBinFiles] = useState([]);
  const [starredFiles, setStarredFiles] = useState([]);
  const [visiblePopupIndex, setVisiblePopupIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { filesDataArray, setFilesDataArray }: any = useContext(
    globalContextProvider
  );

  const togglePopupVisibility = (index: number) => {
    setVisiblePopupIndex(index === visiblePopupIndex ? null : index);
  };

  const fetchData = () => {
    axios
      .get("http://localhost:5002/upload/getFileData")
      .then((res) => {
        setFiles(res.data.data.reverse());
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const fetchBinData = async () => {
    try {
      const response = await axios.get(GETBINFILEDATA);
      const binData = response.data.data;
      setBinFiles(binData);
    } catch (error) {
      toast.error("Error fetching bin data⚠️");
      console.error("Error fetching bin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStarredData = async () => {
    try {
      const response = await axios.get(GETSTARREDFILEDATA);
      const starredData = response.data.data;
      setStarredFiles(starredData);
    } catch (error) {
      toast.error("Error fetching Starred data⚠️");
      console.error("Error fetching Starred data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = () => {
    axios
      .get(GETUSERS)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => err)
      .finally(() => setLoading(false));
  };

  const deleteAllBinFiles = () => {
    axios
      .delete(DELETEBINFILEDATA)
      .then((res) => toast.success("Bin files deleted"))
      .catch((err) => {
        console.error("Error deleting bin files:", err);
        toast.error("Error deleting bin files");
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchUsers();
    fetchBinData();
    fetchStarredData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [files]);

  useEffect(() => {
    fetchBinData();
  }, [binFiles]);

  useEffect(() => {
    fetchStarredData();
  }, [starredFiles]);
  useEffect(() => {
    setFilesDataArray({
      ...filesDataArray,
      activeUsers: users.allUsersData,
      filesData: files,
    });
  }, [users, files]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-3/4 h-[85vh] bg-white rounded-xl p-4 overflow-y-auto custom-scrollbar mt-1">
        <Spinner />
        Data is Fetching
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center text-red-500 items-center w-3/4 h-[85vh] bg-white rounded-xl p-4 overflow-y-auto custom-scrollbar mt-1">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-3/4 h-screen md:h-[85vh] bg-white rounded-xl p-4 overflow-y-auto custom-scrollbar mt-1">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold sticky -top-5 bg-white z-10 p-1">
          {activeTab}
        </h2>
        {activeTab === "Bin for My Drive" && (
          <button
            className="bg-red-500 text-white font-bold font-mono p-2 rounded-lg"
            onClick={deleteAllBinFiles}
          >
            Empty Bin
          </button>
        )}
      </div>
      {activeTab === "My Drive" && (
        <>
          {files.length > 0 ? (
            <div className="flex flex-wrap justify-evenly">
              {files.map((file, index) => (
                <ItemCard
                  key={index}
                  file={file}
                  id={index}
                  visiblePopupIndex={visiblePopupIndex}
                  togglePopupVisibility={togglePopupVisibility}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-evenly flex-col items-center h-[80vh]">
              <p className="text-4xl font-mono font-bold text-blue-300 mb-12">
                Drive is Empty
              </p>
              <img src={addtodrive} alt="Add to drive" className="w-1/6" />
            </div>
          )}
        </>
      )}
      {activeTab === "Starred" && (
        <>
          {starredFiles.length > 0 ? (
            <div className="flex flex-wrap justify-evenly">
              {starredFiles.map((file, index) => (
                <ItemCard
                  key={index}
                  file={file}
                  id={index}
                  visiblePopupIndex={visiblePopupIndex}
                  togglePopupVisibility={togglePopupVisibility}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center flex-col items-center h-[80vh]">
              <p className="text-4xl font-mono font-bold text-yellow-300 mb-12">
                Starred is Empty
              </p>
              <img src={addtoStarred} alt="Add to Starred" className="w-1/6" />
            </div>
          )}
        </>
      )}
      {activeTab === "Bin for My Drive" && (
        <>
          {binFiles.length > 0 ? (
            <div className="flex flex-wrap justify-evenly">
              {binFiles.map((file, index) => (
                <ItemCard
                  key={index}
                  file={file}
                  id={index}
                  visiblePopupIndex={visiblePopupIndex}
                  togglePopupVisibility={togglePopupVisibility}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center flex-col items-center h-[80vh]">
              <p className="text-4xl font-mono font-bold text-red-300 mb-12">
                Bin is Empty
              </p>
              <img src={addtobin} alt="Add to Bin" className="w-1/4" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileContent;
