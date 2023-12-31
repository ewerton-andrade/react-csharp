import axios, {AxiosInstance} from "axios";

import CONFIG from "../../config";

export const clientInstance = (authenticated: boolean = true): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${CONFIG.API_URL}`,
    headers: {
      "Content-Type": "application/json",
      ...(authenticated && { ...getHeaderAuth() }),
    },
  });
  return instance;
};

export const getHeaderAuth = (): object => {
  return { Authorization: `${getToken()}` };
};

export const getToken = (): string | null => {
  return localStorage.getItem("@token");
};

export const setToken = (data: string): void => {
  localStorage.setItem("@token", data);
};

export const closeSession = (type: string = "all"): void => {
  (type === "all" || "session") && sessionStorage.clear();
  (type === "all" || "local") && localStorage.clear();
};

export const saveCredentials = (
  email: string,
  token: string,
  profile: string,
  owner: string,
  expiration_date: string,
  refresh_token: string
): void => {
  localStorage.setItem("@email", email);
  localStorage.setItem("@profile", profile);
  localStorage.setItem("@owner", owner);
  localStorage.setItem("@expiration_date", expiration_date);
  localStorage.setItem("@refresh_token", refresh_token);
  setToken(token);
};
