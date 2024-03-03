import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import HomeScreen from '../components/HomeScreen';
import ResourcesScreen from '../components/ResourcesScreen';
import AboutScreen from '../components/AboutScreen';
import ProfileScreen from '../components/ProfileScreen';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
);

const Tab = createBottomTabNavigator();
const MainNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Resources" component={ResourcesScreen} />
    <Tab.Screen name="About" component={AboutScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error reading token from AsyncStorage:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
