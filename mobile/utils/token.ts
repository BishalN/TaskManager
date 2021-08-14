let accesstoken = '';

export const setAccessToken = (s: string) => {
  accesstoken = s;
};

export const getAccessToken = () => {
  return accesstoken;
};
