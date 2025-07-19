import type { User } from "../models/User";
import { apiBaseUrl } from "./apiBaseUrl";
import { parseErrorResponse } from "./parseErrorResponse";

const login = async (email: string, password: string) => {
  const response = await fetch(`${apiBaseUrl}/login?useCookies=true`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }
};

const register = async (email: string, password: string) => {
  const response = await fetch(`${apiBaseUrl}/Account/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }
};

const logout = async () => {
  const response = await fetch(`${apiBaseUrl}/Account/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }
};

const getUserInfo = async (): Promise<User | null> => {
  const response = await fetch(`${apiBaseUrl}/Account/user-info`, {
    credentials: "include",
  });
  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }
  if (!response.body) {
    return null;
  }
  return response.json();
};

export const accountApi = { login, register, logout, getUserInfo };
