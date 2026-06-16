const TOKEN_KEY = 'rentgo_admin_token';
const USER_KEY = 'rentgo_admin_user';

export const getAdminToken = () => window.localStorage.getItem(TOKEN_KEY);

export const setAdminSession = ({ token, user }) => {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAdminUser = () => {
  const value = window.localStorage.getItem(USER_KEY);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const clearAdminSession = () => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
};
