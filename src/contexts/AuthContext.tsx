import React, { useContext, useState, createContext, useEffect } from "react";

type AuthContextType = {
  accessToken: string | null;
  loading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
};

type User = {
  id: string;
  username: string;
  email: string;
  characterId?: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          },
        );
        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, loading, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
}
