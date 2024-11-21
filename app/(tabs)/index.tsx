import { Ionicons } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useCallback, useRef, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { tasks } from '~/assets/data/tasks';
import TaskItemBox from '~/components/customComponents/taskBox';
import { useAuth } from '~/provider/AuthProvider';
import { supabase } from '~/utils/supabase';
const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false); // Add this state to control the visibility of the DateTimePicker

  const { user } = useAuth();

  //*handle submit
  const handleOnSubmit = async () => {
    if (title === '' || description === '') {
      return;
    }
    console.log(title, description, new Date(date).toDateString());
  };

  // callbacks
  const handleSheetClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  });
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  //handle the date picker
  const handleDatePress = useCallback(() => {
    setShow(true); // Show the DateTimePicker when the button is pressed
  }, []);
  return (
    <>
      <GestureHandlerRootView>
        <View className="flex-1 bg-[rgb(39,38,38)] px-4">
          <View className="border-b border-gray-500 py-1">
            <Text className="py-2 text-xl font-medium text-white">
              {moment().format(` MMMM D , dddd`)}
            </Text>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={tasks}
            renderItem={({ item }) => <TaskItemBox task={item} />}
          />
          <FloatingAction
            onClose={handleSheetClose}
            onOpen={handlePresentModalPress}
            color="crimson"
            animated
          />
        </View>

        <BottomSheetModalProvider>
          {/* <Button onPress={handlePresentModalPress} title="Present Modal" color="black" /> */}
          <BottomSheetModal
            enablePanDownToClose={false}
            enableHandlePanningGesture={false} // Disable handle dragging
            backgroundStyle={{ backgroundColor: 'rgb(39,38,38)' }}
            animateOnMount
            animationConfigs={{
              duration: 200,
              overshootClamping: true,
              restDisplacementThreshold: 0.1,
              restSpeedThreshold: 0.1,
            }}
            onDismiss={() => {}}
            snapPoints={['30%']}
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}>
            <BottomSheetView className="">
              <TextInput
                value={title}
                onChangeText={setTitle}
                multiline={false}
                numberOfLines={1}
                className="px-6   text-2xl tracking-widest  text-white"
                placeholderTextColor="#ddd"
                placeholder="Task name"
              />
              <TextInput
                value={description}
                onChangeText={setDescription}
                multiline={false}
                numberOfLines={1}
                className="  px-6 text-lg tracking-widest  text-white"
                placeholderTextColor="#ddd"
                placeholder="Description"
              />
              <View className="flex-row ">
                <TouchableOpacity onPress={handleDatePress}>
                  <Text className="mx-6 my-4 self-end rounded-xl border bg-[crimson] p-3 px-5 text-white">
                    Due on {moment(date).format(` MMMM D , dddd`)}
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setDate(selectedDate || date);
                      setShow(false);
                    }}
                  />
                )}
                <Ionicons
                  onPress={handleOnSubmit}
                  className={` mx-6 my-4 self-end rounded-xl border bg-[crimson] p-3 px-5`}
                  name="send"
                  size={24}
                  color="white"
                />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default Home;
