import { useEffect, useState } from "react";
import type { User } from "../models/User";
import { accountApi } from "../api/accountApi";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    accountApi.getUserInfo().then((data) => {
      if (data) setUser(data);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
