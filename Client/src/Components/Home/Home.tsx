import Profile from "../../assets/Images/Profile.jpg";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div>
      <SideBar />
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <img src={Profile} alt="Profile" className="h-8 w-8 rounded-full" />
        </div>
      </header>
    </div>
  );
};

export default Home;
