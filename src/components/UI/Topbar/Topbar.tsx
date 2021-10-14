import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';

import { Appbar } from 'react-native-paper';

export default function Topbar({ goBack, title, subtitle }: { goBack: boolean, title: string, subtitle: string }) {
  const navigation = useNavigation()
  return (
    <View>
      <Appbar.Header >
        {goBack && <Appbar.BackAction onPress={() => { navigation.goBack() }} />}
        <Appbar.Content title={title} subtitle={subtitle} />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
    </View>
  );
}

