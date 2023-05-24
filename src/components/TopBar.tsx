import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts} from "expo-font";

interface TopBarProps {
    onSettingsPress: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSettingsPress }) => {
    const [loaded] = useFonts({
        'Knicknack-Regular': require('../assets/fonts/Knicknack-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.topBar}>
            <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="ios-share-outline" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.headerWrapper}>
            <Image style={styles.logo} source={require('../assets/images/logoWhite.png')} />
            <Text style={styles.header} >HouseKeeper</Text>
            </View>
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={onSettingsPress}
            >
                <Ionicons name="settings-outline" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: '#f68b45',
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
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        height: 30,
        width: 30,
    },
    header: {
        fontSize: 25,
        fontFamily: 'Knicknack-Regular',
        color: '#fff',
        marginTop: 15,
        marginLeft: 5,
    },
    settingsButton: {
        marginRight: 20,
    }
});

export default TopBar;
