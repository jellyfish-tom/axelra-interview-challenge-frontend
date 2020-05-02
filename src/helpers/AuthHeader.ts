export function authHeader() {
  const localStorageUser = localStorage.getItem('user');
  // return authorization header with jwt token
  let user = localStorageUser && JSON.parse(localStorageUser);

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}
