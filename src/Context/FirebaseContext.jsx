import { createContext, useState } from "react";

export const FirebaseContext = createContext(null)
export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userDetails,setUserDetails] = useState(null)
  

  return (
    <AuthContext.Provider
      value={{ user, setUser, userDetails, setUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
}
