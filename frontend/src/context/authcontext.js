import { createContext, useContext, useState, useEffect } from "react";

const authcontext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    const login = (jwt) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <authcontext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
            { children }
        </authcontext.Provider>
    );
};

export const useAuth = () => useContext(authcontext);