import { Box } from "@chakra-ui/react";
import React from "react";
import { useHelloQuery, useMeQuery } from "../generated";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import RegisterForm from "./register";

function home() {
  useIsLoggedIn();
  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mt="14">
        <RegisterForm />
      </Box>
    </Box>
  );
}

export default home;
