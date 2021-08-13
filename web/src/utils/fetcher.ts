import { isServer } from "react-query/types/core/utils";

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
