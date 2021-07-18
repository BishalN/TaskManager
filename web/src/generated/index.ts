import { useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify({ query, variables }),
    });
    
    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: LoginOutput;
  createTask: Task;
  deleteTask: Scalars['Boolean'];
  updateTask: Task;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  status?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTaskArgs = {
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getAllMyTasks: Array<Task>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['String'];
  title: Scalars['String'];
  status: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'loginOutput';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  token: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  ) }
);


export const RegisterDocument = `
    mutation register($email: String!, $username: String!, $password: String!) {
  register(input: {email: $email, password: $password, username: $username}) {
    id
    username
    email
  }
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>) => 
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables)(),
      options
    );