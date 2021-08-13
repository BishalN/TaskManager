import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input, Button, Box } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import validator from "validator";
import { useRegisterMutation } from "../generated";

interface error {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function RegisterForm() {
  const router = useRouter();
  const { mutateAsync, isLoading, error, isError, isSuccess, data } =
    useRegisterMutation({
      onError: () => console.log(error),
      onSuccess: () => router.push("/login?reg=1"),
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

  function validateUsername(value: string) {
    let error: string;
    if (!value) {
      error = "Username is required";
    } else if (value.length < 3) {
      error = "Username must be atleast 3 character long";
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
    <Box display="flex" justifyContent="center" alignItems="center" mt="14">
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors: error = {};
          if (values.confirmPassword !== values.password) {
            errors.password = "Password does not match";
            errors.confirmPassword = "Password does not match";
          }
          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await mutateAsync(values);
          } catch (error) {
            setErrors({
              email: error.message.includes("email") && error.message,
              password: error.message.includes("password") && error.message,
              username: error.message.includes("username") && error.message,
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

            <Field name="username" validate={validateUsername}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input {...field} id="username" placeholder="Username" />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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

            <Field name="confirmPassword">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.confirmPassword && form.touched.confirmPassword
                  }
                >
                  <FormLabel htmlFor="confirmPassword">
                    Confirm password
                  </FormLabel>
                  <Input
                    type="password"
                    {...field}
                    id="confirmPassword"
                    placeholder="confirmPassword"
                  />
                  <FormErrorMessage>
                    {form.errors.confirmPassword}
                  </FormErrorMessage>
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

            <Button mt={4} ml={4} onClick={() => router.push("/login")}>
              Already have an account? Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default RegisterForm;
