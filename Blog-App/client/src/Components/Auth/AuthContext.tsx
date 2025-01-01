import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string | null; // Add username to the context
  setAuthUsername: React.Dispatch<React.SetStateAction<string | null>>; // Function to update username
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

  const [username, setAuthUsername] = useState<string | null>(() => {
    return localStorage.getItem("username");
  });

  useEffect(() => {
    // Sync state with localStorage whenever it changes
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    if (username) {
      localStorage.setItem("username", username); // Store username in localStorage
    }
  }, [isLoggedIn, username]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, username, setAuthUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};
