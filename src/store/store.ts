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

interface IDecodedFeatures {
  address?: string;
  bbox?: number[];
  center: number[];
  context: [];
  geometry: { type: "Point"; coordinates: number[] };
  id: string;
  place_name: string;
  place_type: string[];
  properties: object;
  relevance: number;
  text: string;
  type: string;
}

interface IDecoded {
  attribution: string;
  features: IDecodedFeatures[];
  query: number[];
  type: string;
}

const REQUEST_START = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const ACCESS_TOKEN =
  "pk.eyJ1IjoieWFoMHIiLCJhIjoiY2t1emdqNmgwMDdsbjMxbHAzamxrN2R2bCJ9.u0fF9NCV_0EfwdxoE05peQ";

const decodeLocation = async (location: IPostLocation) => {
  const response = await fetch(
    `${REQUEST_START}${location.latitude},${location.longtitude}.json?access_token=${ACCESS_TOKEN}`
  );
  const data: IDecoded = await response.json();

  if (data.features.length) {
    const lastItemIndex = data.features.length - 1;
    return data.features[lastItemIndex].place_name;
  }
};

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
  countriesList: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPosts() {
    //  AIzaSyCCS_zfWAq0zGe86kCqaS3Sx4FgVak53zg
    // pk.eyJ1IjoieWFoMHIiLCJhIjoiY2t1emdqNmgwMDdsbjMxbHAzamxrN2R2bCJ9.u0fF9NCV_0EfwdxoE05peQ
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((data: IPost[]) => {
        data.map((post: IPost) => {
          const location = getRandomLocation();
          post.location = location;
          const country = decodeLocation(location);
          country.then((countryName) => {
            if (countryName) {
              const index = this.countriesList.findIndex(
                (item) => item === countryName
              );
              if (index === -1) {
                this.countriesList.push(countryName);
              }
            }
          });
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
