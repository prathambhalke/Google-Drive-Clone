import { useNavigate } from "react-router-dom";
import { globalContextProvider } from "../Context/GlobalContext";
import { useContext } from "react";

const ProtectedRoute = ({ children } : any) => {
    const { filesDataArray, setFilesDataArray } = useContext(
        globalContextProvider
      );
    //   console.log(filesDataArray.isAuthenticated, "☹️☹️☹️☹️☹️☹️☹️☹️")
    const navigate = useNavigate();

    if (!filesDataArray.isAuthenticated) {
        navigate("/signin");
    }
    return children;
};

export default ProtectedRoute;
