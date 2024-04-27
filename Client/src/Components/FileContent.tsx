import axios from "axios"
import { useEffect, useState } from "react"

const FileContent = ({activeTab} : any) => {
const [data, setData] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5002/upload/getFileData").then(res => setData(res.data.data)).catch(err => err)
  },[])
  return (
    <div className="flex flex-col w-[75%] bg-white rounded-xl">
    {/* Content based on active tab */}
    {activeTab === 'myDrive' && (
      <div className="p-4">
        <span>My Drive Content</span>
      {/* {
        data?.data.map(item => <img src={item}/>)
      } */}
      </div>
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