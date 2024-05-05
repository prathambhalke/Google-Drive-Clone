import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileDetails = ({ mail, photo, name }: any) => {
  const navigate = useNavigate();
  const onSignOut = () => {
    navigate("/signin")
    toast.success("SignOut SuccessFully!");
   };
  return (
    <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-lg absolute right-5 z-20">
      <p className="font-semibold text-2xl mb-4">{name}</p>
      <img
        src={photo}
        alt="User Photo"
        className="w-20 h-20 rounded-full mb-6"
      />
      <p className="text-gray-600 text-lg mb-6">{mail}</p>
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
