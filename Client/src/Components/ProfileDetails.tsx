import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { globalContextProvider } from "../Context/GlobalContext";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const { filesDataArray, setFilesDataArray } = useContext(
    globalContextProvider
  );

  const onSignOut = () => {
    navigate("/signin");
    toast.success("SignOut SuccessFully!");
  };
  const { currentUser } = filesDataArray;
  const getInitial = currentUser.email[0];
  console.log(currentUser);
  return (
    <div className="absolute flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-lg bg-white right-5 z-30">
      <p className="font-semibold text-2xl mb-4">{"name"}</p>
      {currentUser.profilePhoto ? (
        <img
          src={currentUser.profilePhoto}
          alt="User Photo"
          className="w-20 h-20 rounded-full mb-6"
        />
      ) : (
        <p className="w-20 h-20 rounded-full mb-6">{getInitial}</p>
      )}
      <p className="text-gray-600 text-lg mb-6">
        {currentUser.email && currentUser.email}
      </p>
      <button
        onClick={onSignOut}
        className="bg-red-500 text-white px-6 py-3 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfileDetails;
