import List from "../components/List";
import BottomSheet from "@gorhom/bottom-sheet";
import React, {useCallback, useMemo, useRef} from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const GroceriesTab = () => {

    const [userId, setUserId] = useState<number>();

    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId !== null) {
                console.log('User ID retrieved successfully: ', userId);
                setUserId(parseInt(userId));
            } else {
                console.log('No user ID found.');
            }
        } catch (error) {
            console.log('Error retrieving user ID: ', error);
        }
    }

    useEffect(() => {
        getUserId();
    }, []);

    const [groceries, setGroceries] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('userId')
            .then(userId => {
                if (userId !== null) {
                    fetch(`http://localhost:3000/api/grocery-lists/${userId}`)
                        .then(response => response.json())
                        .then(data => setGroceries(data.items))
                        .catch(error => console.log('Error fetching grocery items: ', error));
                } else {
                    console.log('No user ID found.');
                }
            })
            .catch(error => console.log('Error retrieving user ID: ', error));
    }, []);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['12%', '75%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <View style={styles.pageWrapper}>
            <View style={styles.backgroundContainer}>
                <View style={styles.TopContainer}>
                    {userId && <Text style={styles.title}>User ID: {userId}</Text>}
                </View>
                <Text style={styles.title}>GroceriesTab</Text>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                style={styles.bottomSheet}
            >
                <List groceries={groceries} />

                <View style={styles.addItemWrapper}>
                    <TextInput
                        style={styles.addItemTextInput}
                        placeholder="Add new item"
                        placeholderTextColor="white"
                    />
                    <TouchableOpacity style={styles.addItemButton} onPress={() => { /* Add addItem function here */ }}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    pageWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    backgroundContainer: {
        position: 'absolute',
        bottom: '11%',
        height: '78%',
        width: '100%',
        backgroundColor: '#fff',
    },
    TopContainer: {

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    addItemWrapper: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: '13%',
        right: 0,
        paddingHorizontal: 10,
    },
    addItemTextInput: {
        backgroundColor: 'rgba(255, 192, 203, 0.99)',
        height: 80,
        flex: 1,
        borderRadius: 40,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    addItemButton: {
        backgroundColor: 'rgba(255, 192, 203, 0.99)',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderRadius: 40,
        marginLeft: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
    },
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
});

export default GroceriesTab;
