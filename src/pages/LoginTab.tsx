import React, {useContext, useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import JWT from "expo-jwt";

interface TabBarProps {
  selectedIndex: number;
  onItemSelected: (index: number) => void;
}

const LoginTab: React.FC<TabBarProps> = ({onItemSelected}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const credentials = { username, password };
    console.log(credentials);
    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            //const decodedToken = jwt.decode(data.authToken) as JwtPayload;
            //console.log(decodedToken);
            try {
              //AsyncStorage.setItem('userId', String(decodedToken?.id));
              console.log('User ID stored successfully.');
            } catch (error) {
              console.log('Error storing user ID: ', error);
            }
            onItemSelected(1);
            Alert.alert('Login successful');
          } else {
            // Failed login logic
            Alert.alert('Invalid username or password');
          }
        })
        .catch(error => {
          // Error handling
          console.error('Login error:', error);
          Alert.alert('An error occurred during login');
        });
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
        onChangeText={text => setPassword(text)}
        value={password}
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
