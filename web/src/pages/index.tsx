import { Box } from "@chakra-ui/react";
import React from "react";
import RegisterForm from "./register";

function home() {
  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mt="14">
        <RegisterForm />
      </Box>
    </Box>
  );
}

export default home;
