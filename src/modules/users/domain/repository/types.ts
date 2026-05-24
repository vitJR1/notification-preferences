export type CreateUser = {
  name: string;
};

export type UpdateUser = Partial<CreateUser> & {
  id: string;
};
