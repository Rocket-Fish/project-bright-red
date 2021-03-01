import http from "./http.service";
import convert from "./camel.service";

export interface RegisterPayload {
  username: string;
  password: string;
  displayName: string;
}

export const register = async (payload: RegisterPayload) => {
  const { data } = await http.post("register", payload);
  return convert(data);
};

export interface LoginPayload {
  username: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const { data } = await http.post("login", payload);
  return convert(data);
};

export default { register };
