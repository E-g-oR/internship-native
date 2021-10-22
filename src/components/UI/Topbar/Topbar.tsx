import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import { Appbar } from 'react-native-paper';

export default function Topbar({ goBack, title, subtitle }: { goBack: boolean, title: string, subtitle: string }) {
  const navigation = useNavigation()
  return (
    <View>
      <Appbar.Header >
        {goBack && <Appbar.BackAction testID="goback-button" onPress={() => { navigation.goBack() }} accessibilityLabel="back" />}
        <Appbar.Content title={title} subtitle={subtitle} />
        <Appbar.Action icon="magnify" testID="search-button" onPress={() => { console.log('Appbar search click') }} accessibilityLabel="search" />
        <Appbar.Action icon="dots-vertical" testID="more-button" onPress={() => { console.log('Appbar dots click') }} accessibilityLabel="more" />
      </Appbar.Header>
    </View>
  );
}

