import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useHelloQuery, useRegisterMutation } from "../generated";

function home() {
  const router = useRouter();
  const { mutate, isLoading, error, isError, isSuccess } = useRegisterMutation({
    onSuccess: () => router.push("/dash"),
  });
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <form noValidate>
        <VStack>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
            <FormHelperText>We'll never share your email</FormHelperText>
          </FormControl>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input type="username" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" />
          </FormControl>
        </VStack>
      </form>
    </Box>
  );
}

export default home;
