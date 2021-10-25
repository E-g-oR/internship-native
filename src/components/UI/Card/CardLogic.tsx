import React, { useState } from 'react';
import { PostsStore } from '../../../store/store';
import { useNavigation } from '@react-navigation/native';

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

function CardLogic(post: IPost) {

  const navigation = useNavigation();
  const { isFavorite } = post;

  const Icon = isFavorite ? 'heart' : 'heart-outline';
  const TextButton = isFavorite ? 'Remove' : 'Add to favorites';
  const StylePost = isFavorite ? { backgroundColor: '#ffecb3' } : null;
  const StyleText = isFavorite ? { color: '#000' } : null;

  const navigateToPostInfo = (post: IPost) => {
    navigation.navigate('Info', { post });
  }

  const togglePost = (store: PostsStore, id: number): void => {
    store.togglePost(id);
  }

  return { togglePost, navigateToPostInfo, Icon, TextButton, StylePost, StyleText }
}

export default CardLogic;
