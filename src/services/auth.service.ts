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

export default { register };
