import { useContext, useState } from "react";
import { FaGoogleDrive } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import ProfileDetails from "./ProfileDetails";
import { globalContextProvider } from "../Context/GlobalContext";

const Header = () => {
  const [profileDetailsVisible, setProfileDetailsVisible] = useState(false);
  const { filesDataArray, setFilesDataArray } = useContext(
    globalContextProvider
  );
  const { currentUser } = filesDataArray;
  const getInitial = currentUser.email[0];
  const onProfileClick = () => {
    setProfileDetailsVisible(!profileDetailsVisible);
  };
  return (
    <>
      <header className="flex h-16 w-screen items-center justify-between  py-2">
        <div className="w-16 pl-1 duration-500 ml-8">
          <a href="/" className="flex w-fit items-center space-x-2 p-1">
            <FaGoogleDrive size={40} />
            <h1 className="text-2xl tracking-tight text-textC tablet:block">
              StudDrive
            </h1>
          </a>
        </div>
        <div className="relative flex items-center justify-start w-3/4 ml-[12%]">
          <span className="absolute left-4 h-10 w-10 cursor-pointer rounded-full p-2">
            <IoSearch size={24} />
          </span>
          <input
            type="text"
            placeholder="Search in Drive"
            className="w-full rounded-full placeholder-black bg-gray-300 pl-14 pr-18 py-3 text-black focus:bg-white focus:shadow-md focus:outline-none"
          />
        </div>
        <div
          className="mx-6 h-8 w-8 cursor-pointer overflow-hidden rounded-full text-white hover:transform transition-transform duration-300 hover:scale-110"
          title="View Profile"
          onClick={onProfileClick}
        >
          {currentUser.profilePhoto ? (
            <img
              src={currentUser.profilePhoto}
              alt="avatar"
              className="h-full w-full rounded-full object-center"
            />
          ) : (
            <p className="h-full w-full rounded-full flex items-center justify-center font-bold bg-red-500 text-lg ">
              {getInitial || "G"}
            </p>
          )}
        </div>
      </header>
      {profileDetailsVisible && <ProfileDetails />}
    </>
  );
};

export default Header;
