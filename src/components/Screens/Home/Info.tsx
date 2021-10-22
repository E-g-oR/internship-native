import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button, Paragraph, Surface, Text, Title } from "react-native-paper";
import { RootStackParamList } from "../../../navigation/TabNavigation";
import { IPostLocation } from "../../UI/Card/Card";
import Topbar from "../../UI/Topbar/Topbar";

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>
const Info = ({ route, navigation }: Props) => {
  const [location, setLocation] = useState<IPostLocation | null>(null)

  const seeOnMap = () => {
    setLocation(route.params.post.location)
  }

  return (
    <>
      <Topbar goBack={true} title="About" subtitle={route.params.post.title} />
      <Surface style={{ height: '100%' }}>
        <View style={{ marginHorizontal: '5%' }}>
          <Title>{route.params.post.title}</Title>
          <Paragraph>{route.params.post.body}</Paragraph>
          <Title>{route.params.post.country}</Title>
          <Paragraph>{route.params.post.location.latitude}</Paragraph>
          <Paragraph>{route.params.post.location.longtitude}</Paragraph>
          <Button onPress={seeOnMap} >See on map</Button>
        </View>
        {location ?
          (<MapView
            style={{ flex: 1, width: '100%' }}
            mapType="mutedStandard"
            initialRegion={{
              latitude: location.latitude,  // from -90 to 90
              longitude: location.longtitude, // from -180 to 180
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longtitude,
                }}
              />
            )}
          </MapView>)
          : <Paragraph>{route.params.post.country}</Paragraph>
        }
      </Surface>
    </>
  )
}
export default Info;