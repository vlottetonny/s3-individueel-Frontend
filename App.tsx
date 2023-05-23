import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import TopBar from './src/components/TopBar';
import TabBar from './src/components/TabBar';
import GroceriesTab from "./src/pages/GroceriesTab";
import HomeTab from "./src/pages/HomeTab";
import ProfileTab from "./src/pages/ProfileTab";
import SettingsTab from "./src/pages/SettingsTab";
import LoginTab from "./src/pages/LoginTab";
import SignUpTab from "./src/pages/SignUpTab";

const App: React.FC = () => {
    //disable warnings doesn't work :( v
    //                 console.disableYellowBox = true;
    const [selectedIndex, setSelectedIndex] = useState(4);

    const handleSettingsPress = () => {
        setSelectedIndex(3);
    }
    const handleTabPress = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <View style={styles.container}>
            <TopBar onSettingsPress={handleSettingsPress}/>
            {selectedIndex === 0 && (
                <GroceriesTab/>
            )}
            {selectedIndex === 1 && (
                <HomeTab/>
            )}
            {selectedIndex === 2 && (
                <ProfileTab/>
            )}
            {selectedIndex === 3 && (
                <SettingsTab/>
            )}
            {selectedIndex === 4 && (
                <LoginTab onItemSelected={handleTabPress} selectedIndex={selectedIndex}/>
            )}
            {selectedIndex === 5 && (
            <SignUpTab/>
            )}
            {selectedIndex !== 4 && selectedIndex !== 5  && (<TabBar selectedIndex={selectedIndex} onItemSelected={handleTabPress} />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
});

export default App;

