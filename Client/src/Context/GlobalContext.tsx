import { createContext, useState } from "react";

export const globalContextProvider = createContext({});

const GlobalStateManagement = {
  filesData: [],
  activeUsers : [],
  currentUser: {
    profilePhoto: "",
    userName: "",
    email: "",
  },
  currentActiveTab : ""
};
const GlobalContext = ({ children }: any) => {
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
