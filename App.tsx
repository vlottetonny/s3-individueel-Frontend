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
import JoinOrCreateTab from "./src/pages/JoinOrCreateTab";

const App: React.FC = () => {

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
                <SignUpTab onItemSelected={handleTabPress} selectedIndex={selectedIndex}/>
            )}
            {selectedIndex === 6 && (
                <JoinOrCreateTab onItemSelected={handleTabPress} selectedIndex={selectedIndex}/>
            )}
            {selectedIndex !== 3 && selectedIndex !== 4 && selectedIndex !== 5  && selectedIndex !== 6 && (<TabBar selectedIndex={selectedIndex} onItemSelected={handleTabPress} />)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5e4d4',
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

