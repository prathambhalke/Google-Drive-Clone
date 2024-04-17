import  { useState } from 'react';

const SideBar = () => {
  const [activeTab, setActiveTab] = useState('myDrive');

  const changeTab = (tabName : any) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-1/4 bg-gray-200">
        <div className="p-4">
          <button
            className="block w-full py-2 px-4 mb-4 text-gray-700 rounded-md bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none"
            onClick={() => changeTab('new')}
          >
            New
          </button>
          <button
            className={`block w-full py-2 px-4 mb-4 text-gray-700 rounded-md focus:outline-none ${activeTab === 'myDrive' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
            onClick={() => changeTab('myDrive')}
          >
            My Drive
          </button>
          <button
            className={`block w-full py-2 px-4 mb-4 text-gray-700 rounded-md focus:outline-none ${activeTab === 'starred' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
            onClick={() => changeTab('starred')}
          >
            Starred
          </button>
          <button
            className={`block w-full py-2 px-4 mb-4 text-gray-700 rounded-md focus:outline-none ${activeTab === 'bin' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
            onClick={() => changeTab('bin')}
          >
            Bin
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col w-3/4 bg-white">
        {/* Content based on active tab */}
        {activeTab === 'myDrive' && (
          <div className="p-4">My Drive Content</div>
        )}
        {activeTab === 'starred' && (
          <div className="p-4">Starred Content</div>
        )}
        {activeTab === 'bin' && (
          <div className="p-4">Bin Content</div>
        )}
        {/* Add more content for other tabs as needed */}
      </div>
    </div>
  );
};

export default SideBar;
