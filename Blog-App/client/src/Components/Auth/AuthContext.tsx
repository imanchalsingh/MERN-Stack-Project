import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string | null; // Add username to the context
  setAuthUsername: React.Dispatch<React.SetStateAction<string | null>>; // Function to update username
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Typing children prop
interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Retrieve login state and username from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [isRegistered, setIsRegistered] = useState<boolean>(() => {
    return localStorage.getItem("isRegistered") === "true";
  });
  const [username, setAuthUsername] = useState<string | null>(() => {
    return localStorage.getItem("username");
  });

  useEffect(() => {
    // Sync state with localStorage whenever it changes
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("isReistered", JSON.stringify(isRegistered));
    if (username) {
      localStorage.setItem("username", username); // Store username in localStorage
    }
  }, [isLoggedIn, username, isRegistered]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        username,
        setAuthUsername,
        isRegistered,
        setIsRegistered,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
