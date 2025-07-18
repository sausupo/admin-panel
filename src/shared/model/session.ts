import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { createGStore } from "create-gstore";

const TOKEN_KEY = "token";

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

export const useSession = createGStore(() => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const login = (responseToken: string) => {
    localStorage.setItem(TOKEN_KEY, responseToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const session = token ? jwtDecode<Session>(token) : null;

  return { login, logout, session };
});
