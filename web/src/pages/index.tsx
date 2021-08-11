import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useHelloQuery, useRegisterMutation } from "../generated";
import RegisterForm from "./register";

function home() {
  const router = useRouter();
  const { mutate, isLoading, error, isError, isSuccess } = useRegisterMutation({
    onSuccess: () => router.push("/dash"),
  });

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mt="14">
        <RegisterForm />
      </Box>
    </Box>
  );
}

export default home;
