import { isAxiosError } from "axios";
import {
  clientInstance,
  saveCredentials,
  setToken,
  closeSession,
} from "./client";

type ResponseAccess = {
  success: boolean;
  message: string;
};

const defaultErrorResponse: ResponseAccess = {
  success: false,
  message: "Unexpected error, please try later!",
};

const handleAxiosError = (
  error: unknown,
  response: ResponseAccess
): ResponseAccess => {
  if (isAxiosError(error) && error.response) {
    response.success = false;
    response.message = error.response.data?.message || "Unexpected error";
  }
  return response;
};

const createResponse = (success: boolean, message: string): ResponseAccess => ({
  success,
  message,
});

export const loginUser = async (
  username: string,
  password: string
): Promise<ResponseAccess> => {
  try {
    const { data } = await clientInstance(false).post("/identity/login", {
      username,
      password,
    });
    saveCredentials(
      data?.email,
      data?.token,
      data?.profile,
      data?.owner,
      data?.expiration_date,
      data?.refresh_token
    );
    return createResponse(true, "Logged");
  } catch (error: unknown) {
    return handleAxiosError(error, defaultErrorResponse);
  }
};

export const createAccount = async (
  username: string,
  password: string,
  profile: string = "admin",
  provider: string = "licit"
): Promise<ResponseAccess> => {
  try {
    await clientInstance(false).post("/users", {
      username,
      password,
      profile,
      provider,
    });
    return createResponse(true, "Created");
  } catch (error: unknown) {
    return handleAxiosError(error, defaultErrorResponse);
  }
};

export const recoveryPass = async (
  username: string
): Promise<ResponseAccess> => {
  try {
    await clientInstance(false).post("/recovery_pass", { username });
    return createResponse(true, "Sent");
  } catch (error: unknown) {
    return handleAxiosError(error, defaultErrorResponse);
  }
};

export const checkCredential = async (credential: string): Promise<boolean> => {
  try {
    setToken(credential);
    await clientInstance(true).get("/valid_credential");
    return true;
  } catch (error: unknown) {
    return false;
  } finally {
    closeSession("local");
  }
};

export const registration = async (
  username: string,
  token: string
): Promise<ResponseAccess> => {
  const response: ResponseAccess = { ...defaultErrorResponse };
  try {
    setToken(token);
    await clientInstance(true).post("/users/valid", { email: username });
    response.success = true;
    response.message = "Registered";
    closeSession("all");
  } catch (error: unknown) {
    handleAxiosError(error, response);
  }
  return response;
};

export const resetAccess = async (
  password: string,
  token: string
): Promise<ResponseAccess> => {
  const response: ResponseAccess = { ...defaultErrorResponse };
  try {
    setToken(token);
    await clientInstance(true).post("/reset_pass", { password });
    response.success = true;
    response.message = "Reset";
    closeSession("all");
  } catch (error: unknown) {
    handleAxiosError(error, response);
  }
  return response;
};
