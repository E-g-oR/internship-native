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

export const sendRequest = async (url: string) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const decodeLocation = async (location: IPostLocation) => {
  let countryName = "";
  const response: IDecoded = await sendRequest(
    `${REQUEST_START}${location.longtitude},${location.latitude}.json?access_token=${ACCESS_TOKEN}`
  );
  if (response.features.length) {
    const lastIndex = response.features.length - 1;
    countryName = response.features[lastIndex].place_name;
  }

  return countryName;
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
  countryFilter: string = "All";

  constructor() {
    makeAutoObservable(this);
  }

  async getPosts() {
    const allPosts: IPost[] = await sendRequest(
      "https://jsonplaceholder.typicode.com/posts"
    );

    allPosts.map((post: IPost) => {
      const location = getRandomLocation();
      post.location = location;
    });

    this.putPosts(allPosts);
    this.getCountryNames();

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

  setCountryFilter(countryName: string) {
    this.countryFilter = countryName;
  }

  getCountryNames() {
    if (this.allPosts.length) {
      this.allPosts.map(async (post) => {
        const data: IDecoded = await sendRequest(
          `${REQUEST_START}${post.location.longtitude},${post.location.latitude}.json?access_token=${ACCESS_TOKEN}`
        );
        const features = data.features;
        if (features.length) {
          const lastIndex = features.length - 1;
          const country = features[lastIndex].place_name;
          post.country = country;
          this.putCountryToList(country);
        }
      });
    }
  }

  putCountryToList(country: string) {
    const index = this.countriesList.findIndex((item) => item === country);
    if (index === -1) {
      this.countriesList.push(country);
    }
  }

  getFilteredData(): IPost[] {
    if (this.countryFilter === "All") {
      return this.allPosts;
    } else {
      const filtered = this.allPosts.filter(
        (post) => post.country === this.countryFilter
      );
      return filtered;
    }
  }
}

const store: PostsStore = new PostsStore();

export default store;
