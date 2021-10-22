import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/TabNavigation';
import { PostsStore } from '../../../store/store';
import { useNavigation } from '@react-navigation/native';
import { InfoScreenProps } from '../../Screens/Home/Info';

export interface IPostLocation {
  latitude: number,
  longtitude: number,
}
export interface IPost {
  title: string,
  body: string,
  userId: number,
  id: number,
  isFavorite: boolean,
  location: IPostLocation,
  country: string | undefined,
}

// type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

function CardLogic() {
  const navigation = useNavigation();
  // const navigation = props.navigation;
  const navigateToPostInfo = (post: IPost) => {
    navigation.navigate('Info', { post });

  }

  const togglePost = (store: PostsStore, id: number): void => {
    store.togglePost(id);
  }


  return { togglePost, navigateToPostInfo }
}

export default CardLogic;
