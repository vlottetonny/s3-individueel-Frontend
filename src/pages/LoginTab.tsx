import React, {useContext, useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';
import {digestStringAsync} from "expo-crypto";

interface TabBarProps {
  selectedIndex: number;
  onItemSelected: (index: number) => void;
}



const LoginTab: React.FC<TabBarProps> = ({onItemSelected}) => {
  const [username, setUsername] = useState('');
  const [unhashedPassword, setUnhashedPassword] = useState('');

  const handleLogin = async () => {
    try {
      const password = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, unhashedPassword);
      const credentials = { username, password };

      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();


      if (data.success) {
        try {
          await AsyncStorage.setItem('userId', String(data.userId));
          await AsyncStorage.setItem('authToken', String(data.authToken));
          console.log('User ID stored successfully.');
        } catch (error) {
          console.log('Error storing user ID:', error);
        }
        onItemSelected(1);
        Alert.alert('Login successful');
      } else {
        // Failed login logic
        Alert.alert('Invalid username or password');
      }
    } catch (error) {
      // Error handling
      console.error('Login error:', error);
      Alert.alert('An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setUnhashedPassword(text)}
        value={unhashedPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginTab;
