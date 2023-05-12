import List from "../components/List";
import BottomSheet from "@gorhom/bottom-sheet";
import React, {useCallback, useMemo, useRef} from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";

const GroceriesTab = () => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['11%', '75%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <View style={styles.pageWrapper}>
            <View style={styles.backgroundContainer}>
                <View style={styles.TopContainer}>
                    <Text style={styles.title}>lorem</Text>
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
                <List />
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
