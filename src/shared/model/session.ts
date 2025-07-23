import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { createGStore } from "create-gstore";
import { publicFetchClient } from "../api/instance";

const TOKEN_KEY = "token";

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

let refreshTokenPromise: Promise<string | null> | null = null;

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

  const refreshToken = async () => {
    if (!token) {
      return null;
    }

    const session = jwtDecode<Session>(token);
    if (session.exp < Date.now() / 1000 + 1) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = publicFetchClient
          .POST("/auth/refresh", {
            body: { refreshToken: token },
          })
          .then((r) => r.data?.accessToken ?? null)
          .then((newToken) => {
            if (newToken) {
              login(newToken);
              return newToken;
            } else {
              logout();
              return null;
            }
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      const newToken = await refreshTokenPromise;

      if (newToken) {
        return newToken;
      } else {
        return null;
      }
    }
  };

  return { login, logout, session, refreshToken };
});
