import React from 'react';
import {StyleSheet, View, Text, Button, Modal, ScrollView, TouchableOpacity, Pressable} from "react-native";

const SettingsTab = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SettingsTab</Text>
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

export default SettingsTab;
