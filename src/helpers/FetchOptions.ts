export enum PROTOCOL_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const HTTP_OPTIONS = (method: PROTOCOL_METHOD, body?: string) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors' as 'cors' | 'same-origin' | 'navigate' | 'no-cors' | undefined,
    credentials: 'include' as 'include' | 'omit' | 'same-origin' | undefined,
    body,
  };
};