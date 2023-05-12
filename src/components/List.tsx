import React from 'react';
import {StyleSheet, View, Text, Button, Modal, ScrollView} from "react-native";
import ListItem from "./ListItem";

const List = () => {
    return (
        <View style={styles.bottomSheet}>
            <ScrollView>
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomSheet: {
        flex: 1,
        height: '90%',
        width: '100%',
        marginBottom: 72,
        position: 'absolute',
        bottom: 0,
        paddingTop: 4,
    }
});

export default List;