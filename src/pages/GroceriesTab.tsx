import List from '../components/List';
import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroceriesTab = () => {
  const [userId, setUserId] = useState<number>();
  const [visibleAddItemModal, setVisibleAddItemModal] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const [itemTitle, setItemTitle] = useState('');
  const [itemInfo, setItemInfo] = useState('');

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId !== null) {
        setUserId(parseInt(userId));
      } else {
        console.log('No user ID found.');
      }
    } catch (error) {
      console.log('Error retrieving user ID: ', error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('userId')
      .then(userId => {
        if (userId !== null) {
          fetch(
            `https://s3individueelapi.azurewebsites.net/api/grocerylist/get/${userId}`,
          )
            .then(response => response.json())
            .then(data => setGroceries(data.items))
            .catch(error =>
              console.log('Error fetching grocery items: ', error),
            );
        } else {
          console.log('No user ID found.');
        }
      })
      .catch(error => console.log('Error retrieving user ID: ', error));
  }, []);

  //get data from async storage
    const getCurrentGroceryListId= async () => {
      const listId = await AsyncStorage.getItem('currentGroceryListId')
      return listId;
    }

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['12%', '75%'], []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const handleAddItem = () => {
    setVisibleAddItemModal(false);
    if (itemTitle !== '') {
      const itemData = {
        main_text: itemTitle,
        sub_text: itemInfo,
        added_by_id: userId,
        grocery_list_id: getCurrentGroceryListId(),
      };

      fetch('https://s3individueelapi.azurewebsites.net/api/groceryitem/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Item added successfully:', data);
          // Fetch the updated list of groceries
          AsyncStorage.getItem('userId')
            .then(userId => {
              if (userId !== null) {
                fetch(
                  `https://s3individueelapi.azurewebsites.net/api/grocerylist/get/${getCurrentGroceryListId()}`,
                )
                  .then(response => response.json())
                  .then(data => setGroceries(data.items))
                  .catch(error =>
                    console.log('Error fetching grocery items: ', error),
                  );
              } else {
                console.log('No user ID found.');
              }
            })
            .catch(error => console.log('Error retrieving user ID: ', error));
        })
        .catch(error => {
          console.log('Error adding item:', error);
        });

      setItemTitle('');
      setItemInfo('');
    }
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
        //onChange={handleSheetChanges}
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
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
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
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
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
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    elevation: 3,
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  buttonText: {
    color: '#f68b45',
    fontSize: 30,
  },
  bottomSheet: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
  },
});

export default GroceriesTab;
