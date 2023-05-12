import React from 'react';
import {StyleSheet, View, Text, Button, Modal, ScrollView} from "react-native";
import ListItem from "./ListItem";

type ListProps = {
    groceries: any[]; //groceries: GroceryItem[]; gives a ts error so i rather use any, not sure if this is the right way to do it
};

const List = ({ groceries }: ListProps) => {
    return (
        <View style={styles.bottomSheet}>
            <ScrollView>
                {groceries.map(grocery => (
                    <ListItem key={grocery.id} grocery={grocery} />
                ))}
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
