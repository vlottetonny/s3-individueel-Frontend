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
    id: number;
    main_text: string;
    sub_text: string | null;
    in_basket: boolean;
    added_by_id: number;
    grocery_list_id: number;
}

type ListItemProps = {
    grocery: GroceryItem;
};

const ListItem = ({ grocery }: ListItemProps) => {
    const [isChecked, setIsChecked] = useState(grocery.in_basket);

    return (
        <View style={styles.itemWrapper}>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <View style={styles.checkBox}>
                    {isChecked ? (
                        <Ionicons name="checkmark-circle" size={40} color="#f47d31" />
                    ) : (
                        <Ionicons name="ellipse-outline" size={40} color="#f38b45" />
                    )}
                </View>
            </TouchableOpacity>
            <View style={styles.itemInfo}>
                <Text style={styles.mainText} numberOfLines={grocery.sub_text ? 1 : 3}>
                    {grocery.main_text}
                </Text>
                {grocery.sub_text && (
                    <Text style={styles.subText} numberOfLines={2}>{grocery.sub_text}</Text>
                )}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: "row",
        padding: 10,
        borderColor: '#f5e4d4',
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
        fontSize: 19,
    },
    subText: {
        fontSize: 15,
    },
});

export default ListItem;
