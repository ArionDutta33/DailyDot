import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
const Search = () => {
  return (
    <>
      <Tabs.Screen options={{ animation: 'fade' }} />
      <View style={{ flex: 1 }}>
        <View>Your content</View>
        <BottomSheet isOpen>
          <ScrollView>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
            <Text>check</Text>
          </ScrollView>
        </BottomSheet>
      </View>
    </>
  );
};

export default Search;
