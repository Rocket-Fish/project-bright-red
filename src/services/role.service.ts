import http from "./http.service";
import convert from "./camel.service";

export interface Role {
  name: string;
  subroles: Role[];
}

export const getRoles = async (): Promise<Role[]> => {
  const { data } = await http.get("roles");

  return convert(data);
};

export default { getRoles };
