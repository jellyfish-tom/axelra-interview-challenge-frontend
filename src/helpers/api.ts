import { getDomain } from './Domain';

const withDomainPrefix: (path: string) => string = (path: string) =>
  `${getDomain()}/${path}`;

const _auth = withDomainPrefix('auth');
const _todos = withDomainPrefix('todos');

export const api = {
  auth: {
    me: `${_auth}/me`,
    login: `${_auth}/login`,
    logout: `${_auth}/logout`,
    register: `${_auth}/register`,
    checkHealth: `${_auth}/check-health`,
  },
  todos: {
    list: `${_todos}`,
    add: `${_todos}/add`,
    update: `${_todos}/update`,
    remove: `${_todos}/remove`,
  },
};
