import { getAccessToken } from "./token";

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
) {
  const token = getAccessToken();
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
