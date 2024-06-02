import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { globalContextProvider } from "../Context/GlobalContext";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const { filesDataArray, setFilesDataArray } : any = useContext(
    globalContextProvider
  );

  const onSignOut = () => {
    navigate("/signin");
    setFilesDataArray({
      ...filesDataArray,
      isAuthenticated: false});
      localStorage.setItem("isAuthenticated", filesDataArray.isAuthenticated = false)
    toast.success("SignOut SuccessFully!");
  };
  const { currentUser,activeUsers } = filesDataArray;
  const getInitial = currentUser.email[0];
  // console.log(currentUser);
  const currentU = activeUsers.filter((item:string | any) => item.email === currentUser.email)
  const {email,name} = currentU[0]
  return (
    <div className="absolute flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-lg bg-white right-5 z-30">
      <p className="font-semibold text-2xl mb-4">{name}</p>
      {currentUser.profilePhoto ? (
        <img
          src={currentUser.profilePhoto}
          alt="User Photo"
          className="w-20 h-20 rounded-full mb-6"
        />
      ) : (
        <p className="w-20 h-20 rounded-full mb-6 flex items-center justify-center text-3xl font-bold text-white bg-red-500">{getInitial}</p>
      )}
      <p className="text-gray-600 text-lg mb-6">
        {email && email}
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
