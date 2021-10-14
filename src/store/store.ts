import { IPost } from "../components/UI/Card/Card";
import { makeAutoObservable } from "mobx";

export interface IStore {
  allPosts: IPost[];
  getPosts: () => void;
  putPosts: (data: IPost) => void;
  togglePost: (id: number) => void;
  addNewPost: (newPost: IPost) => void;
}

export class PostsStore {
  allPosts: IPost[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((data: IPost[]) => this.putPosts(data));
  }

  putPosts(data: IPost[]) {
    this.allPosts = data;
  }

  togglePost(id: number) {
    this.allPosts.map((post: IPost) =>
      post.id === id ? (post.isFavorite = !post.isFavorite) : post
    );
  }

  addNewPost(newPost: IPost) {
    if (this.allPosts.length) {
      this.allPosts.unshift(newPost);
    }
  }
}

const store: PostsStore = new PostsStore();

export default store;
