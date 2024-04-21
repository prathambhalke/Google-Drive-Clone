import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FaGoogleDrive } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import FileContent from '../FileContent';

const SideBar = () => {
  const [activeTab, setActiveTab] = useState('myDrive');

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };

  // Array of buttons
  const buttons = [
    { icon: <IoMdAdd />, label: "New", tab: "new" },
    { icon: <FaGoogleDrive />, label: "My Drive", tab: "myDrive" },
    { icon: <FaRegStar />, label: "Starred", tab: "starred" },
    { icon: <RiDeleteBin6Line />, label: "Bin", tab: "bin" }
  ];

  return (
    <div className="flex h-[88vh] pb-3">
      {/* Sidebar */}
      <div className="flex flex-col w-36 bg-transparent mx-14 mt-2">
        <div>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`w-full py-2 px-4 mb-4 flex items-center text-gray-700 rounded-md ${activeTab === button.tab ? 'bg-blue-500 text-white' : 'bg-white border hover:bg-gray-100'}`}
              onClick={() => changeTab(button.tab)}
            >
              <span className='mr-2'>{button.icon}</span> {button.label}
            </button>
          ))}
        </div>
      </div>
      <FileContent activeTab={activeTab} />
    </div>
  );
};

export default SideBar;
