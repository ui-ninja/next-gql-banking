export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  phone: string;
  residence?: string;
  occupation?: string;
  income: string;
  govtId: string;
};

export type AddNewUserMutation = {
  name: string;
  email: string;
  password: string;
  phone: number;
  residence?: string;
  occupation?: string;
  income: number;
  govtId: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
