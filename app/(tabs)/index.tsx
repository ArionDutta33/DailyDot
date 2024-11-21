import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import moment from 'moment';
import React, { useCallback, useRef, useMemo, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { tasks } from '~/assets/data/tasks';
import TaskItemBox from '~/components/customComponents/taskBox';
const Home = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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
            backgroundStyle={{ backgroundColor: 'rgb(39,38,38)' }}
            animateOnMount
            animationConfigs={{
              duration: 200,
              overshootClamping: true,
              restDisplacementThreshold: 0.1,
              restSpeedThreshold: 0.1,
            }}
            onDismiss={() => {}}
            snapPoints={['50%']}
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}>
            <BottomSheetView>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default Home;
