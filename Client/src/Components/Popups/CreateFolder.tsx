import React, { useEffect, useRef, useState } from 'react';

const CreateFolder = ({ FolderVisibility,setCreateFolderVisible } : any) => {
  const [folderName, setFolderName] = useState('');
  const inputRef = useRef(null);
  const handleCreate = () => {
    // Logic to create the folder goes here
    // For this example, let's just log the folder name
    console.log('Creating folder:', folderName);
  };

  const handleCancel = () => {
    setCreateFolderVisible(false)
  };
  useEffect(()=>FolderVisibility && inputRef.current.focus(), [])

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-40 ${FolderVisibility ? "backdrop-blur-sm" : ""}`}>
      <div className="bg-white rounded-lg p-8 w-96 border border-black z-40">
        <h2 className="text-xl font-semibold mb-4">Create Folder</h2>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          ref={inputRef}
          placeholder="Folder Name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Create
          </button>
          <button
            onClick={handleCancel}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
