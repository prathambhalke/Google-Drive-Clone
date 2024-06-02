import { createContext, useState } from "react";
import { GlobalState } from "../Utils/types";

export const globalContextProvider = createContext({});

const GlobalStateManagement: GlobalState = {
  isAuthenticated: false,
  filesData: [],
  activeUsers : [],
  currentUser: {
    profilePhoto: "",
    userName: "",
    email: "",
  },
  currentActiveTab : ""
};
const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  const [filesDataArray, setFilesDataArray] = useState(GlobalStateManagement);

  return (
    <globalContextProvider.Provider
      value={{ filesDataArray, setFilesDataArray }}
    >
      <div>{children}</div>
    </globalContextProvider.Provider>
  );
};

export default GlobalContext;
