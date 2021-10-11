import React, { useState } from 'react';
import { View } from 'react-native';

import { Appbar } from 'react-native-paper';

export default function Topbar() {

  return (
    <View>
      <Appbar.Header >
        <Appbar.Content title="My first native app" subtitle="Hello, world!" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
    </View>
  );
}

