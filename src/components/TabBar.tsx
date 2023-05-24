// TabBar.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TabBarItem {
    label: string;
    icon: JSX.Element;
    selectedIcon: JSX.Element;
    onPress: () => void;
}

const tabBarItems: TabBarItem[] = [
    {
        label: 'Groceries',
        icon: <Ionicons name="ios-basket-outline" size={24} color="#f5e4d4" />,
        selectedIcon: <Ionicons name="ios-basket" size={24} color="white" />,
        onPress: () => {},
    },
    {
        label: 'Home',
        icon: <Ionicons name="ios-home-outline" size={24} color="#f5e4d4" />,
        selectedIcon: <Ionicons name="ios-home" size={24} color="white" />,
        onPress: () => {},
    },
    {
        label: 'Profile',
        icon: <Ionicons name="ios-person-outline" size={24} color="#f5e4d4" />,
        selectedIcon: <Ionicons name="ios-person" size={24} color="white" />,
        onPress: () => {},
    },
];

interface TabBarProps {
    selectedIndex: number;
    onItemSelected: (index: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({ selectedIndex, onItemSelected }) => {
    // Update the onPress for each tabBarItems element
    tabBarItems.forEach((item, index) => {
        item.onPress = () => onItemSelected(index);
    });

    return (
        <View style={styles.container}>
            {tabBarItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.item, index === selectedIndex && styles.selectedItem]}
                    onPress={item.onPress}
                >
                    {index === selectedIndex ? item.selectedIcon : item.icon}
                    <Text style={[styles.label, index === selectedIndex ? styles.selectedLabel : null]}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f68b45',
        height: 75,
        width: '100%',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 25,
    },
    selectedItem: {
        //backgroundColor: '#f47d31',
    },
    label: {
        fontSize: 12,
        marginTop: 5,
        color: '#f5e4d4',
    },
    selectedLabel: {
        color: '#fff',
    }
});

export default TabBar;
