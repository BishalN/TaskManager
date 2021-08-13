import React from "react";
import { isServer } from "../utils/isServer";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

export default function dash() {
  let userInfo;
  if (!isServer) userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log(userInfo);
  useIsLoggedIn();
  return <div>welcome to the app</div>;
}
