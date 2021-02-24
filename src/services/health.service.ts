import http from './http.service';

export const healthCheck = async () => {
  const { data } = await http.get('health');
  return data;
};

export default { healthCheck };
