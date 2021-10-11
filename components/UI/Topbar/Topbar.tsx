import React, { useState } from 'react';
import { View } from 'react-native';

import { Appbar } from 'react-native-paper';

export default function Topbar() {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(prev => prev + 1)
  }
  return (
    <View>
      <Appbar.Header dark >
        <Appbar.BackAction />
        <Appbar.Content title="My first native app" subtitle="Hello, world!" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
    </View>
  );
}

