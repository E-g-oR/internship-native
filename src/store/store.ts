import { IPost, IPostLocation } from "../components/UI/Card/Card";
import { makeAutoObservable } from "mobx";
import storage from "./localStorage";

export interface IStore {
  allPosts: IPost[];
  getPosts: () => void;
  putPosts: (data: IPost) => void;
  togglePost: (id: number) => void;
  addNewPost: (newPost: IPost) => void;
}

const getRandomLocation = (): IPostLocation => {
  const LAT_MIN = -90;
  const LAT_MAX = 90;
  const LONG_MIN = -180;
  const LONG_MAX = 180;

  const latitude = Math.random() * (LAT_MAX - LAT_MIN) + LAT_MIN;
  const longtitude = Math.random() * (LONG_MAX - LONG_MIN) + LONG_MIN;
  return { latitude, longtitude };
};

export class PostsStore {
  allPosts: IPost[] = [];
  addedPosts: IPost[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((data: IPost[]) => {
        data.map((post: IPost) => {
          const location = getRandomLocation();
          // console.log(location);
          post.location = location;
          console.log(post);
        });
        this.putPosts(data);
      });

    storage
      .load({
        key: "addedPosts",
        id: "1",
      })
      .then((arr: IPost[]) => {
        if (arr.length) {
          this.putPostsFromStorage(arr);
        }
      })
      .catch((err) => console.log(err));
  }

  putPosts(data: IPost[]) {
    if (!this.allPosts.length) {
      this.allPosts = data;
    } else {
      const existing: IPost[] = this.allPosts;
      this.allPosts = data;
      this.putPostsFromStorage(existing);
    }
  }

  putPostsFromStorage(data: IPost[]) {
    data.forEach((post: IPost) => {
      this.allPosts.unshift(post);
    });
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
      expires: 50000,
    });
  }
}

const store: PostsStore = new PostsStore();

export default store;
