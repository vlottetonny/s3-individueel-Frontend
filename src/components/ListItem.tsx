import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Modal,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface GroceryItem {
    groceryText: string;
    grocerySubText: string;
}

const ListItem = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [grocery, setGrocery] = useState<GroceryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const url = "http://localhost:3000/api/groceries/1";

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setGrocery([data]))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.itemWrapper}>
            <Pressable
                style={styles.checkBox}
                onPress={() => setIsChecked(!isChecked)}
            >
                {isChecked ? (
                    <Ionicons name="checkmark-circle-outline" size={50} color="black" />
                ) : (
                    <Ionicons name="ellipse-outline" size={50} color="black" />
                )}
            </Pressable>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <View style={styles.itemInfo}>
                    <Text style={styles.mainText}>{grocery[0].groceryText}</Text>
                    <Text style={styles.subText}>{grocery[0].grocerySubText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: "row",
        padding: 10,
        borderColor: "gray",
        borderTopWidth: 1,
    },
    checkBox: {
        height: 70,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    itemInfo: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 7,
    },
    mainText: {
        fontSize: 20,
    },
    subText: {
        fontSize: 15,
    },
});

export default ListItem;
