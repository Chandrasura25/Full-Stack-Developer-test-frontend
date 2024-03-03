import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'; 
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'; 
import { globalStyles } from '../styles/global'

const RegisterScreen = ({ navigation }) => {
  const UserSchema = yup.object({
    email: yup.string().email().required(),
    name: yup.string().required().min(6),
    password: yup.string().required().min(8),
  });

  const handleRegister = async (values) => { 
    try {
      const response = await axios.post('http://localhost:3000/user/signup', values); 
      if (response.status === 201) {
        Alert.alert('Registration Status', 'Your registration is successful', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
          navigation.navigate('Login');
       }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={globalStyles.body}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>Register New Account</Text>
        <Formik
          initialValues={{name:'',email:'', password:''}}
          validationSchema={UserSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            handleRegister(values); 
          }}
        >
          {(props) => (
            <>
              <TextInput
                style={globalStyles.input}
                placeholder="Fullname"
                onChangeText={props.handleChange('name')}
                value={props.values.name}
              />
              <Text style={globalStyles.errorText}>{props.errors.name}</Text>

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

              <Button title="Register" onPress={props.handleSubmit} />
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={globalStyles.signupLink}>Already have an account? Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
