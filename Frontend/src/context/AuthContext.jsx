import { createContext } from "react";
import { useQuery } from "@apollo/client/react";
import { GETME } from "../query/login/userQuery";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { data, loading, error, refetch} = useQuery(GETME, {
    fetchPolicy: "network-only"
  });

  return (
    <AuthContext.Provider value={{ loading, error, refetch, userAuth: data?.getMe ?? null, }}>
      {children}
    </AuthContext.Provider>
  );
};