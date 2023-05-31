import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Modal,
    ScrollView,
    TouchableOpacity,
    Pressable, Alert, TextInput, Image,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';
import {useFonts} from "expo-font";
import {Ionicons} from "@expo/vector-icons";

interface TabBarProps {
  selectedIndex: number;
  onItemSelected: (index: number) => void;
}

const SignUpTab: React.FC<TabBarProps> = ({onItemSelected}) => {

  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [unhashedPassword, setUnhashedPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (username === '' || unhashedPassword === '' || first_name === '' || last_name === '' || confirmPassword === '') {
            Alert.alert('Please fill all fields');
        } else {
            if (unhashedPassword === confirmPassword) {
                try {
                    const password = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, unhashedPassword);
                    const credentials = {username, password, first_name, last_name};
                    console.log(credentials)
                    const response = await fetch('http://localhost:3000/api/user/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(credentials),

                    });

                    const data = await response.json();
                    console.log(data)
                    if (data) {
                        console.log('User created successfully.');
                        handleLogin();
                    } else {
                        Alert.alert('Login failed');
                    }
                } catch (error) {
                    // Error handling
                    console.error('Login error:', error);
                    Alert.alert('An error occurred during login');
                }
            } else {
                Alert.alert('Passwords do not match');
            }
        }
    }

    const handleLogin = async () => {
        if (username === '' || unhashedPassword === '') {
            Alert.alert('Please fill in all fields');
        } else {
            try {
                const password = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, unhashedPassword);
                const credentials = {username, password};

                const response = await fetch('http://localhost:3000/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                const data = await response.json();
                console.log(data)

                if (data.success) {
                    try {
                        await AsyncStorage.setItem('userId', String(data.userId));
                        await AsyncStorage.setItem('authToken', String(data.authToken));
                        await AsyncStorage.setItem('currentGroceryListId', String(data.currentGroceryListId));
                        await AsyncStorage.setItem('householdId', String(data.household_id));
                        console.log(data.householdId)
                        console.log (data.userId)
                        console.log('User data stored successfully.');
                    } catch (error) {
                        console.log('Error storing data:', error);
                    }
                    if (data.householdId === null) {
                        onItemSelected(6);
                    } else {
                    onItemSelected(1);
                    }
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
        <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
        />
        <TextInput
            style={styles.input}
            placeholder="First name"
            onChangeText={text => setFirstName(text)}
            secureTextEntry={false}
            value={first_name}
        />
        <TextInput
            style={styles.input}
            placeholder="Last name"
            onChangeText={text => setLastName(text)}
            secureTextEntry={false}
            value={last_name}
        />
        <View style={styles.buttonsWrapper}>
        <TouchableOpacity style={styles.backButton}>
            <Ionicons name={"arrow-back"} size={30} color={"#fff"} onPress={() => onItemSelected(4)}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
            <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.footer}>
        <Image source={require('../assets/images/assistent.png')} style={styles.assistent} />
        <View style={styles.textBubble}>
            <Text style={styles.bubbleText}>Hi!</Text>
            <Text style={styles.bubbleText}></Text>
            <Text style={styles.bubbleText}>Welcome to HouseKeeper.</Text>
            <Text style={styles.bubbleText}></Text>
            <Text style={styles.bubbleText}>To get started, please</Text>
            <Text style={styles.bubbleText}>enter your information.</Text>
        </View>
        </View>
    </View>
  );
};



const styles = StyleSheet.create({
    pageWrapper: {
        height: '79%',
        width: '90%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    input: {
        height: 60,
        width: '100%',
        borderRadius: 30,
        marginBottom: 20,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    registerButton: {
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        backgroundColor:'#f68b45'
    },
    buttonsWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    backButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#f68b45',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButtonText: {
        fontSize: 20,
        color: 'white',
    },
    footer: {
        height: '25%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
    assistent: {
        height: 170,
        width: 170,
        position: 'absolute',
        right: '60%',
        bottom: 0,
    },
    textBubble: {
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        height: 130,
        width: '64%',
        padding: 15,
        position: 'absolute',
        left: '35%',
    },
    bubbleText: {
        fontFamily: 'Knicknack-Regular',
        color: '#fa8500',
        fontSize: 16,
        marginBottom: 1,
    }
});

export default SignUpTab;
