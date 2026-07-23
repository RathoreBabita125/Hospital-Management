import { createContext } from "react";
import { useQuery } from "@apollo/client/react";
import { GETME } from "../query/login/userQuery";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const { data, loading, error, refetch} = useQuery(GETME);

  console.log("Get Me Data : ", data);
  

  return (
    <AuthContext.Provider value={{ loading, error, refetchAuth: refetch, userAuth: data?.getMe ?? null, }}>
      {children}
    </AuthContext.Provider>
  );
};