import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TopBarProps {
    onSettingsPress: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSettingsPress }) => {
    return (
        <View style={styles.topBar}>
            <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="ios-share-outline" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>HouseKeeper</Text>
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={onSettingsPress}
            >
                <Ionicons name="settings-outline" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: 'pink',
        height: 100,
        width: '100%',
        position: 'absolute',
        top: 0,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    shareButton: {
        marginLeft: 20,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    settingsButton: {
        marginRight: 20,
    }
});

export default TopBar;
