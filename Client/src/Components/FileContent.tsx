const FileContent = ({activeTab} : any) => {
  return (
    <div className="flex flex-col w-[75%] bg-white rounded-xl">
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
  )
}

export default FileContent