import { act } from "react-dom/test-utils";
import CardLogic, { IPost } from "./CardLogic";
import store from "../../../store/store";

const postNotFavorite: IPost = {
  title: "Mocked post",
  body: "Here is mocked post body",
  country: "",
  id: 14,
  location: {
    latitude: 65,
    longtitude: 15,
  },
  isFavorite: false,
  userId: 3,
};

const postIsFavorite: IPost = {
  title: "Favorite post",
  body: "this post is my favorite",
  country: "Brazil",
  id: 14,
  location: {
    latitude: 15,
    longtitude: 132,
  },
  isFavorite: true,
  userId: 3,
};

const favoritePostStyle = { backgroundColor: "#ffecb3" };
const favoriteTextStyle = { color: "#000" };

afterEach(() => {
  store.allPosts = [];
});

describe("test CardLogic", () => {
  describe("correct values", () => {
    test("not favorite card", () => {
      const { Icon, TextButton, StylePost, StyleText } =
        CardLogic(postNotFavorite);

      expect(Icon).toBe("heart-outline");
      expect(TextButton).toBe("Add to favorites");

      expect(StylePost).toEqual(null);
      expect(StylePost).toBeNull();

      expect(StyleText).toEqual(null);
      expect(StyleText).toBeNull();
    });

    test("favorite card", () => {
      const { Icon, TextButton, StylePost, StyleText } =
        CardLogic(postIsFavorite);

      expect(Icon).toBe("heart");
      expect(TextButton).toBe("Remove");

      expect(StylePost).not.toBeNull();
      expect(StylePost).toEqual(favoritePostStyle);

      expect(StyleText).not.toBeNull();
      expect(StyleText).toEqual(favoriteTextStyle);
    });
  });

  describe("change card state", () => {
    test("favorite card comes not fav", async () => {
      store.allPosts = [postIsFavorite];
      let { Icon, TextButton, togglePost } = CardLogic(store.allPosts[0]);
      let newIcon;
      let newTextButton;

      expect(Icon).toBe("heart");
      expect(TextButton).toBe("Remove");

      await act(async () => {
        await togglePost(store);
        const { Icon, TextButton } = CardLogic(store.allPosts[0]);
        newIcon = Icon;
        newTextButton = TextButton;
      });

      expect(newIcon).toBe("heart-outline");
      expect(newTextButton).toBe("Add to favorites");
    });

    test("add card to favorites", async () => {
      store.allPosts = [postNotFavorite];
      let { Icon, TextButton, togglePost } = CardLogic(store.allPosts[0]);
      let newIcon;
      let newTextButton;

      expect(Icon).toBe("heart-outline");
      expect(TextButton).toBe("Add to favorites");
      await act(async () => {
        await togglePost(store);
        const { Icon, TextButton } = CardLogic(store.allPosts[0]);
        newIcon = Icon;
        newTextButton = TextButton;
      });

      expect(newIcon).toBe("heart");
      expect(newTextButton).toBe("Remove");
    });
  });
});
