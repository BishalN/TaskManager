import { useRouter } from "next/dist/client/router";
import React from "react";
import { useMeQuery } from "../generated";

export function useIsLoggedIn() {
  //get the token from localstorage
  //if not token redirect back to the login page
  //if token then send it to the server and make a me query and check the data
  //if the data is postitive then log the user in and return the data as the user Info in the dash

  // const router = useRouter();

  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(userInfo);

  const { data, error } = useMeQuery();

  console.log(data, error);
}
