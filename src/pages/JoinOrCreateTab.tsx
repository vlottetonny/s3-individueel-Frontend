import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import {useFonts} from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';

interface TabBarProps {
    selectedIndex: number;
    onItemSelected: (index: number) => void;
}

const JoinOrCreateTab: React.FC<TabBarProps> = ({onItemSelected}) => {

    const [joinOrCreate, setJoinOrCreate] = useState(0);
    const [createHouseholdName, setCreateHouseholdName] = useState('');
    const [createHouseholdPassword, setCreateHouseholdPassword] = useState('');
    const [createHouseholdPasswordConfirm, setCreateHouseholdPasswordConfirm] = useState('');
    const [joinHouseholdName, setJoinHouseholdName] = useState('');
    const [joinHouseholdPassword, setJoinHouseholdPassword] = useState('');
    const [signingUp, setSigningUp] = useState(false);


    const handleCreate = async () => {
        if (createHouseholdName === '' || createHouseholdPassword === '' || createHouseholdPasswordConfirm === '') {
            Alert.alert('Please fill all fields');
        } else {
            if (createHouseholdPassword === createHouseholdPasswordConfirm) {
                try {
                    const password = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, createHouseholdPassword);
                    const name = createHouseholdName;
                    const user_id = await AsyncStorage.getItem('userId');
                    const household_creator_id = parseInt(user_id ?? '', 10);
                    console.log(household_creator_id);
                    const credentials = { name, password, household_creator_id };
                    const response = await fetch('http://localhost:3000/api/household/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(credentials),
                    });

                    const data = await response.json();
                    console.log(data);
                    if (data) {
                        console.log('Household created successfully.');
                        console.log(data.householdId);
                        setJoinHouseholdName(createHouseholdName);
                        setJoinHouseholdPassword(createHouseholdPassword);
                        setSigningUp(true);
                    } else {
                        Alert.alert('Household creation failed');
                    }
                } catch (error) {
                    // Error handling
                    console.error('Household creation error:', error);
                    Alert.alert('An error occurred during household creation');
                }
            } else {
                Alert.alert('Passwords do not match');
            }
        }
    };

    const setupHousehold = async (household_id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/grocerylist/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({household_id}),
            });

            const data = await response.json();
            if (data) {
                try {
                    await AsyncStorage.setItem('currentGroceryListId', data.toString());
                    console.log(await AsyncStorage.getItem('currentGroceryListId'));
                    console.log('Grocery list created successfully.');
                } catch (error) {
                    // Error saving data
                    console.error('Grocery list creation error:', error);
                    Alert.alert('An error occurred during grocery list creation');
                }
            } else {
                Alert.alert('Grocery list creation failed');
            }
        } catch (error) {
            // Error handling
            console.error('Household creation error:', error);
            Alert.alert('An error occurred during household creation');
        }
    }

    const handleJoin = async () => {
        console.log("Joining household")
        console.log(signingUp)
        if (!signingUp) {
            if (joinHouseholdName === '' || joinHouseholdPassword === '') {
                Alert.alert('Please fill all fields dab');
                return;
            }
        }
        try {
            const password = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, joinHouseholdPassword);
            const name = joinHouseholdName;
            const id = await AsyncStorage.getItem('userId');
            const credentials = {id, name, password};
            console.log(credentials);
            const response = await fetch(`http://localhost:3000/api/user/addtohousehold/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            console.log(data);
            if (data.success) {
                console.log('Household joined successfully.');
                if (signingUp) {
                    await setupHousehold(data.householdId)
                }
                await AsyncStorage.setItem('household_id', data.householdId.toString());
                onItemSelected(1);
            } else {
                if (data === false) {
                    Alert.alert('Household join failed');
                } else {
                    Alert.alert(data);
                }
            }
        } catch (error) {
            // Error handling
            console.error('Household join error:', error);
            Alert.alert('An error occurred during household join');
        }

    };

    useEffect(() => {
        if (signingUp) {
            handleJoin();
        }
    }, [signingUp]);

    const [loaded] = useFonts({
        'Knicknack-Regular': require('../assets/fonts/Knicknack-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.pageWrapper}>
            {joinOrCreate === 0 && (<View style={styles.formWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => setJoinOrCreate(1)}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>or</Text>
                <TouchableOpacity style={styles.button} onPress={() => setJoinOrCreate(2)}>
                    <Text style={styles.buttonText}>Join</Text>
                </TouchableOpacity>
            </View>)}
            {joinOrCreate === 1 && (<View style={styles.formWrapper}>
                <TextInput style={styles.input} placeholder="Household name"
                           onChangeText={text => setCreateHouseholdName(text)}
                           value={createHouseholdName}
                autoCapitalize="none"/>
                <TextInput style={styles.input} placeholder="Household password"
                           onChangeText={text => setCreateHouseholdPassword(text)}
                           secureTextEntry={true}
                           value={createHouseholdPassword}/>
                <TextInput style={styles.input} placeholder="Confirm household password"
                           onChangeText={text => setCreateHouseholdPasswordConfirm(text)}
                           secureTextEntry={true}
                           value={createHouseholdPasswordConfirm}/>
                <TouchableOpacity style={styles.button} onPress={handleCreate}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity></View>)}
            {joinOrCreate === 2 && (
                <View style={styles.formWrapper}>
                    <TextInput style={styles.input} placeholder="Household name"
                               onChangeText={text => setJoinHouseholdName(text)}
                               value={joinHouseholdName}
                               autoCapitalize="none"/>
                    <TextInput style={styles.input} placeholder="Household password"
                               onChangeText={text => setJoinHouseholdPassword(text)}
                               secureTextEntry={true}
                               value={joinHouseholdPassword}/>
                    <TouchableOpacity style={styles.button} onPress={handleJoin}>
                        <Text style={styles.buttonText}>Join</Text>
                    </TouchableOpacity></View>)}
            <View style={styles.footer}>
                <Image source={require('../assets/images/assistent.png')} style={styles.assistent}/>
                {joinOrCreate === 0 && (<View style={styles.textBubble}>
                    <Text style={styles.bubbleText}>Now lets get you in a</Text>
                    <Text style={styles.bubbleText}>household!</Text>
                    <Text style={styles.bubbleText}></Text>
                    <Text style={styles.bubbleText}>Press Create to start a</Text>
                    <Text style={styles.bubbleText}>new household or Join an</Text>
                    <Text style={styles.bubbleText}>existing one.</Text>
                </View>)}
                {joinOrCreate === 1 && (<View style={styles.textBubble}>
                    <Text style={styles.bubbleText}>Give your household a</Text>
                    <Text style={styles.bubbleText}>Name.</Text>
                    <Text style={styles.bubbleText}></Text>
                    <Text style={styles.bubbleText}>Also add a Password you</Text>
                    <Text style={styles.bubbleText}>can use to join your</Text>
                    <Text style={styles.bubbleText}>household.</Text>
                </View>)}
                {joinOrCreate === 2 && (<View style={styles.textBubble}>
                    <Text style={styles.bubbleText}>Enter the Name and</Text>
                    <Text style={styles.bubbleText}>Password of the</Text>
                    <Text style={styles.bubbleText}>household you want to</Text>
                    <Text style={styles.bubbleText}>join.</Text>
                    <Text style={styles.bubbleText}>The household creator will</Text>
                    <Text style={styles.bubbleText}>have these.</Text>
                </View>)}
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
    formWrapper: {
        width: '100%',
        alignItems: 'center',
        paddingTop: '30%',
    },
    input: {
        height: 60,
        width: '100%',
        borderRadius: 30,
        marginBottom: 20,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        backgroundColor:'#f68b45'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    orText: {
        fontSize: 20,
        color: '#f68b45',
        fontFamily: 'Knicknack-Regular',
        paddingVertical: 20,
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

export default JoinOrCreateTab;
