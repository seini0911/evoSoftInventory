import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/DataType";
type UserOrNull = User | null;
interface AuthContextType{
    user: UserOrNull;
    authenticateUser: (value: UserOrNull )=>void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}:{ children: React.ReactNode})=>{

    const [user, setUser] = useState<User| null>(null);

    const authenticateUser = (User: UserOrNull) => setUser(User);
    useEffect(()=> {
        console.log("user state changed: ", user)

    },[user]);
    return (
        <AuthContext.Provider
        value={{user, authenticateUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}