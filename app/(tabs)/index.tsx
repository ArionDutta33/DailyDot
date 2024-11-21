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
  Image,
  ActivityIndicator,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-notifications';

import { tasks } from '~/assets/data/tasks';
import TaskItemBox from '~/components/customComponents/taskBox';
import useTodos from '~/hooks/useTodos';
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
    try {
      if (title === '' || description === '') {
        return;
      }

      const { data, error } = await supabase
        .from('todos')
        .insert([{ title, description, user_id: user?.id, due_date: date }])
        .select();
      console.log(JSON.stringify(data, null, 2));
      Toast.show('Added successfully', {
        type: 'success',
        placement: 'bottom',
        animationDuration: 1000,
        animationType: 'slide-in',
      });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      Toast.show('Something went wrong', {
        type: 'error',
        placement: 'bottom',
        animationDuration: 1000,
        animationType: 'slide-in',
      });
    }
    bottomSheetModalRef.current?.close();
  };

  //*fetch the notes from custom hook
  const { todos, loading, error } = useTodos();

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
  if (loading) {
    return <ActivityIndicator size="large" animating color="crimson" />;
  }
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
            data={todos}
            renderItem={({ item }) => <TaskItemBox todos={item} />}
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
            backgroundStyle={{ backgroundColor: 'rgb(39,38,38)' }}
            animateOnMount
            keyboardBehavior="interactive"
            animationConfigs={{
              duration: 200,
              overshootClamping: true,
              restDisplacementThreshold: 0.1,
              restSpeedThreshold: 0.1,
            }}
            onDismiss={() => {}}
            snapPoints={['70%']} // Increase the snap point to give the bottom sheet enough room
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
              <Image
                resizeMode="contain"
                className=" h-60 w-full"
                source={require('../../assets/workingIcon.png')}
              />
              <Text className="my-2 text-center text-lg font-semibold text-[crimson]">
                #DailyDot
              </Text>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default Home;
//*og
