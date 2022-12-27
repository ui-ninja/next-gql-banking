import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  accountId: Scalars['Float'];
  category: Scalars['String'];
  user: User;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccount: Scalars['Float'];
  addUser: User;
  login: User;
};


export type MutationAddAccountArgs = {
  newAccountData: NewAccountInput;
};


export type MutationAddUserArgs = {
  newUserData: NewUserInput;
};


export type MutationLoginArgs = {
  loginData: LoginInput;
};

export type NewAccountInput = {
  category: Scalars['String'];
  userId: Scalars['String'];
};

export type NewUserInput = {
  email: Scalars['String'];
  govtId: Scalars['String'];
  income: Scalars['Float'];
  name: Scalars['String'];
  occupation?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone: Scalars['Float'];
  residence?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  user: User;
};


export type QueryAccountArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  govtId: Scalars['String'];
  id: Scalars['ID'];
  income?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  occupation?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phone: Scalars['Float'];
  residence?: Maybe<Scalars['String']>;
};

export type GetAccountByIdQueryVariables = Exact<{
  accountId: Scalars['Float'];
}>;


export type GetAccountByIdQuery = { __typename?: 'Query', account: { __typename?: 'Account', accountId: number, category: string, user: { __typename?: 'User', id: string, name: string, phone: number, email: string } } };

export type AddAccountMutationVariables = Exact<{
  newAccountData: NewAccountInput;
}>;


export type AddAccountMutation = { __typename?: 'Mutation', addAccount: number };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, email: string, phone: number, income?: number | null, password: string, residence?: string | null, occupation?: string | null, govtId: string } };

export type AddUserMutationVariables = Exact<{
  newUserData: NewUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', email: string, govtId: string, income?: number | null, name: string, occupation?: string | null, password: string, phone: number, residence?: string | null, id: string } };

export type LoginMutationVariables = Exact<{
  loginData: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', email: string, password: string } };


export const GetAccountByIdDocument = gql`
    query getAccountById($accountId: Float!) {
  account(id: $accountId) {
    accountId
    category
    user {
      id
      name
      phone
      email
    }
  }
}
    `;
export const AddAccountDocument = gql`
    mutation addAccount($newAccountData: NewAccountInput!) {
  addAccount(newAccountData: $newAccountData)
}
    `;
export const GetUserByIdDocument = gql`
    query getUserById($userId: String!) {
  user(id: $userId) {
    id
    name
    email
    phone
    income
    password
    residence
    occupation
    govtId
  }
}
    `;
export const AddUserDocument = gql`
    mutation addUser($newUserData: NewUserInput!) {
  addUser(newUserData: $newUserData) {
    email
    govtId
    income
    name
    occupation
    password
    phone
    residence
    id
  }
}
    `;
export const LoginDocument = gql`
    mutation login($loginData: LoginInput!) {
  login(loginData: $loginData) {
    email
    password
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAccountById(variables: GetAccountByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAccountByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccountByIdQuery>(GetAccountByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccountById', 'query');
    },
    addAccount(variables: AddAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddAccountMutation>(AddAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addAccount', 'mutation');
    },
    getUserById(variables: GetUserByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByIdQuery>(GetUserByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserById', 'query');
    },
    addUser(variables: AddUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddUserMutation>(AddUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addUser', 'mutation');
    },
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;