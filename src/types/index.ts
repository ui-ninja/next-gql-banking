/* eslint-disable no-shadow */
export enum ACCOUNT_TYPE {
  SAVINGS = "SAVINGS",
  "CREDIT_CARD" = "CREDIT_CARD",
}

export enum ACCOUNT_CATEGORIES {
  REGULAR = "REGULAR",
  PREMIUM = "PREMIUM",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
}

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

export type NewAccountForm = {
  userId: string;
  type: ACCOUNT_TYPE;
  category: ACCOUNT_CATEGORIES | "";
};
