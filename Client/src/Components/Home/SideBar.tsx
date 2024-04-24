import { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FaGoogleDrive } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdUploadFile } from "react-icons/md";
import FileContent from "../FileContent";
import CreateFolder from "../Popups/CreateFolder";
const SideBar = () => {
  const [activeTab, setActiveTab] = useState("myDrive");
  const [newSelectVisible, setNewSelectVisible] = useState<boolean>(false);
  const [createFolderVisible, setCreateFolderVisible] = useState<boolean>(false);
  const Ref = useRef(null);
  const changeTab = (tabName : any) => {
    setActiveTab(tabName);
  };

  const handleNewSelectClick = () => {
    setNewSelectVisible(!newSelectVisible);
  };
const onFileUpload = () => {
  Ref.current.click()
}

const onFolderUpload = () => {
  setCreateFolderVisible(!createFolderVisible)
}
  // Array of buttons
  const buttons = [
    { icon: <FaGoogleDrive />, label: "My Drive", tab: "myDrive" },
    { icon: <FaRegStar />, label: "Starred", tab: "starred" },
    { icon: <RiDeleteBin6Line />, label: "Bin", tab: "bin" },
  ];

  return (
    <div className="flex h-[88vh] pb-3">
      {/* Sidebar */}
      <div className="flex flex-col w-36 bg-transparent mx-14 mt-2 relative">
        <div>
          {newSelectVisible && (
            <div className="absolute items-center top-1 left-10 min-w-72 bg-white shadow-lg rounded-lg py-4">
              <button className="flex items-center w-full py-2 mb-2 border-b-2 hover:bg-gray-200" onClick={onFolderUpload}>
                <MdOutlineCreateNewFolder size={24} className="mx-4" />
                New Folder
              </button>
              <button className="flex items-center w-full py-2 hover:bg-gray-200" onClick={onFileUpload}>
                <MdUploadFile size={24} className="mx-4" />
                File Upload
              </button>
              <input type="file" name="fileupload" ref={Ref} id="fileupload" hidden/>
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
              onClick={() => changeTab(button.tab)}
            >
              <span className="mr-2">{button.icon}</span> {button.label}
            </button>
          ))}
        </div>
      </div>
      <FileContent activeTab={activeTab} />
      {
        createFolderVisible && <CreateFolder FolderVisibility={createFolderVisible} setCreateFolderVisible={setCreateFolderVisible} inputRef={Ref}/>
      }
       
    </div>
  );
};

export default SideBar;
