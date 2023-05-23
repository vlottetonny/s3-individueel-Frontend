import React, {useContext, useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';

interface TabBarProps {
  selectedIndex: number;
  onItemSelected: (index: number) => void;
}

const LoginTab: React.FC<TabBarProps> = ({selectedIndex, onItemSelected}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const credentials = {username, password};
    fetch('https://s3individueelapi.azurewebsites.net/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(response => response.json());

    if (username === 'admin' && password === 'admin') {
      // Successful login logic
      onItemSelected(1);
      Alert.alert('Login successful');
    } else {
      // Failed login logic
      Alert.alert('Invalid username or password');
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
