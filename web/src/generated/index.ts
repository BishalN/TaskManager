import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { isServer } from "../utils/isServer";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  let token = "";
  if (!isServer) {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      token = parsedInfo.token;
    }
  }

  let userInfo;
  if (!isServer) userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log(userInfo);

  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "apllication/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
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
  __typename?: "Mutation";
  register: User;
  login: LoginOutput;
  createTask: Task;
  deleteTask: Scalars["Boolean"];
  updateTask: Task;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationCreateTaskArgs = {
  status?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type MutationDeleteTaskArgs = {
  id: Scalars["String"];
};

export type MutationUpdateTaskArgs = {
  status?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  hello: Scalars["String"];
  getAllMyTasks: Array<Task>;
};

export type Task = {
  __typename?: "Task";
  id: Scalars["String"];
  title: Scalars["String"];
  status: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
};

export type LoginOutput = {
  __typename?: "loginOutput";
  id: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
  token: Scalars["String"];
};

export type RegisterInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "loginOutput";
    id: string;
    username: string;
    email: string;
    token: string;
  };
};

export type RegisterMutationVariables = Exact<{
  email: Scalars["String"];
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "User";
    id: string;
    username: string;
    email: string;
  };
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: "Query"; hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: Maybe<{
    __typename?: "User";
    id: string;
    username: string;
    email: string;
  }>;
};

export const LoginDocument = `
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    username
    email
    token
  }
}
    `;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LoginMutation,
    TError,
    LoginMutationVariables,
    TContext
  >
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        variables
      )(),
    options
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
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    RegisterMutation,
    TError,
    RegisterMutationVariables,
    TContext
  >
) =>
  useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
    (variables?: RegisterMutationVariables) =>
      fetcher<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        variables
      )(),
    options
  );
export const HelloDocument = `
    query hello {
  hello
}
    `;
export const useHelloQuery = <TData = HelloQuery, TError = unknown>(
  variables?: HelloQueryVariables,
  options?: UseQueryOptions<HelloQuery, TError, TData>
) =>
  useQuery<HelloQuery, TError, TData>(
    ["hello", variables],
    fetcher<HelloQuery, HelloQueryVariables>(HelloDocument, variables),
    options
  );
export const MeDocument = `
    query me {
  me {
    id
    username
    email
  }
}
    `;
export const useMeQuery = <TData = MeQuery, TError = unknown>(
  variables?: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>
) =>
  useQuery<MeQuery, TError, TData>(
    ["me", variables],
    fetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
    options
  );
