import React from 'react';
import {StyleSheet, View, Text, Button, Modal, ScrollView, TouchableOpacity, Pressable} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const setUserId = async (userId: number) => {
    try {
        await AsyncStorage.setItem('userId', String(userId));
        console.log('User ID stored successfully.');
    } catch (error) {
        console.log('Error storing user ID: ', error);
    }
}

const HomeTab = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>HomeTab</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
});

export default HomeTab;
