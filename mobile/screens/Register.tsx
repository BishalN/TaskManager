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
import {useRegisterMutation} from '../generated';

interface error {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const Register = ({navigation}) => {
  const {mutateAsync, isLoading, isError, isSuccess, data} =
    useRegisterMutation({
      onSuccess: value =>
        navigation.navigate('Login', {
          fromRegister: true,
          username: value.register.username,
        }),
      onError: err => {
        console.log(err);
      },
    });

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to TaskManager</Text>
        <Text style={styles.subtitle}>Made to simplify your life</Text>
        <Text style={styles.regText}>Register for an account</Text>

        <View style={styles.formContainer}>
          <Formik
            initialValues={{
              email: '',
              password: '',
              username: '',
              confirmPassword: '',
            }}
            validate={values => {
              const errors: error = {};
              if (values.confirmPassword !== values.password) {
                errors.password = 'Password does not match';
                errors.confirmPassword = 'Password does not match';
              }
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
              if (!values.confirmPassword) {
                errors.confirmPassword = 'Confirm password is required';
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords does not match';
                errors.password = 'passwords does not match';
              }
              if (!values.username) {
                errors.username = 'Username is required';
              } else if (values.username.length < 3) {
                errors.username = 'Username must be atleast 3 character long';
              }
              return errors;
            }}
            onSubmit={async (values, {setErrors}) => {
              try {
                const res = await mutateAsync(values);
                console.log(res);
                console.log('we are here');
              } catch (error) {
                setErrors({
                  email: error.message.includes('email') && error.message,
                  password: error.message.includes('password') && error.message,
                  username: error.message.includes('username') && error.message,
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
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  placeholder="Username"
                  style={styles.inputBox}
                />
                {errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
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
                <TextInput
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  keyboardType="email-address"
                  secureTextEntry={true}
                  style={styles.inputBox}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <Button
                  onPress={handleSubmit}
                  title={isLoading ? 'Registering you..' : 'Submit'}
                  disabled={isLoading}
                />

                <Text
                  style={styles.textBtn}
                  onPress={() => navigation.navigate('Login')}>
                  Already have an account? Login
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
