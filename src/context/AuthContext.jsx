import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }){
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue(){
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuthValue deve ser usado dentro de um AuthProvider");
    }

    return context;
}