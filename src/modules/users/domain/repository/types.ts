export type CreateUser = {
  name: string;
  email: string;
};

export type UpdateUser = Partial<CreateUser> & {
  id: string;
};
