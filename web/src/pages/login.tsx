import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input, Button, Box, Alert, AlertIcon } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import validator from "validator";
import { useLoginMutation, useRegisterMutation } from "../generated";

function LoginForm() {
  const router = useRouter();

  const { mutateAsync, isLoading, error, data } = useLoginMutation({
    onError: () => console.log(error),
    onSuccess: () => {
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        router.push("/dash");
      }
    },
  });

  function validateEmail(value: string) {
    let error: string;
    if (!value) {
      error = "Email is required";
    } else if (!validator.isEmail(value)) {
      error = "Please enter a valid email";
    }
    return error;
  }

  function validatePassword(value: string) {
    let error: string;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 3) {
      error = "Password must be atleast 6 character long";
    }
    return error;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt="14"
      flexDirection="column"
    >
      {router.query?.reg && (
        <Alert status="success" w="lg" mb={4}>
          <AlertIcon />
          Successfully registered! Now you can login
        </Alert>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await mutateAsync(values);
          } catch (error) {
            setErrors({
              email: error.message.includes("credentials") && error.message,
              password: error.message.includes("credentials") && error.message,
            });
          }
        }}
      >
        {(props) => (
          <Form autoComplete="off" autoCorrect="off">
            <Field name="email" validate={validateEmail}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="Email Address"
                    w="sm"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password" validate={validatePassword}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    id="password"
                    placeholder="Password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isLoading}
              type="submit"
            >
              Submit
            </Button>

            <Button mt={4} ml={4} onClick={() => router.push("/register")}>
              Don't have an account? Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default LoginForm;
