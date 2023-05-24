import React, {useContext, useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';
import {useFonts} from "expo-font";

interface TabBarProps {
  selectedIndex: number;
  onItemSelected: (index: number) => void;
}



const LoginTab: React.FC<TabBarProps> = ({onItemSelected}) => {


  const [username, setUsername] = useState('');
  const [unhashedPassword, setUnhashedPassword] = useState('');

  const handleLogin = async () => {
    if (username === '' || unhashedPassword === '') {
      Alert.alert('Please fill in all fields');
    } else {
      try {
        const password = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, unhashedPassword);
        const credentials = {username, password};

        const response = await fetch('https://s3individueelapi.azurewebsites.net/api/user/login', {
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
            await AsyncStorage.setItem('currentGroceryListId', String(data.currentGroceryListId));
            console.log('User data stored successfully.');
          } catch (error) {
            console.log('Error storing data:', error);
          }
          onItemSelected(1);
        } else {
          // Failed login logic
          Alert.alert('Invalid username or password');
        }
      } catch (error) {
        // Error handling
        console.error('Login error:', error);
        Alert.alert('An error occurred during login');
      }
    }
    ;
  }
  const [loaded] = useFonts({
    'Knicknack-Regular': require('../assets/fonts/Knicknack-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
      <View style={styles.pageWrapper}>
        <Image source={require('../assets/images/logoOrange.png')} style={styles.logo} />
        <Text style={styles.logoText}>HouseKeeper</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            secureTextEntry={false}
            value={username}
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setUnhashedPassword(text)}
            value={unhashedPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerBox}>
        <Text style={styles.registerText} >Don't have an account yet?</Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => onItemSelected(5)}>
            <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    height: '75%',
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
    logo: {
        height: 80,
        width: 80,
        marginBottom: 5,
    },
    logoText: {
        fontSize: 16,
      fontFamily: 'Knicknack-Regular',
      marginBottom: 60,
      color:'#f68b45'
    },
  input: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
    loginButton: {
      height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      width: 150,
      backgroundColor:'#f68b45'
    },
  registerButton: {
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    backgroundColor:'#f68b45'
  },
    loginButtonText: {
        fontSize: 20,
      color: 'white',
    },
  registerButtonText: {
    fontSize: 15,
    color: 'white',
  },
    registerText: {
        fontSize: 15,
        color: 'black',
      marginBottom: 20,
    },
    registerBox: {
      position: 'absolute',
      bottom: '5%',
      alignItems: 'center',
    },
});

export default LoginTab;
