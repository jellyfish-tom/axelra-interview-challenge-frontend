import { User } from '../model/User';

export const getCurrentUser: () => User = () => {
  const localStorageUser = localStorage.getItem('user');

  return localStorageUser && JSON.parse(localStorageUser);
};
