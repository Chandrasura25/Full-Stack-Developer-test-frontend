import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          // Handle case where token is not found
          navigation.navigate('Login'); 
          return;
        }

        // Make GET request to profile endpoint
        const response = await fetch('http://localhost:3000/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response)
        if (response.ok) {
          // Parse response JSON
          const userData = await response.json();
          setUser(userData);
        } else {
          // Handle error response
          console.error('Error fetching user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={globalStyles.body}>
      <View style={globalStyles.container}>
        {user ? (
          <View>
            <Text style={globalStyles.text}>Profile Information</Text>
            <View>
              <Text style={styles.text}>Name:</Text>
              <Text style={styles.dynamicText}>{user.name}</Text>
            </View>
            <View>
              <Text style={styles.text}>Email:</Text>
              <Text style={styles.dynamicText}>{user.email}</Text>
            </View>
          </View>
        ) : (
          <Text style={globalStyles.text}>Loading...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3, 
    textTransform: 'uppercase',
  },
  dynamicText: {
    fontSize: 15,
    marginBottom: 3,
    paddingLeft: 3,
  },
});

export default ProfileScreen;
