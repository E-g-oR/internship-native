import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, View } from "react-native";
import { Paragraph, Surface, Title } from "react-native-paper";
import { RootStackParamList } from "../../../navigation/TabNavigation";

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>
const Info = ({ route, navigation }: Props) => {
  return (
    <>
      <Surface style={{ height: '100%' }}>
        <ScrollView>
          <View style={{ marginHorizontal: '4%' }}>


            <Title>{route.params.post.title}</Title>
            <Paragraph>{route.params.post.body}</Paragraph>
          </View>
        </ScrollView>
      </Surface>
    </>
  )
}
export default Info;