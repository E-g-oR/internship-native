import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/TabNavigation";
import { IPostLocation } from "../../UI/Card/CardLogic";
import { View } from "react-native";
import { Button, Paragraph, Surface, Text, Title } from "react-native-paper";
import Topbar from "../../UI/Topbar/Topbar";

export type InfoScreenProps = NativeStackScreenProps<RootStackParamList, 'Info'>

const Info = ({ route, navigation }: InfoScreenProps) => {

  const post = route.params.post;

  const [location, setLocation] = useState<IPostLocation | null>(null)

  const seeOnMap = () => { !location ? setLocation(post.location) : setLocation(null) }

  return (
    <>
      <Topbar goBack={true} title="About" subtitle={post.title} />
      <Surface style={{ height: '100%' }}>
        <View style={{ marginHorizontal: '5%', marginVertical: 15 }}>
          <Title>{post.title}</Title>
          <Paragraph>{post.body}</Paragraph>
          <Title>{post.country}</Title>
          <Paragraph>{post.location.latitude}</Paragraph>
          <Paragraph>{post.location.longtitude}</Paragraph>
          <Button mode="outlined" onPress={seeOnMap} >See on map</Button>
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
          : null
        }
      </Surface>
    </>
  )
}
export default Info;