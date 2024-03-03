import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'; // Added Alert
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'; 
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const UserSchema = yup.object({
    email: yup.string().email().required().min(5),
    password: yup.string().required().min(8),
  });

  const handleLogin = async (values) => { 
    try {
    
      const response = await axios.post('http://localhost:3000/user/login', values); 
      const token = response.data.token;
       if (token) {
        Alert.alert('Login Status', 'Your login is successful', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
          console.log("Response:", response.data);
          await AsyncStorage.setItem('token', token);

          navigation.navigate('Home'); 
       }
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={globalStyles.body}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>Login to your Account</Text>
        <Formik
          initialValues={{email:'', password:''}}
          validationSchema={UserSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            handleLogin(values); 
          }}
        >
          {(props) => (
            <>
              <TextInput
                style={globalStyles.input}
                placeholder="Email"
                onChangeText={props.handleChange('email')}
                value={props.values.email} 
              />
              <Text style={globalStyles.errorText}>{props.errors.email}</Text>

              <TextInput
                style={globalStyles.input}
                placeholder="Password"
                onChangeText={props.handleChange('password')}
                value={props.values.password} 
                secureTextEntry
              />
              <Text style={globalStyles.errorText}>{props.errors.password}</Text>

              <Button title="Login" onPress={props.handleSubmit} />
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={globalStyles.signupLink}>Don't have an account? Sign up here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default LoginScreen;
