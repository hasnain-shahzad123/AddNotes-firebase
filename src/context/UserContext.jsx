import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [uid, setUid] = useState(null);

    return (
        <UserContext.Provider value={{ uid, setUid }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };