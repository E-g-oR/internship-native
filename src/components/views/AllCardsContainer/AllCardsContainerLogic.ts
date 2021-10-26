import React from "react";
import { PostsStore } from "../../../store/store";
import { IPost } from "../../UI/Card/CardLogic";

const AllCardsContainerLogic = (store: PostsStore): IPost[] | null => {
  const Posts: IPost[] = store.getFilteredData();
  if (!Posts || !Posts.length) {
    store.getPosts();
  }
  return Posts && Posts.length ? Posts : null;
};

export default AllCardsContainerLogic;
