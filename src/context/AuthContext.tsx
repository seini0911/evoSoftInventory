import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/DataType";
import { HandleLocalStorage } from "../utils/HandleLocalStorage";
type UserOrNull = User | null;
interface AuthContextType{
    user: UserOrNull;
    authenticateUser: (value: UserOrNull )=>void;
    logoutUser: ()=>void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}:{ children: React.ReactNode})=>{
    const {getItemFromLocalStorage, setItemInLocalStorage} = HandleLocalStorage('user');
    const [user, setUser] = useState<User| null>(getItemFromLocalStorage != undefined ? getItemFromLocalStorage: null);

    const authenticateUser = (User: UserOrNull) => {
        setUser(User)
        setItemInLocalStorage(User);
    };

    const logoutUser = ()=>{
        setUser(null);
        setItemInLocalStorage(null);
    }
    useEffect(()=> {
    },[user]);
    return (
        <AuthContext.Provider
        value={{user, authenticateUser, logoutUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}