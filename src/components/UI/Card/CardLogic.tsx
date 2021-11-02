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

  let { isFavorite } = post;

  const togglePost = (store: PostsStore): void => {
    store.togglePost(post.id);
  }

  const Icon = isFavorite ? 'heart' : 'heart-outline';
  const TextButton = isFavorite ? 'Remove' : 'Add to favorites';
  const StylePost = isFavorite ? { backgroundColor: '#ffecb3' } : null;
  const StyleText = isFavorite ? { color: '#000' } : null;

  const navigateToPostInfo = (navigation: any) => {  // TODO change navigation type
    navigation.navigate('Info', { post });
  }



  return { togglePost, navigateToPostInfo, Icon, TextButton, StylePost, StyleText }
}

export default CardLogic;
