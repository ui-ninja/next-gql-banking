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
  accountNumber: Scalars['Float'];
  card: Card;
  category: Scalars['String'];
  id: Scalars['ID'];
  type: Scalars['String'];
  user: User;
};

export type Card = {
  __typename?: 'Card';
  cardNumber: Scalars['Float'];
  cardType: Scalars['String'];
  expiryMonth: Scalars['Float'];
  expiryYear: Scalars['Float'];
  id: Scalars['ID'];
};

export type Edge = {
  __typename?: 'Edge';
  cursor: Scalars['String'];
  node: Transaction;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccount: Scalars['String'];
  addUser: User;
};


export type MutationAddAccountArgs = {
  newAccountData: NewAccountInput;
};


export type MutationAddUserArgs = {
  newUserData: NewUserInput;
};

export type NewAccountInput = {
  category: Scalars['String'];
  type: Scalars['String'];
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  account: Array<Account>;
  transactions: Transactions;
  user: User;
};


export type QueryAccountArgs = {
  userId: Scalars['String'];
};


export type QueryTransactionsArgs = {
  accountId: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first: Scalars['Float'];
};


export type QueryUserArgs = {
  emailAddress: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accountId: Scalars['String'];
  amount: Scalars['Float'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  rowNo: Scalars['Float'];
  type: Scalars['String'];
};

export type Transactions = {
  __typename?: 'Transactions';
  edges: Array<Edge>;
  pageInfo: PageInfo;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  govtId: Scalars['String'];
  id: Scalars['ID'];
  income?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  occupation?: Maybe<Scalars['String']>;
  phone: Scalars['Float'];
  residence?: Maybe<Scalars['String']>;
};

export type GetAccountByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetAccountByUserIdQuery = { __typename?: 'Query', account: Array<{ __typename?: 'Account', id: string, accountNumber: number, type: string, category: string, user: { __typename?: 'User', id: string, govtId: string, email: string, income?: number | null, name: string, occupation?: string | null, phone: number, residence?: string | null }, card: { __typename?: 'Card', id: string, expiryYear: number, expiryMonth: number, cardType: string, cardNumber: number } }> };

export type AddAccountMutationVariables = Exact<{
  newAccountData: NewAccountInput;
}>;


export type AddAccountMutation = { __typename?: 'Mutation', addAccount: string };

export type TransactionsQueryVariables = Exact<{
  first: Scalars['Float'];
  accountId: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type TransactionsQuery = { __typename?: 'Query', transactions: { __typename?: 'Transactions', edges: Array<{ __typename?: 'Edge', cursor: string, node: { __typename?: 'Transaction', id: string, type: string, createdAt: string, amount: number, accountId: string, rowNo: number } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } };

export type GetUserQueryVariables = Exact<{
  emailAddress: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, email: string, phone: number, income?: number | null, residence?: string | null, occupation?: string | null, govtId: string } };

export type AddUserMutationVariables = Exact<{
  newUserData: NewUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', email: string, govtId: string, income?: number | null, name: string, occupation?: string | null, phone: number, residence?: string | null, id: string } };


export const GetAccountByUserIdDocument = gql`
    query getAccountByUserId($userId: String!) {
  account(userId: $userId) {
    id
    accountNumber
    type
    category
    user {
      id
      govtId
      email
      income
      name
      occupation
      phone
      residence
    }
    card {
      id
      expiryYear
      expiryMonth
      cardType
      cardNumber
    }
  }
}
    `;
export const AddAccountDocument = gql`
    mutation addAccount($newAccountData: NewAccountInput!) {
  addAccount(newAccountData: $newAccountData)
}
    `;
export const TransactionsDocument = gql`
    query transactions($first: Float!, $accountId: String!, $after: String, $before: String) {
  transactions(
    first: $first
    accountId: $accountId
    after: $after
    before: $before
  ) {
    edges {
      cursor
      node {
        id
        type
        createdAt
        amount
        accountId
        rowNo
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export const GetUserDocument = gql`
    query getUser($emailAddress: String!) {
  user(emailAddress: $emailAddress) {
    id
    name
    email
    phone
    income
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
    phone
    residence
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAccountByUserId(variables: GetAccountByUserIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAccountByUserIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccountByUserIdQuery>(GetAccountByUserIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccountByUserId', 'query');
    },
    addAccount(variables: AddAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddAccountMutation>(AddAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addAccount', 'mutation');
    },
    transactions(variables: TransactionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TransactionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TransactionsQuery>(TransactionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transactions', 'query');
    },
    getUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser', 'query');
    },
    addUser(variables: AddUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddUserMutation>(AddUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addUser', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;