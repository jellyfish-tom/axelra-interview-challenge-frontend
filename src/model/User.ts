// Example of a simple type
export type User = {
  _id: string;
  email: string;
  createdAt: string;
};

export const UnloggedUser: User = {
  _id: "",
  email: "",
  createdAt: "",
};
