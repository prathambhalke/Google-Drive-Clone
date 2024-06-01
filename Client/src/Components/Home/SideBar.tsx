import { useContext, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FaGoogleDrive } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdUploadFile } from "react-icons/md";
import FileContent from "../FileContent";
import CreateFolder from "../Popups/CreateFolder";
import axios from "axios";
import { toast } from "react-toastify";
import { globalContextProvider } from "../../Context/GlobalContext";

const SideBar = () => {
  const [activeTab, setActiveTab] = useState("My Drive");
  const [newSelectVisible, setNewSelectVisible] = useState<boolean>(false);
  const [createFolderVisible, setCreateFolderVisible] = useState<boolean>(false);
  const [fileData, setFileData] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState("");

  const Ref = useRef<HTMLInputElement>(null);
  const { filesDataArray, setFilesDataArray } = useContext(globalContextProvider);

  const changeTab = (tabName: any) => {
    setActiveTab(tabName);
    setFilesDataArray({ ...filesDataArray, currentActiveTab: tabName });
  };

  const handleNewSelectClick = () => {
    setNewSelectVisible(!newSelectVisible);
  };

  const handleFolderVisible = () => {
    setCreateFolderVisible(true);
  };

  // Convert image file to base64
  const setFileToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageBase64(base64String);
      onUploadClick(file, base64String);  // Call upload click with the base64 string
    };
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files[0];
    if (e.target.files && e.target.files.length > 0) {
      setFileData(file);
      setFileToBase64(file);
      setNewSelectVisible(false);
    }
  };

  const onUploadClick = (file: File, base64String: string) => {
    axios
      .post("http://localhost:5002/upload/fileUpload", { imageBase64: base64String, origFileName: file.name }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.isExist) toast.success(`${file.name} already exists`);
        else toast.success(`${file.name}\nuploaded successfully! 📄`);
        // console.log("res", res);
      })
      .catch((err) => console.log("err", err));
  };

  // Array of buttons
  const buttons = [
    { icon: <FaGoogleDrive />, label: "My Drive", tab: "My Drive" },
    { icon: <FaRegStar />, label: "Starred", tab: "Starred" },
    { icon: <RiDeleteBin6Line />, label: "Bin", tab: "Bin for My Drive" },
  ];

  return (
    <div className="flex pb-3 justify-center">
      {/* Sidebar */}
      <div className="flex flex-col w-36 bg-transparent mx-14 mt-2 relative">
        <div>
          {newSelectVisible && (
            <div className="absolute items-center top-1 left-10 min-w-72 bg-white shadow-lg rounded-lg py-4 z-20">
              <button
                className="flex items-center w-full py-2 mb-2 border-b-2 hover:bg-gray-200"
                onClick={handleFolderVisible}
              >
                <MdOutlineCreateNewFolder size={24} className="mx-4" />
                New Folder
              </button>
              <label
                htmlFor="fileupload" // Add htmlFor to associate label with file input
                className="flex items-center w-full py-2 hover:bg-gray-200 cursor-pointer" // Add cursor pointer for better UX
              >
                <MdUploadFile size={24} className="mx-4" />
                File Upload
              </label>
              <input
                type="file"
                name="fileupload"
                id="fileupload"
                ref={Ref}
                hidden
                onChange={onFileSelect} // Call onFileSelect on file change
              />
            </div>
          )}
          <button
            className="w-full py-2 px-4 mb-4 flex items-center text-gray-700 rounded-md bg-white border hover:bg-gray-100"
            onClick={handleNewSelectClick}
          >
            <IoMdAdd className="mr-2" />
            New
          </button>
        </div>
        <div>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`w-full py-2 px-4 mb-4 flex items-center text-gray-700 rounded-md ${
                activeTab === button.tab
                  ? "bg-blue-500 text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
              onClick={() => {
                changeTab(button.tab);
                setNewSelectVisible(false);
              }}
            >
              <span className="mr-2">{button.icon}</span> {button.label}
            </button>
          ))}
        </div>
      </div>
      <FileContent activeTab={activeTab} />
      {createFolderVisible && (
        <CreateFolder
          FolderVisibility={createFolderVisible}
          setCreateFolderVisible={setCreateFolderVisible}
          inputRef={Ref}
        />
      )}
    </div>
  );
};

export default SideBar;