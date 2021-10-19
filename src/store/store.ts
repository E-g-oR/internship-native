import { IPost } from "../components/UI/Card/Card";
import { makeAutoObservable } from "mobx";
import storage from "./localStorage";

export interface IStore {
  allPosts: IPost[];
  getPosts: () => void;
  putPosts: (data: IPost) => void;
  togglePost: (id: number) => void;
  addNewPost: (newPost: IPost) => void;
}

export class PostsStore {
  allPosts: IPost[] = [];
  addedPosts: IPost[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((data: IPost[]) => this.putPosts(data));

    storage
      .load({
        key: "addedPosts",
        id: "1"
      })
      .then((arr: IPost[]) => {
        if (arr.length) {
          this.putPostsFromStorage(arr);
        }
      }).catch(err => console.log(err))
  }

  putPosts(data: IPost[]) {
    if (!this.allPosts.length) {
      this.allPosts = data;
    } else {
      const existing: IPost[] = this.allPosts
      this.allPosts = data
      this.putPostsFromStorage(existing)
    }
  }

  putPostsFromStorage(data: IPost[]) {
    data.forEach((post: IPost) => {
      this.allPosts.unshift(post);
    })
  }

  togglePost(id: number) {
    this.allPosts.map((post: IPost) =>
      post.id === id ? (post.isFavorite = !post.isFavorite) : post
    );
  }

  addNewPost(newPost: IPost) {
    this.allPosts.unshift(newPost);
    this.addedPosts.unshift(newPost);
    storage.save({
      key: "addedPosts",
      id: "1",
      data: this.addedPosts,
      expires: 50000
    })
  }
}

const store: PostsStore = new PostsStore();

export default store;
