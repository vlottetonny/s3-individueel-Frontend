import List from '../components/List';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GroceryItem = {
  main_text: string;
  sub_text: string;
  added_by_id: number | undefined;
  grocery_list_id: string;
};

const GroceriesTab = () => {
  const [userId, setUserId] = useState<number>();
  const [visibleAddItemModal, setVisibleAddItemModal] = useState(false);
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [itemTitle, setItemTitle] = useState('');
  const [itemInfo, setItemInfo] = useState('');
  const [currentGroceryListId, setCurrentGroceryListId] = useState('');

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['12%', '75%'], []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listId = await AsyncStorage.getItem('currentGroceryListId');
        setCurrentGroceryListId(listId as string);
        // Make API request using the listId to fetch groceries data
        const response = await fetch(`http://localhost:3000/api/grocerylist/get/${listId}`);
        const data = await response.json();
        console.log(data);
        setGroceries(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddItem = async () => {
    setVisibleAddItemModal(false);
    if (itemTitle !== '') {
      const itemData: GroceryItem = {
        main_text: itemTitle,
        sub_text: itemInfo,
        added_by_id: await AsyncStorage.getItem('userId') as unknown as number,
        grocery_list_id: await AsyncStorage.getItem('currentGroceryListId') as string,
      };

      const response = await fetch('http://localhost:3000/api/groceryitem/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      const data = await response.json();

      if (data.success) {
        setGroceries([...groceries, itemData]);
      }
    }
    setItemTitle('');
    setItemInfo('');

    // Refetch the updated groceries list
    const fetchData = async () => {
      try {
        const listId = await AsyncStorage.getItem('currentGroceryListId');
        setCurrentGroceryListId(listId as string);
        const response = await fetch(`http://localhost:3000/api/grocerylist/get/${listId}`);
        const data = await response.json();
        setGroceries(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  };


  return (
      <View style={styles.pageWrapper}>
        <View style={styles.backgroundContainer}>
          <View style={styles.TopContainer}>
            {userId && <Text style={styles.title}>User ID: {userId}</Text>}
          </View>
          <Text style={styles.title}>GroceriesTab</Text>
        </View>
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            style={styles.bottomSheet}>
          <List groceries={groceries} />

          <View style={styles.addItemWrapper}>
            {visibleAddItemModal && (
                <View style={styles.textInputWrapper}>
                  <TextInput
                      style={styles.mainItemTextInput}
                      placeholder="Item title"
                      placeholderTextColor="gray"
                      value={itemTitle}
                      onChangeText={setItemTitle}
                  />
                  <TextInput
                      style={styles.subItemTextInput}
                      placeholder="Extra item information"
                      placeholderTextColor="gray"
                      value={itemInfo}
                      onChangeText={setItemInfo}
                  />
                </View>
            )}
            {!visibleAddItemModal ? (
                <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={() => {
                      setVisibleAddItemModal(!visibleAddItemModal);
                    }}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={
                      userId !== null ? handleAddItem : () => setVisibleAddItemModal
                    }>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            )}
          </View>
        </BottomSheet>
      </View>
  );
};

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
    backgroundColor: '#f5e4d4',
  },
  TopContainer: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  addItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: '14%',
    right: 0,
    paddingHorizontal: 10,
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  mainItemTextInput: {
    backgroundColor: 'white',
    height: 60,
    flex: 1,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#f68b45',
    padding: 30,
    elevation: 3,
    marginBottom: 10,
    marginRight: '18%',
    color: '#f68b45',
  },
  subItemTextInput: {
    backgroundColor: 'white',
    height: 60,
    flex: 1,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#f68b45',
    padding: 30,
    elevation: 3,
    marginRight: '18%',
    color: '#f68b45',
  },
  addItemButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#f68b45',
    marginLeft: 10,
    elevation: 3,
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  buttonText: {
    color: '#f68b45',
    fontSize: 30,
  },
  bottomSheet: {},
});

export default GroceriesTab;
