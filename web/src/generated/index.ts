import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { getAccessToken } from '../utils/token';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  const token = getAccessToken();
  return async (): Promise<TData> => {
    const res = await fetch(
      'https://task-manager-bishal.herokuapp.com/graphql',
      {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
  __typename?: 'Mutation';
  register: User;
  login: LoginOutput;
  logout: Scalars['Boolean'];
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
  hello: Scalars['String'];
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

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'loginOutput';
    id: string;
    username: string;
    email: string;
    token: string;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'User';
    id: string;
    username: string;
    email: string;
  };
};

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String'];
}>;

export type CreateTaskMutation = {
  __typename?: 'Mutation';
  createTask: {
    __typename?: 'Task';
    id: string;
    title: string;
    status: string;
  };
};

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
}>;

export type UpdateTaskMutation = {
  __typename?: 'Mutation';
  updateTask: {
    __typename?: 'Task';
    id: string;
    title: string;
    status: string;
  };
};

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteTaskMutation = {
  __typename?: 'Mutation';
  deleteTask: boolean;
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: 'Query'; hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: Maybe<{
    __typename?: 'User';
    id: string;
    username: string;
    email: string;
  }>;
};

export type GetMyTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyTasksQuery = {
  __typename?: 'Query';
  getAllMyTasks: Array<{
    __typename?: 'Task';
    id: string;
    title: string;
    status: string;
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
export const LogoutDocument = `
    mutation logout {
  logout
}
    `;
export const useLogoutMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LogoutMutation,
    TError,
    LogoutMutationVariables,
    TContext
  >
) =>
  useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
    (variables?: LogoutMutationVariables) =>
      fetcher<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
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
export const CreateTaskDocument = `
    mutation createTask($title: String!) {
  createTask(title: $title) {
    id
    title
    status
  }
}
    `;
export const useCreateTaskMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateTaskMutation,
    TError,
    CreateTaskMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateTaskMutation,
    TError,
    CreateTaskMutationVariables,
    TContext
  >(
    (variables?: CreateTaskMutationVariables) =>
      fetcher<CreateTaskMutation, CreateTaskMutationVariables>(
        CreateTaskDocument,
        variables
      )(),
    options
  );
export const UpdateTaskDocument = `
    mutation updateTask($id: String!, $title: String, $status: String) {
  updateTask(id: $id, title: $title, status: $status) {
    id
    title
    status
  }
}
    `;
export const useUpdateTaskMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateTaskMutation,
    TError,
    UpdateTaskMutationVariables,
    TContext
  >
) =>
  useMutation<
    UpdateTaskMutation,
    TError,
    UpdateTaskMutationVariables,
    TContext
  >(
    (variables?: UpdateTaskMutationVariables) =>
      fetcher<UpdateTaskMutation, UpdateTaskMutationVariables>(
        UpdateTaskDocument,
        variables
      )(),
    options
  );
export const DeleteTaskDocument = `
    mutation deleteTask($id: String!) {
  deleteTask(id: $id)
}
    `;
export const useDeleteTaskMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteTaskMutation,
    TError,
    DeleteTaskMutationVariables,
    TContext
  >
) =>
  useMutation<
    DeleteTaskMutation,
    TError,
    DeleteTaskMutationVariables,
    TContext
  >(
    (variables?: DeleteTaskMutationVariables) =>
      fetcher<DeleteTaskMutation, DeleteTaskMutationVariables>(
        DeleteTaskDocument,
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
    ['hello', variables],
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
    ['me', variables],
    fetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
    options
  );
export const GetMyTasksDocument = `
    query getMyTasks {
  getAllMyTasks {
    id
    title
    status
  }
}
    `;
export const useGetMyTasksQuery = <TData = GetMyTasksQuery, TError = unknown>(
  variables?: GetMyTasksQueryVariables,
  options?: UseQueryOptions<GetMyTasksQuery, TError, TData>
) =>
  useQuery<GetMyTasksQuery, TError, TData>(
    ['getMyTasks', variables],
    fetcher<GetMyTasksQuery, GetMyTasksQueryVariables>(
      GetMyTasksDocument,
      variables
    ),
    options
  );
