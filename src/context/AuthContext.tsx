import React, { createContext, useState } from "react";
import { Employee } from "../types/DataType";


interface AuthContextType{
    user: Employee | unknown;
    authenticateUser: (value: unknown )=>void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}:{ children: React.ReactNode})=>{

    const [user, setUser] = useState<Employee| unknown>(null);
    const authenticateUser = (User: unknown) => setUser(User);
    return (
        <AuthContext.Provider
        value={{user, authenticateUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}