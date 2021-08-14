import React from 'react';
import {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {useLoginMutation, useRegisterMutation} from '../generated';
import {setAccessToken} from '../utils/token';

interface error {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const Login = ({navigation, route}) => {
  const {mutateAsync, isLoading, isError, isSuccess, data} = useLoginMutation({
    onSuccess: value => {
      setAccessToken(value.login.token);
      console.log(value.login.token);
      navigation.navigate('Dash', {username: value.login.username});
    },
    onError: err => {
      console.log(err);
    },
  });

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        {route.params && route.params.fromRegister && route.params.username && (
          <Text style={{color: 'purple', fontSize: 15, fontWeight: 'bold'}}>
            {route.params.username} Successfully registered You can log in now
          </Text>
        )}
        <Text style={styles.regText}>Login</Text>

        <View style={styles.formContainer}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={values => {
              const errors: error = {};

              if (!values.email) {
                errors.email = 'Email is required';
              } else if (!values.email.includes('@')) {
                errors.email = 'Email must be a valid email';
              }
              if (!values.password) {
                errors.password = 'Password is required';
              } else if (values.password.length < 3) {
                errors.password = 'Password must be atleast 3 character long';
              }

              return errors;
            }}
            onSubmit={async (values, {setErrors}) => {
              try {
                await mutateAsync(values);
              } catch (error) {
                setErrors({
                  email: error.message.includes('email') && error.message,
                  password: error.message.includes('password') && error.message,
                });
              }
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  style={styles.inputBox}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.inputBox}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <Button
                  onPress={handleSubmit}
                  title={isLoading ? 'Loggin you in..' : 'Submit'}
                  disabled={isLoading}
                />

                <Text
                  style={styles.textBtn}
                  onPress={() => navigation.navigate('Register')}>
                  Don't have an account? Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textBtn: {
    marginTop: 20,
    color: 'blue',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -5,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'pink',
  },
  regText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-start',
    marginTop: 40,
    marginLeft: 20,
    color: 'blue',
  },

  formContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  inputBox: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 10,
    marginBottom: 10,
    minWidth: 250,
    textAlign: 'center',
  },
});
